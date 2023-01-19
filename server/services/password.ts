import bcrypt from 'bcrypt'

export async function hashPassword(password : string) : Promise<string> {

  return await bcrypt.hash(password, 10)
    .then(hash => {
      return hash;
    })
    .catch(err => {
      console.log(err);
      console.log('Failed to hash and set password value');
      // Should we be exiting here?
      return '';
    })
}

export async function comparePassword(password : string, hash : string) : Promise<boolean> {
  
  return await bcrypt.compare(password, hash)
    .then(result=> {
      return result;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
};