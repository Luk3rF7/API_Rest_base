module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'alunos',
    'email',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: () => {},
};
