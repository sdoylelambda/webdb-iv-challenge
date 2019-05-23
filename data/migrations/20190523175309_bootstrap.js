exports.up = function(knex, Promise) {
    return knex.schema.createTable('dishes', table => {
        table.increments();
        table.string('name').notNullable().unique();
    }).createTable('recipes', table => {
        table.increments();
        table.string('name').notNullable().unique();
        table.integer('dish_id')
        .unsigned().references('id')
        .inTable('dishes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    }).createTable('ingredients', table => {
        table.increments();
        table.string('name', 128).notNullable();
    }).createTable('recipes_ingredients', table => {
        table.increments();
        table.integer('recipe_id').unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        table.integer('ingredients_id').unsigned().references('id').inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('cohorts_students')
    .dropTableIfExists('students')
    .dropTableIfExists('cohorts')
    .dropTableIfExists('tracks')
  };
