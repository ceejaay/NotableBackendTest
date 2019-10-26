


// time and date comes in like this 13:15 05/09/2019
timeParse = (req, res, next) => {
  const validMinutes = ["00", "15", "30", "45"]
  const {time} = req.body
  const splitTime = time.split(":")
  if(validMinutes.includes(splitTime[1])) {
    next()
  } else {
    res.status(500).json({message: "Invalid Time. Apointments must start at 15 minutes intervals"})
  }
}

dateParse = (req, res, next) => {
  const {date} = req.body
  console.log(date)
  next()
}


module.exports = { timeParse, dateParse}
