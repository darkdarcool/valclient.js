export type LocalSession = {
  federated: boolean,
  game_name: string,
  game_tag: string,
  loaded: boolean,
  name: string,
  pid: string,
  puuid: string,
  region: string,
  resource: string,
  state: string,
}

export type PartyChatInfo = {
  conversations: {
      cid: string;
      direct_messages: boolean;
      global_readership: boolean;
      message_history: boolean;
      mid: string;
      muted: boolean;
      mutedRestriction: boolean;
      type: "groupchat" | "chat";
      uiState: {
          changedSinceHidden: boolean;
          hidden: boolean;
      };
      unread_count: number;
  }[];
};

export type SendMessageResponse = {
  body: string;
  cid: string;
  game_name: string;
  game_tag: string;
  id: string;
  mid: string;
  name: string;
  pid: string;
  /** Player UUID */
  puuid: string;
  read: boolean;
  region: string;
  /** Time in milliseconds since epoch */
  time: string;
  type: "chat" | "groupchat";
  
}


export type Entitlements = {
  token: string,
  accessToken: string,

}

export type Lockfile = {
  url: string,
  auth: string,
}

export type LocalUserData = {
  country: string,
  sub: string,
  email_verified: boolean,
  player_plocale: string | null,
  country_at: number,
  pw: { cng_at: number, reset: boolean, must_reset: boolean },
  lol: null,
  original_platform_id: null,
  original_account_id: null,
  phone_number_verified: boolean,
  preferred_username: string,
  ban: { code: string | number |  null, 
    desc: '', exp: string | number | null,
    restrictions: {
      type: string,
      reason: string,
      scope: string,
      dat: {
        expirationMillis: number,
        gameData: {
          productName: string,
          gameLocation: string,
          triggerGameId: string,
        }
      }
    }[]
   }| null,
  ppid: string | null,
  lol_region: [], // unknown as of now
  player_locale: string,
  pvpnet_account_id: null | string | number,
  acct: {
    type: number,
    state: number,
    adm: boolean,
    game_name: string,
    tag_line: string,
    created_at: number,
  },
  jti: string,
  username: string,
}

export type UserRiotAuthData = {
  DisplayName: string,
  Subject: string,
  GameName: string,
  TagLine: string,
}