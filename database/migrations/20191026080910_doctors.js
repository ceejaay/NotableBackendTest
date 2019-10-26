
exports.up = function(knex) {
  return knex.schema.createTable("doctors", doctor => { doctor.increments()
    doctor
      .string("first_name", 128)
      .notNullable()
      .unique()
    doctor.string('last_name', 128).notNullable()
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('doctors')

};
