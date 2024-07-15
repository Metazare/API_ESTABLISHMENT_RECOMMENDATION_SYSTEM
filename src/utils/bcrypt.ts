import * as bcrypt from 'bcrypt';

export function hashPassword(password: string){
  const saltRounds = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword(password: string,hash:string){
  return bcrypt.compareSync(password, hash);
}