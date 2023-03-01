import Agent from "./Agent.js";
import { Lockfile, type Entitlements } from "../types/local.js";
import lockfile from "../utils/lockfile.js";
export default class LocalAgent extends Agent {
  private _username: string | undefined;
  private _password: string | undefined;
  constructor() {
    super("", "");
    this._username = "";
    this._password = "";
  }

  async getTokens(): Promise<Entitlements> {
    let lockFile: Lockfile;
    try {
      lockFile = lockfile();
    } catch {
      throw new Error("VALORANT is not open");
    }
    let data = await fetch(`${lockFile.url}/entitlements/v1/token`, {
      headers: {
        "Authorization": lockFile.auth,
      },
      //agent: httpsAgent
    });
    let json = await data.json();
    let entitlements: Entitlements = {
      token: json['token'],
      accessToken: json['accessToken'],
    }
    return entitlements;
  }
}