import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // hash the users password
    //  - generate a salt
    const salt = randomBytes(8).toString('hex');

    //  - hash the salt and pwd together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //  - join the hashed result and the salt together -> store in db
    const result = salt + '.' + hash.toString('hex');

    // create new user & save it
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    // actually this is an authentication method

    const [user] = await this.usersService.find(email);

    if(!user) { 
      throw new NotFoundException('user not found');
    }
      
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    } 

    return user;
    
  }

}
