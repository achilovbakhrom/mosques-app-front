import { Login } from "../model/Login";
import { Token } from "../model/Token";
import { User } from "../model/User";
import instance from "./instance";
import axios from "axios";

class AuthApi {
  private static instance = instance;

  static async login(arg: Login): Promise<Token> {
    const axiosInstance = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/api"
          : "https://muslim-api.sies.uz/api",
    });
    const response = await axiosInstance.post("/user/login/", arg);
    return response.data;
  }

  static async refreshLogin(arg: string): Promise<{ access: string }> {
    const response = await this.instance.post("/user/login/refresh/", {
      refresh: arg,
    });
    return response.data;
  }

  static async logout(): Promise<void> {
    await this.instance.post("/user/logout/");
  }

  static async fetchCurrentUser(): Promise<User> {
    const response = await this.instance.get("/user/me/");
    return response.data;
  }
}

export default AuthApi;
