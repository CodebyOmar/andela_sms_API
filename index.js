const app = require('express')()
      ,admin = require('firebase-admin')
      ,serviceAccount = require("./config/serviceAccountKey")
      ,config = require('./config/app')
      ,bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  });

  next()
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://andela-sms.firebaseio.com"
});   

/* routes */
const studentRoute = require('./routes/student');

/* configure routes */
app.use("/students",studentRoute)


app.listen(config.port);
console.log(`App running on port ${config.port}`)