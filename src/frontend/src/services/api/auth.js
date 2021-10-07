import axios from "../../plugins/axios";
import { ApiRoute } from "../../common/const/common";
import { BaseApiService } from "./base";

export default class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  async login(params) {
    const { data } = await axios.post(ApiRoute.LOGIN, params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete(ApiRoute.LOGOUT);
    return data;
  }

  async getMe() {
    const { data } = await axios.get(ApiRoute.WHO_AM_I);
    return data;
  }
}
