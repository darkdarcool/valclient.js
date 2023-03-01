import test from "ava";
import LocalAgent  from "../src/agents/LocalAgent.js";

test("localagent", async (t) => {
  let agent = new LocalAgent();
  let tokens = await agent.getTokens();
  t.not(tokens.accessToken, undefined);
  t.not(tokens.token, undefined);
});