import { AppRoute } from "../common/const/common";
import { Entity } from "../store/modules/auth/const";

const auth = async ({ next, store, nextMiddleware }) => {
  if (!store.state.auth[Entity.IS_AUTHENTICATED]) {
    const isAuth = await store.dispatch("auth/setAuth");
    if (!isAuth) {
      next(AppRoute.LOGIN);
    }
  }

  return nextMiddleware();
};

export default auth;
