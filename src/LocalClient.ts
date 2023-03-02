import { getUrls, type Urls } from "./utils/urls.js";
import Live from "./Live.js";
import isGameOpen  from "./utils/isGameOpen.js";
import Agent from "./agents/Agent.js";
import { type LocalUserData, type UserRiotAuthData } from "./types/local.js";

export default class LocalClient {
  private pd_url: string;
  private glz_url: string;
  private version: string = "release-02.00-shipping-4-0-0";
  liveClient: Live;
  private agent: Agent;

  constructor(agent: Agent) {
    // if (!isGameOpen()) throw new Error("Valorant is not open!");
    let urls: Urls = getUrls();
    this.pd_url = urls.pd_url;
    this.glz_url = urls.glz_url;
    this.version = urls.version;
    this.liveClient = new Live();
    this.agent = agent;
    // dont verify ssl

  }

  async getPlayer(puuid: string) {
    let headers = await this.getOutsideHeaders();
    let data = await fetch(`${this.pd_url}/mmr/v1/players/${puuid}`, {
      headers: headers,
    });
    let json = await data.json();
    return json;
  }

  /**
   * Gets user info from riotgames auth api
   */
  async getUserInfo(): Promise<UserRiotAuthData | LocalUserData> {
    let headers = await this.getOutsideHeaders(); 
    let data = await fetch(`https://auth.riotgames.com/userinfo`, {
      headers: headers
    });
    let json = await data.json();
    if (!json.sub) throw new Error("Invalid user info");
    if (json['country'] != undefined || json['country'] != null) {
      return json as Promise<LocalUserData>;
    }
    let userId = json.sub as string;
    // fetch player info
    let playerData = await fetch(`${this.pd_url}/name-service/v2/players`, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify([
        userId
      ])
    })
    return (await playerData.json())[0] as Promise<UserRiotAuthData>;
  }


  private async getOutsideHeaders() {
    let entitlements = await this.agent.getTokens();
    let version = this.version;
    let headers = {
      "Authorization": "Bearer " + entitlements.accessToken,
      "X-Riot-Entitlements-JWT": entitlements.token,
      "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjog" + 
      "IldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5" + 
      "MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
      "X-Riot-ClientVersion": version + "-shipping",

      "User-Agent": "VALORANT"
    }
    return headers;
  }

}