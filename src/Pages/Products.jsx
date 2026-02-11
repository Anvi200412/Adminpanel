import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Pages/Pagecontext";
import "./Products.css";

function Products() {
  const { products, categories, loading } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [localProducts, setLocalProducts] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const emptyProduct = { title: "", price: "", category: "", thumbnail: "" };
  const [formData, setFormData] = useState(emptyProduct);

  const productsPerPage = 8;

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  if (loading)
    return <h2 style={{ color: "#fff", textAlign: "center" }}>Loading...</h2>;

  let filtered = [...localProducts];

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = filtered.slice(
    indexOfLast - productsPerPage,
    indexOfLast
  );

  
  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdd = (e) => {
    e.preventDefault();
    setLocalProducts(prev => [{ id: Date.now(), ...formData }, ...prev]);
    setFormData(emptyProduct);
    setShowAdd(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setLocalProducts(prev =>
      prev.map(p =>
        p.id === selectedProduct.id ? { ...selectedProduct, ...formData } : p
      )
    );
    setShowEdit(false);
  };

  const confirmDelete = () => {
    setLocalProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    setShowDelete(false);
  };

  return (
    <div className="products-page">
      <h1>Products</h1>

     
      <div className="filters-bar">
        <input
          className="search-input"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="category-dropdown"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className="add-product-btn" onClick={() => setShowAdd(true)}>
          Add
        </button>
      </div>

      <div className="table-header">
        <span>Image</span>
        <span>Title</span>
        <span>Price</span>
        <span>Category</span>
        <span>Actions</span>
      </div>

      <div className="products-list">
        {currentProducts.map(item => (
          <div className="product-row" key={item.id}>
            <img src={item.thumbnail} alt="" />
            <span>{item.title}</span>
            <span>₹ {item.price}</span>
            <span>{item.category}</span>

            <div className="actions">
              <button
                className="icon-btn edit"
                onClick={() => {
                  setSelectedProduct(item);
                  setFormData(item);
                  setShowEdit(true);
                }}
              >
                ✏️
              </button>
              <button
                className="icon-btn delete"
                onClick={() => {
                  setSelectedProduct(item);
                  setShowDelete(true);
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* ===== ADD / EDIT MODAL ===== */}
      {(showAdd || showEdit) && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{showAdd ? "Add Product" : "Edit Product"}</h2>
            <form
              onSubmit={showAdd ? handleAdd : handleEdit}
              className="modal-form"
            >
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="Image URL"
              />

              <div className="modal-actions">
                <button className="save-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowAdd(false);
                    setShowEdit(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM ===== */}
      {showDelete && (
        <div className="modal-overlay">
          <div className="confirm-card">
            <h3>Delete this product?</h3>
            <div className="modal-actions">
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
