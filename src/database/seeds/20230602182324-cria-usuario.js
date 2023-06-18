// === imports ===
const bcryptjs = require('bcryptjs');
// posso utilizar pra encher de dados
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      nome: 'Dev_users',
      email: 'dev@gmail.com',
      // utilizo bcrypt para criptar senha  e tamanho do hash
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Dev_users2',
      email: 'dev2@gmail.com',
      // utilizo bcrypt para criptar senha  e tamanho do hash
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Dev_users3',
      email: 'dev3@gmail.com',
      // utilizo bcrypt para criptar senha  e tamanho do hash
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]),

  down: () => {},
};
