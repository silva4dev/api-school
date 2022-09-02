module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'alunos',
      [
        {
          nome: 'Luiz',
          sobrenome: 'Andrade',
          email: 'luiz25@gmail.com',
          idade: 25,
          peso: 75,
          altura: 1.6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Antonio',
          sobrenome: 'Branco',
          email: 'antonio720@gmail.com',
          idade: 23,
          peso: 68,
          altura: 1.6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Augusto',
          sobrenome: 'Ribeiro',
          email: 'augusto392@gmail.com',
          idade: 27,
          peso: 73,
          altura: 1.8,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() { return {}; },
};
