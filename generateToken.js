const crypto = require("crypto");
function generateSecretToken() {
  return crypto.randomBytes(32).toString("hex");
}

const secretToken = generateSecretToken();
console.log("Secret Token généré :", secretToken);
