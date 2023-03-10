<div align = "center">
  <img src = "./docs/logo.png"></img>
 </div>

ValClient currently, does _not_ implement the official riotgames VALORANT api. We recommend using one of the many other libraries out there if that is what you want

## About 

ValClient is a library that simplifies the process of using the Valorant LIVE api, that seems to not get talked about or used much. valclient aims to simplify the process of using this extremely useful API.

ValClient also aims implements talking to Valorant's own server (pvp.net). This is currently not supported, but implements one function about getting simple player data. 

# Usage

``` bash
yarn add valclient
# OR
npm i valclient
```

> Make sure that you're using module js

``` typescript
import Client, { LocalAgent } from "valclient";

const agent = new LocalAgent(); // start the connection with the local api

const client = new Client(agent);
const liveClient = client.liveClient;
const gameChat = liveClient.gameChat;

const data = await gameChat.getPartyChatInfo(); // get the party chat data

const cid = data.conversations[0].cid; // party chat id

gameChat.sendMessage(cid, "Hello! This message is sent by a script to your game!"); // send a message as the player
```

> Note: VALORANT must be open

## Documentation

See the /docs directory
## Authors

* [darkdarcool](https://github.com/darkdarcool)

## Disclaimer

```
THIS PROJECT IS NOT ASSOCIATED OR ENDORSED BY RIOT GAMES. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

Whilst effort has been made to abide by Riot's API rules; you acknowledge that use of this software is done so at your own risk.

Any rules broken or punishment administered is not to the fault of ValClient.js/ValClient/valclient
```
