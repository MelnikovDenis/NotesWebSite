import api from "../http/api.js";

export default class AuthService {
      static async login(email, password) {
            return api.post("/auth/login", {email: email, password: password});
      }

      static async register(email, nickname, password) {
            return api.post("/auth/register", {email: email, nickname: nickname, password: password});
      }

      static async refresh(id, email) {
            return api.post("/auth/refresh", {id: id, email: email});
      }

      static async logout() {
            return api.post("/auth/logout");
      }
}