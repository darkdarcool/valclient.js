import Agent from "./Agent.js";

import { type Entitlements } from "../types/local.js";

import axios from "axios";

import axiosCookieJar from "axios-cookiejar-support"

import tough from "tough-cookie"

import type { CookieJar } from 'tough-cookie';
import * as querystring from "querystring";


declare module 'axios' {
  interface AxiosRequestConfig {
    jar?: CookieJar;
  }
}

export interface AccessToken {
  access_token: string
  scope: string
  id_token: string
  token_type: string
  expires_in: string
}

axiosCookieJar.wrapper(axios);
     
const cookieJar = new tough.CookieJar();

export default class UserAgent extends Agent {
  private _username: string | undefined;
  private _password: string | undefined;

  constructor(_username?: string | undefined, _password?: string | undefined) {
    super(_username, _password);
    this._username = _username;
    this._password = _password;
  }
  private async getAuth(): Promise<AccessToken> {
    // get cookies
    
    await axios.post("https://auth.riotgames.com/api/v1/authorization", JSON.stringify({
      "client_id": "play-valorant-web-prod",
      "nonce": "1",
      "redirect_uri": "https://playvalorant.com/opt_in",
      "response_type": "token id_token",
      }), {
        jar: cookieJar,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "riotgames"
        },
        withCredentials: true,
      });
    
    let data = await axios.put("https://auth.riotgames.com/api/v1/authorization", JSON.stringify({
      "type": "auth",
      "username": this._username,
      "password": this._password,
      }), {
        jar: cookieJar,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "riotgames"
        },
        withCredentials: true
    });
    
    let json = await data.data;
    let uri = json['response']['parameters']['uri'];
    let body = uri.split("#")[1];
    const bodyObj = querystring.parse(body) as unknown;

    return bodyObj as AccessToken;

  }

  async getTokens(): Promise<Entitlements> {
    let url = "https://entitlements.auth.riotgames.com/api/token/v1";
    let auth = await this.getAuth();

    let data = await axios.post(url, JSON.stringify({

    }), {
      headers: {
        "Authorization": `${auth.token_type} ${auth.access_token}`,
        "Content-Type": "application/json"
      }
    });


    let entitlements: Entitlements = {
      accessToken: auth.access_token,
      token: data.data['entitlements_token']
    }
    return entitlements;

  }
}