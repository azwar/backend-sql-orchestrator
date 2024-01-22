import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const bcryptCompare = async (rawString: string, hashString: string) => {
  return await bcrypt
    .compare(rawString, hashString)
    .then((res) => {
      console.log('bcryptCompare', res); // return true
      return res;
    })
    .catch((err) => console.error(err.message));
};
