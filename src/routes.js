
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import Form1 from "views/Form1.js";
import ProductForm from "views/Product";
import Orders from "views/Orders"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/form1",
    name: "Sale Form",
    icon: "tim-icons icon-bank",
    component: Form1,
    layout: "/admin",
  },  
  {
    path: "/form2",
    name: "Product Form",
    icon: "tim-icons icon-bank",
    component: ProductForm,
    layout: "/admin",
  },
 
  {
    path: "/products",
    name: "Products",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "tim-icons icon-puzzle-10",
    component: Orders,
    layout: "/admin",
  },
];
export default routes;
