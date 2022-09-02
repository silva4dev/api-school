import User from '../models/User';

class UserController {
  // Index
  async index(request, response) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return response.json(users);
    } catch (e) {
      return response.json(null);
    }
  }

  // Store
  async store(request, response) {
    try {
      const user = await User.create(request.body);
      return response.json({
        id: user.id,
        nome: user.nome,
        email: user.email,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }

  // Show
  async show(request, response) {
    try {
      const { id } = request.params;
      const user = await User.findByPk(id, { attributes: ['id', 'nome', 'email'] });
      return response.json(user);
    } catch (e) {
      return response.json(null);
    }
  }

  // Update
  async update(request, response) {
    try {
      const { userId } = request;
      const user = await User.findByPk(userId);
      if (!user) {
        return response.status(400).json({
          error: 'Usuário não existe',
        });
      }
      const updatedUser = await user.update(request.body);
      return response.json({
        id: updatedUser.id,
        nome: updatedUser.nome,
        email: updatedUser.email,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }

  // Delete
  async delete(request, response) {
    try {
      const { userId } = request;
      const user = await User.findByPk(userId);
      if (!user) {
        return response.status(400).json({
          error: 'Usuário não existe',
        });
      }
      user.destroy();
      return response.json([]);
    } catch (e) {
      return response.json(null);
    }
  }
}

export default new UserController();
