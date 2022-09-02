import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(request, response) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'desc'], [Foto, 'id', 'desc']],
      include: {
        model: Foto,
        attributes: ['id', 'originalname', 'filename', 'aluno_id', 'url'],
      },
    });
    response.json(alunos);
  }

  async store(request, response) {
    try {
      const aluno = await Aluno.create(request.body);
      return response.json({
        id: aluno.id,
        nome: aluno.nome,
        sobrenome: aluno.sobrenome,
        email: aluno.email,
        idade: aluno.idade,
        peso: aluno.peso,
        altura: aluno.altura,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({
          error: 'Faltando ID',
        });
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'desc'], [Foto, 'id', 'desc']],
        include: {
          model: Foto,
          attributes: ['id', 'originalname', 'filename', 'aluno_id', 'url'],
        },
      });
      if (!aluno) {
        return response.status(400).json({
          error: 'Aluno não existe',
        });
      }
      return response.json(aluno);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({
          error: 'Faltando ID',
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return response.status(400).json({
          error: 'Aluno não existe',
        });
      }
      const alunoAtualizado = await aluno.update(request.body);
      return response.json({
        id: alunoAtualizado.id,
        nome: alunoAtualizado.nome,
        sobrenome: alunoAtualizado.sobrenome,
        email: alunoAtualizado.email,
        idade: alunoAtualizado.idade,
        peso: alunoAtualizado.peso,
        altura: alunoAtualizado.altura,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({
          error: 'Faltando ID',
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return response.status(400).json({
          error: 'Aluno não existe',
        });
      }
      await aluno.destroy();
      return response.json({
        apagado: true,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => ({ [err.path]: err.message })),
      });
    }
  }
}

export default new AlunoController();
