import { SendMessageResponse, type PartyChatInfo } from "./types/local.js";

export default class GameChat {
  private url: string;
  private auth: string;
  constructor(url: string, auth: string) {
    this.url = url;
    this.auth = auth;
   
  }
  /**
   * Gets the current _party_ chat info. You can use this to get the cid of the party chat.
   * @returns Promise<PartyChatInfo>
   */
  async getPartyChatInfo(): Promise<PartyChatInfo> {
    let data = await fetch(`${this.url}/chat/v6/conversations/ares-parties`, {
      headers: {
        "Authorization": this.auth,
      },
    });
    return await data.json() as Promise<PartyChatInfo>;
  }
  /**
   * 
   * @param cid The cid of the chat you want to send a message to. You can get this from {@link getPartyChatInfo}
   * @param message The actual message you want to send. NOTE: Some characters are not _displayed in game_, but are still _sent_ and get be retrieved from the api
   * @returns 
   */
  async sendMessage(cid: string, message: string): Promise<SendMessageResponse> {
    let data = await fetch(`${this.url}/chat/v6/messages/`, {
      method: "POST",
      headers: {
        "Authorization": this.auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "message": message,
        "type": "groupchat",
        "cid": cid,
      })
    });
    return (await data.json())['messages'][0] as Promise<SendMessageResponse>; // there is only one message in the response in all scenarios, so we can just return that.
  }
}