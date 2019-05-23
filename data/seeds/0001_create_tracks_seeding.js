// what here?????????
exports.seed = function(knex, Promise) {
  return knex('dishes').insert([
    {name: 'WEB'},
    {name: 'Android'},
    {name: 'IOS'}
  ]);
};
