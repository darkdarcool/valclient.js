import { readFileSync } from "fs";
import { type Lockfile } from "../types/local.js";
export default function lockfile(): Lockfile {
  let lockFile = process.env["LOCALAPPDATA"] + "\\Riot Games\\Riot Client\\Config\\lockfile"
  let data = readFileSync(lockFile).toString().split(":");
  let url = `${data[4]}://127.0.0.1:${data[2]}`
  let key = data[3];
  let auth = "Basic " + Buffer.from("riot:" + key).toString('base64');
  return {
    url: url,
    auth: auth,
  }
}