// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./Components/Sidebar";
// import Dashboard from "./Pages/Dashboard";
// import Products from "./Pages/Products";
// import Users from "./Pages/Users";
// import Orders from "./Pages/Orders";
// import { ProductProvider } from "./Pages/Pagecontext";

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Sidebar />

//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/orders" element={<Orders />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import { ProductProvider } from "./Pages/Pagecontext";

function App() {
  return (
    <Router>
      <ProductProvider>
        <div className="app">
          <Sidebar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </ProductProvider>
    </Router>
  );
}

export default App;

