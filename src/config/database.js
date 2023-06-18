// === import e utilizando ===
require('dotenv').config();

// === config Db ===
module.exports = {

  // === setting db ===
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {

    // utiliza campo quando um registro foi criado / atualizado
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    time_zone: 'America/Sao_paulo',
  },
  // ===  horario zona local ===
  time_zone: 'America/Sao_paulo',
};
