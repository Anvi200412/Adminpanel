  // 1️⃣ Import required things from Chart.js
  import {
    Chart as ChartJS,      
    CategoryScale,         
    LinearScale,           
    BarElement, 
    ArcElement,            
    Tooltip,              
    Legend                
  } from "chart.js";


  ChartJS.register(
    CategoryScale,  
    LinearScale,     
    BarElement,      
    ArcElement,
    Tooltip,         
    Legend         
  );
