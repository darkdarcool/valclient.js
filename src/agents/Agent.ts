import { Entitlements } from "../types/local.js";

export default class Agent {
  private username: string | undefined;
  private password: string | undefined;
  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

  async getTokens(): Promise<Entitlements> {
    return {
     accessToken: "",
     token: "",
    }
  }
}