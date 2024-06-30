const bcrypt = require("bcrypt");

const password = "ikomobi"; // remplace par le mot de passe souhaité

bcrypt.hash(password, 10, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash); // Ceci est le mot de passe haché à utiliser dans l'insertion SQL
});
