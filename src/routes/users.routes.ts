import { Router } from 'express';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticate, async (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;
