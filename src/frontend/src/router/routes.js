import { AppRoute } from "../common/const/common";
import Cart from "../views/Cart";
import Login from "../views/Login";
import Orders from "../views/Orders";
import Profile from "../views/Profile";
import IndexHome from "../views/Index";
import LoginModal from "../views/LoginModal";
import { addresses, auth, isLogged, user } from "../middlewares";
import { RouteName } from "../common/const/common";

export default [
  {
    path: AppRoute.MAIN,
    name: RouteName.HOME,
    component: IndexHome,
    children: [
      {
        path: AppRoute.LOGIN_INDEX,
        name: RouteName.LOGIN_INDEX,
        component: LoginModal,
        meta: {
          middlewares: [isLogged],
        },
      },
    ],
  },
  {
    path: AppRoute.CART,
    name: RouteName.CART,
    component: Cart,
    meta: {
      middlewares: [user, addresses],
    },
  },
  {
    path: AppRoute.LOGIN,
    name: RouteName.LOGIN,
    component: Login,
    meta: {
      layout: "AppLayoutLogin",
      middlewares: [isLogged],
    },
  },
  {
    path: AppRoute.PROFILE,
    name: RouteName.PROFILE,
    component: Profile,
    meta: {
      middlewares: [auth, addresses],
    },
  },
  {
    path: AppRoute.ORDERS,
    name: RouteName.ORDERS,
    component: Orders,
    meta: {
      middlewares: [auth],
    },
  },
];
