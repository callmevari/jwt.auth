const bcrypt = require('bcryptjs');

class CryptoUtil {
  bcryptHash(string) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) reject(error);
        bcrypt.hash(string, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
  }
};

module.exports = new CryptoUtil();