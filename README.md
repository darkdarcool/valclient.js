# LocalValorant.js

> Will make logo later!

localvalorant.js currently, does _not_ implement the official riotgames VALORANT api. We recommend using one of the many other libraries out there if that is what you want

## About 

localvalorant.js is a library that simplifies the process of using the Valorant LIVE api, that seems to not get talked about or used much. localvalorant.js aims to simplify the process of using this extremely useful API.

localvalorant.js also aims implements talking to Valorant's own server (pvp.net). This is currently not supported, but implements one function about getting simple player data. 

# Usage

``` bash
yarn add localvalorant.js
# OR
npm i localvalorant.js
```

> Make sure that you're using module js

``` typescript
import LocalClient from "localvalorant.js";

const client = new LocalClient();
const liveClient = client.liveClient;
const gameChat = liveClient.gameChat;

const data = await gameChat.getPartyChatInfo(); // get the party chat data

const cid = data.conversations[0].cid; // party chat id

gameChat.sendMessage(cid, "Hello! This message is sent by a script to your game!"); // send a message as the player
```

> Note: VALORANT must be open

## Documentation

not yet lol give me some time and motivation

## Authors

* [darkdarcool](https://github.com/darkdarcool)

## Disclaimer

```
THIS PROJECT IS NOT ASSOCIATED OR ENDORSED BY RIOT GAMES. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

Whilst effort has been made to abide by Riot's API rules; you acknowledge that use of this software is done so at your own risk.

Any rules broken or punishment administered is not to the fault of localvalorant.js
```