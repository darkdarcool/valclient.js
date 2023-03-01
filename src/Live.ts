import { readFileSync } from "fs";
import GameChat from "./GameChat.js";


import { type LocalSession, Entitlements } from "./types/local.js"
import isGameOpen from "./utils/isGameOpen.js";
import lockfile from "./utils/lockfile.js"

export default class Live {
  private url: string;
  private auth: string;
  constructor() {
    if (isGameOpen()) {
      let lockFile = lockfile();
      this.url = lockFile.url;
      this.auth = lockFile.auth;
    }
  }

  /**
   * Gets the current session of the player. This is also used to get basic information about
   * the party, and more specifically the, the current players account. Such as their puuid.
   * @returns LocalSession
   */
  async getSession(): Promise<LocalSession> {
    let data = await fetch(`${this.url}/chat/v1/session`, {
      headers: {
        "Authorization": this.auth,
      },
    });
    return await data.json() as Promise<LocalSession>;
  }
  /**
   * NOT MEANT FOR DEVELOPER USE. 
   * @deprecated
   * @returns Entitlements
   */
  async _getTokens_DO_NOT_USE(): Promise<Entitlements> {
    let data = await fetch(`${this.url}/entitlements/v1/token`, {
      headers: {
        "Authorization": this.auth,
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

  get gameChat() {
    return new GameChat(this.url, this.auth);
  }
}