// ======== imports ===========
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from '../models/Foto';
// arrayz com modulos:
const models = [Aluno, User, Foto];

// criando conexao:
const connection = new Sequelize(databaseConfig);
// percorrer array:
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
