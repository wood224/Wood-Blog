const bcryptjs = require('bcryptjs');

const saltRounds = 10;

export const bcrypt = {
  generate: (pwd: string) => {
    return bcryptjs.hashSync(pwd, saltRounds);
  },

  verity: (pwd: string, hash: string) => {
    return bcryptjs.compareSync(pwd, hash);
  }
}
