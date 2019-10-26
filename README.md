To run the project:
Note. You may have to have Knex installed locally.
run `npm knex -g install`

1. Install project: `npm install`
2. initalize database: `knex migrate:latest`
3. To run the server, `npm start`


Endpoints:

Get all doctors GET ` /doctors/all`
Create a doctor POST `/doctors`
Get doctor's appointments by date: GET `/doctors/:id/appointments/:date`
Delete an appointment: DELETE `/appointments/:id`
Create an appointment for a doctor: POST `/doctors/:id/appointments`



