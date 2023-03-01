import { readFileSync } from "fs";


export type Urls = {
  pd_url: string,
  glz_url: string,
  version: string,
}

export function getUrls(): Urls {
  let path = process.env["LOCALAPPDATA"] + '\\VALORANT\\Saved\\Logs\\ShooterGame.log';
  let region = "na";
  let glz: string[] = [];
  let version = "release-02.00-shipping-4-0-0";
  readFileSync(path, 'utf-8').split(/\r?\n/).forEach(function(line) {
    if (line.includes(".a.pvp.net/account-xp/v1/")) {
      region = line.split('.a.pvp.net/account-xp/v1/')[0].split(".").slice(-1)[0];
    }
    else if (line.includes('https://glz')) {
      glz = [(line.split('https://glz-')[1].split(".")[0]), (line.split('https://glz-')[1].split(".")[1])];
    }
    else if (line.includes("CI server version:")) {
      version = line.split("CI server version:")[1].trim(); 
    }
  });
  if (region == "pbe") { 
    region = "na";
    glz = ["na1", "na"]
  }
  let pd_url = `https://pd.${region}.a.pvp.net`;
  let glz_url = `https://glz-${glz[0]}.${glz[1]}.a.pvp.net`
  return { pd_url, glz_url, version } as Urls;
}