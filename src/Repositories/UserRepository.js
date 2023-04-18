const knex = require('knex');
const bcrypt = require('bcryptjs');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datagdb'
  }
});

module.exports = {
  getAllUsers: async () => {
    try {
      const [rows] = await db.raw('SELECT * FROM users');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    }
  },


  addUser:async (user) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const newUser = { ...user, password: hashedPassword };
        const [userId] = await db('users').insert(newUser);
        return { id: userId, ...newUser };
    } catch (err) {
        console.log(err);
        return null;
    }
},

 getUserByEmail: async (email) => {
    try {
      const user = await db('users').where({ email }).first();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};