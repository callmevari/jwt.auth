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

  bcryptCompareHash(string, hashedString) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(string, hashedString, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
};

module.exports = new CryptoUtil();