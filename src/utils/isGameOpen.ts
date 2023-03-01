import { readFileSync } from "fs";

export default function isValorantOpen(): boolean {
  try { 
    readFileSync(process.env["LOCALAPPDATA"] + "\\Riot Games\\Riot Client\\Config\\lockfile", 'utf-8')
  } catch (e) {
    return false;
  }
  return true;
}


