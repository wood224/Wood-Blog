const jsonwebtoken = require('jsonwebtoken');

//设置密钥
const secret = 'wood-data-secret';

export const jwt = {
  generate: (data: object, expire: string) => {
    return jsonwebtoken.sign(data, secret, { expiresIn: expire });
  },
  verify: (token: string) => {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (err) {
      return false;
    }
  }
}