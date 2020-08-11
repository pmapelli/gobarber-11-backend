import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfleService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh',
      email: 'jonh@example.com',
    });

    expect(updatedUser.name).toBe('Jonh');
    expect(updatedUser.email).toBe('jonh@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@email.com',
      password: 'senhaForte',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Tiago',
        email: 'jonhdoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh',
      email: 'jonh@example.com',
      old_password: 'senhaForte',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh',
        email: 'jonh@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@email.com',
      password: 'senhaForte',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh',
        email: 'jonh@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
