import axios from "../plugins/axios";
import JwtService from "../services/jwt.service";
import { ApiRoute } from "../common/constants";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
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

export class ReadOnlyApiService extends BaseApiService {
  constructor(resource, notifier) {
    super(notifier);
    this._resource = resource;
  }

  _resource;

  async query(config = {}) {
    const { data } = await axios.get(this._resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this._resource}/${id}`, config);
    return data;
  }
}

export class ReadApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  async get(resource) {
    const { data } = await axios.get(resource);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  constructor(resource, notifier) {
    super(resource, notifier);
    this._resource = resource;
  }

  _resource;

  async post(entity) {
    const { data } = await axios.post(this._resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this._resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this._resource}/${id}`);
    return data;
  }
}
