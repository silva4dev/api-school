import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');
class FotoController {
  store(request, response) {
    return upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({
          error: error.code,
        });
      }
      try {
        const { originalname, filename } = request.file;
        const { aluno_id } = request.body;
        const foto = await Foto.create({ originalname, filename, aluno_id });
        return response.json({
          id: foto.id,
          originalname: foto.originalname,
          filename: foto.filename,
          aluno_id: foto.aluno_id,
          url: foto.url,
        });
      } catch (e) {
        return response.status(400).json({
          error: 'Aluno não existe',
        });
      }
    });
  }
}

export default new FotoController();
