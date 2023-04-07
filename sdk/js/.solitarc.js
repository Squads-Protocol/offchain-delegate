// @ts-check
const path = require("path");

const programDir = path.join(__dirname, "..", "..", "programs", "offchain_delegate");
const idlDir = path.join(__dirname, "idl");
const sdkDir = path.join(__dirname, "src", "generated");
const binaryInstallDir = path.join(__dirname, ".crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "offchain_delegate",
  programId: "oCDofJsKeaWoyXWCtEY6vXgxvAdkmUdbXBRsedvUWkx",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
