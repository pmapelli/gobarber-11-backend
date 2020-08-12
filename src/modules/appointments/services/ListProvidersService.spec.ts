import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jonh Tre',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jonh Qua',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
