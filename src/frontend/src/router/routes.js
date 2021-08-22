import Cart from "../views/Cart";
import Login from "../views/Login";
import Orders from "../views/Orders";
import Profile from "../views/Profile";
import IndexHome from "../views/Index";
import LoginModal from "../views/LoginModal";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: IndexHome,
    children: [
      {
        path: "login-index",
        name: "LoginIndex",
        component: LoginModal,
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "AppLayoutLogin" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
];
