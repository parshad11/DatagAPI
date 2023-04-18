exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('handle').unique();
        table.string('password');
        table.string('email').unique();
        table.string('avatar');
        table.string('address');
        table.string('phone');
        table.string('role');
        table.string('status');
        table.timestamps(true, true);
      })
      .createTable('posts', function(table) {
        table.increments('id').primary();
        table.string('text');
        table.string('image');
        table.string('status');
        table.integer('likes').unsigned().defaultTo(0);
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps(true, true);
      })
      .createTable('comments', function(table) {
        table.increments('id').primary();
        table.string('text');
        table.integer('likes').unsigned().defaultTo(0);
        table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('cascade');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps(true, true);
      })
      .createTable('replies', function(table) {
        table.increments('id').primary();
        table.string('text');
        table.integer('likes').unsigned().defaultTo(0);
        table.integer('comment_id').unsigned().notNullable().references('id').inTable('comments').onDelete('cascade');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps(true, true);
      })
      .createTable('followers', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.integer('follower_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('followers')
      .dropTableIfExists('replies')
      .dropTableIfExists('comments')
      .dropTableIfExists('posts')
      .dropTableIfExists('users');
  };