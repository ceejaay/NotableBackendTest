const server  = require('./server.js')
// server.use(cors());
// server.user(express.json())


const port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log(`\n =============== Web API Listening on http://localhost:${port} ==========\n`)

})


