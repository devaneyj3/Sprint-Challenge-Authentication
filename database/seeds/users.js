
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test', password: 'test'},
        { id: 2, username: 'test1', password: 'test1'},
        { id: 3, username: 'test11', password: 'test2'},
      ]);
    });
};
