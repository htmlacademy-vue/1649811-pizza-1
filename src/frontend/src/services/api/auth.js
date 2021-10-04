import JwtService from "../jwt.service";
import axios from "../../plugins/axios";
import { ApiRoute } from "../../common/const/common";
import { BaseApiService } from "./base";

export default class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
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
