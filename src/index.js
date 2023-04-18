const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2/promise');
const knex = require('knex');
const userRoute = require('./Routes/userRoute');
const postRoute = require('./Routes/postRoute');
const config = require('./config');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datagdb'
  }
});

const schema = buildSchema(`
  type Post {
    id: ID!
    text: String!
    image: String
    status: String!
    likes: Int!
    user_id: Int!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getAllPosts: [Post!]!
  }
`);

const root = {
  getAllPosts: async () => {
    try {
      const [rows] = await db.raw('SELECT * FROM posts');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});