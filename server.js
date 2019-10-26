const express = require('express')
const server = express()
const knex = require("knex")
const knexConfig = require("./knexFile.js")
const db = knex(knexConfig.development)
const {dateTimeParse, dateParse} = require('./middleware.js')
server.use(express.json())
module.exports = server



server.get("/doctors/all", (req, res) => {
  db.select('*').from('doctors')
    .then(allTests => { res.status(200).json(allTests) })
    .catch(error => res.status(500).json({message: "there was a problem getting your resource", error}))
})

server.get("/doctors/:id/appointments/:date", (req, res) => {

  // need to check for day
  const {id, date} = req.params
  const newDate = date.replace("_", " ")
    console.log(newDate)
  db.select("*").from("appointments")
    .where({doctor_id: id, date: newDate})
    .then(appointments => res.status(200).json(appointments))
  .catch(error => res.status(500).json({message: "there was a problem getting your resource", error}))

})
server.post("/doctors", (req, res) => {
  const data = req.body
  db('doctors')
    .insert(data)
    .then(id => res.status(201).json(id))
    .catch(error => res.status(500).json({message: "There was a problem creating the resource", error}))
})

server.delete("/appointments/:id", (req, res) => {
  const {id} = req.params
    db('appointments')
      .where({id: id})
      .del()
      .then(count => {
        res.status(200).json(count)
      })
      .catch(error => res.status(500).json({message: "could not delete appointment", error}))
})

server.post("/doctors/:id/appointments", timeParse, (req, res) => {
  
  // new appointments can only start 15 min increments
  // maximum of tthree appointments at a time.
  const {patient_first_name, patient_last_name, time, date, new_patient}= req.body
  console.log("times", time)
  const downCaseDate = date.toLowerCase()
  const {id} = req.params
  db("appointments")
    .where({doctor_id: id, time: time})
    .then(times => {
      console.log(times.length)
      if(times.length >= 3) {
        res.status(500).json({message: "Can't book more than 3 appointments at this time"})
      } else {
      db('appointments')
        .insert({patient_first_name: patient_first_name, patient_last_name: patient_last_name, time: time, date: downCaseDate, new_patient: new_patient, doctor_id: id})
        .then(id => res.status(201).json(id))
        .catch(error => res.status(500).json({message: "There was a problem creating the resource", error}))
      }
    })
   
})
