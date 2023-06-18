import multer from 'multer';
import { extname, resolve } from 'path';

const random = Math.floor(Math.random() * 10000 + 10000);

export default {

  // === checagem de formats jpg/png ===
  fileFilter: (req, file, cb) => {
    // faz checagem :
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(
        new multer.MulterError('Arquivo precisa ser PNG ou JPG!'), // <-- mostra erros
      );
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null, // <- caso tenha erro
        resolve(
          __dirname, // <- pasta atual
          '..', // <-- volta uma
          '..', // <-- volta uma
          'upload',
          'img', // <- caminho
        ),
      );
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${Date.now()}_${random}${extname(file.originalname)}`, // <- define data + nome original
      );
    },
  }),
};
