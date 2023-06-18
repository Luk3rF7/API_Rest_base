// ==== dotenv settings ======
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
// ====== importações ======
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// === import das rotas ====
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/UserRoutes';
import tokenRoutes from './src/routes/TokenRoutes';
import alunoRoutes from './src/routes/AlunoRoutes';
import fotoRoutes from './src/routes/FotoRoutes';

// import database sequelize
import './src/database';
// constante  p/ helmet e cors
const whiteList = [
  // dominio 'https://react2.otaviomiranda.com.br'.
  // localhost ex:
  'http://localhost:3002',
];
// config cors
const corsOption = {
  origin(origin, callback) {
    // faz checagem de dominio
    if (whiteList.indexOf(origin) !== -1 || origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// express com class
class App {
  constructor() {
    // utilizando this
    this.app = express();
    this.middlewares();
    this.routes();
  }

  // criando metodo middleware
  middlewares() {
    // config json
    this.app.use(express.urlencoded({ extended: true })); // <- convert dados da web
    this.app.use(express.json()); // <-- faz leitura do json
    this.app.use(express.static(resolve(__dirname, 'upload'))); // <- arquivo estatico
    // config segurança - liberar acess
    this.app.use(cors(corsOption));
    this.app.use(helmet());
  }

  routes() {
    // config rotas
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/aluno/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

// fazendo exportação do app
export default new App().app;
