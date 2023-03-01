import { getUrls, type Urls } from "./utils/urls.js";
import Live from "./Live.js";
import isGameOpen  from "./utils/isGameOpen.js";
import Agent from "./agents/Agent.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
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