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