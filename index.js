const clipboardy = require("clipboardy");
const execa = require("execa");
const path = require("path");
const decodeUriComponent = require('decode-uri-component');

const execaOption = {
  all: true,
  encoding: "utf-8",
  stripFinalNewline: false,
};

const windowsBinPath = path.resolve(__dirname, "./bin/windows.exe");
const macBinPath = path.resolve(__dirname, "./bin/macos");

const handleSync = () => {
  if (process.platform === "win32") {
    return execa.sync(windowsBinPath, execaOption).stdout.split("\n");
  } else if (process.platform === "darwin") {
    return execa.sync(macBinPath, execaOption).stdout.split("\n").map(decodeUriComponent);
  } else if (process.platform === "linux") {
    return clipboardy
      .readSync()
      .split("\n")
      .filter((line) => line.startsWith("file:///"));
  } else {
    throw new Error("Not supported platform!");
  }
};

const handleAsync = async () => {
  return new Promise((resolve, reject) => {
    if (process.platform === "win32") {
      execa(windowsBinPath, execaOption)
        .then((result) => resolve(result.all.split("\n")))
        .catch(reject);
    } else if (process.platform === "darwin") {
      execa(macBinPath, execaOption)
        .then((result) => resolve(result.all.split("\n").map(decodeUriComponent)))
        .catch(reject);
    } else if (process.platform === "linux") {
      clipboardy
        .read()
        .then((clipboard) => {
          resolve(
            clipboard.split("\n").filter((line) => line.startsWith("file:///"))
          );
        })
        .catch(reject);
    } else {
      throw new Error("Not supported platform!");
    }
  });
};

module.exports = {
  sync: handleSync,
  async: handleAsync,
};
