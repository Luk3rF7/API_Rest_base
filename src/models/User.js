// === importss ===
import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

// class model do sequelize
export default class User extends Model {
  //
  static init(sequelize) {
    super.init({
      // nossos campos DB
      //  Criando model - com validação

      nome: {
        type: Sequelize.STRING,
        // campo vazio
        defaultValue: '',
        // validaçao
        validate: {
          // obj que faz validação
          len: {
            // difinindo min-max caracteres
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 a 255 caracteres!',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        // campo vazio
        defaultValue: '',
        // validaçao
        unique: {
          msg: 'Email já existe!',
        },
        validate: {
          // obj que faz validação
          isEmail: {
            // difinindo min-max caracteres
            msg: 'Esse E-mail é inválido !',
          },
        },
      },

      password_hash: {
        type: Sequelize.STRING,
        // campo vazio
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        // campo vazio
        defaultValue: '',
        // validaçao
        validate: {
          // obj que faz validação
          len: {
            // difinindo min-max caracteres
            args: [
              6, // <- min
              50, // <max
            ],
            msg: 'A senha precisa ter entre 3 a 50 caracteres!',
          },
        },
      },

    }, {
      sequelize,
    });
    // === setting hook para validação ===
    this.addHook('beforeSave', async (user) => {
      // evitar erro no update
      if (user.password) {
        // fazendo async e  verficação da senha
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  // === metodo valida bcrypt no tokenController ===
  passwordIsValid(password) {
    // isso me retorna um promisse
    return bcryptjs.compare(password, this.password_hash);
  }
}
