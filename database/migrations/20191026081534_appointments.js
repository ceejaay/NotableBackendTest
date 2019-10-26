
exports.up = function(knex) {
  return knex.schema.createTable("appointments", appointment => { 
    appointment.increments()
    appointment
      .string("patient_first_name", 128)
      .notNullable()
      .unique()
    appointment.string('patient_last_name', 128).notNullable()
    appointment.string("time").notNullable()
    appointment.string("date").notNullable()
    appointment.boolean("new_patient").default(true)
    appointment.integer("doctor_id")
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('doctors')
  })

};

exports.down = function(knex) {
  
};
