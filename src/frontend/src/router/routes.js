import { AppRoute } from "../common/const/common";
import Cart from "../views/Cart";
import Login from "../views/Login";
import Orders from "../views/Orders";
import Profile from "../views/Profile";
import IndexHome from "../views/Index";
import LoginModal from "../views/LoginModal";
import { addresses, auth, isLogged, user } from "../middlewares";

export default [
  {
    path: AppRoute.MAIN,
    name: "IndexHome",
    component: IndexHome,
    children: [
      {
        path: AppRoute.LOGIN_INDEX,
        name: "LoginIndex",
        component: LoginModal,
        meta: {
          middlewares: [isLogged],
        },
      },
    ],
  },
  {
    path: AppRoute.PROFILE,
    name: "Profile",
    component: Profile,
    meta: {
      middlewares: [auth, addresses],
    },
  },
  {
    path: AppRoute.LOGIN,
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutLogin",
      middlewares: [isLogged],
    },
  },
  {
    path: AppRoute.CART,
    name: "Cart",
    component: Cart,
    meta: {
      middlewares: [user, addresses],
    },
  },
  {
    path: AppRoute.ORDERS,
    name: "Orders",
    component: Orders,
    meta: {
      middlewares: [auth],
    },
  },
];
