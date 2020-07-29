import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    expect(
      createUser.execute({
        name: 'Jonh Doe',
        email: 'jonhdoe@email.com',
        password: 'senhaForte',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
