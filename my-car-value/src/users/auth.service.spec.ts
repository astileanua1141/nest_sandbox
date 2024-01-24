import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {

  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        //Promise.resolve({ id: 1, email, password } as User)
        const user = { id: Math.floor(Math.random() * 9999999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  });


  it('can create an instance of Auth Service', async () => {
    expect(service).toBeDefined();

  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@test.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'test');

    await expect(service.signup('asdf@asdf.com', 'test')).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('test@test.com', 'pwd')
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('ajsdijwe@fijg.com', 'adijhw');
    await expect(
      service.signin('ajsdijwe@fijg.com', 'adijhw22'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('laskdjf@alskdfj.com', 'password');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    // This is the dumbell approach 
    // option no. 1
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'asdf@asdf.com', password: 'd7d0ee1db9999547.27c95c0f9c6098ed1c7779e369ed4096130ca635262b2df7bfd1ac74b21be41d' } as User,
    //   ]);

    // This is the better approach 
    // option no. 2

    //store a user in memory
    await service.signup('anyuser@asdf.com', 'anypass');

    const user = await service.signin('anyuser@asdf.com', 'anypass');
    expect(user).toBeDefined();
  });
});