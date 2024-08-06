import { User } from './user.entity';
import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const clonedUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => Promise.resolve({
        id: '1',
        email,
        password
      } as User)
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: clonedUserService
        }
      ]
    }).compile()

    service = module.get(AuthService)

  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined()
  })

  it('password is hashed', async () => {
    const randomEmail = 'asdf@gmail.com'
    const randomPassword = 'asdf'
    const user = await service.signup(randomEmail, randomPassword)

    expect(user.password).not.toEqual(randomPassword)


  })
})

