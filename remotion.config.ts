/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setRspack(false);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Use Termux Chromium if running locally on Android, otherwise Remotion uses default system Chrome / Puppeteer
const termuxChromium = "/data/data/com.termux/files/usr/bin/chromium-browser";
if (fs.existsSync(termuxChromium)) {
  Config.setBrowserExecutable(termuxChromium);
}

Config.setChromiumDisableWebSecurity(true);
Config.setChromiumHeadlessMode(true);
Config.setChromiumMultiProcessOnLinux(false);
