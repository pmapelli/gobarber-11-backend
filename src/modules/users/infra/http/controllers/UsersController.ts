import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({ name, email, password });

    // delete user.password;

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  }
}
