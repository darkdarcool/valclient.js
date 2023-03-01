import LocalClient from "./LocalClient.js";

import UserAgent from "./agents/UserAgent.js";
import LocalAgent from "./agents/LocalAgent.js"; 

export default LocalClient;
export { UserAgent, LocalAgent };
/*
let agent = new LocalAgent();

const localClient = new LocalClient(agent);

console.log(await localClient.getPlayer("6d1095ee-a38a-53af-a56a-798e1ad33b7f"));

*/

// TODO: Make tests lol