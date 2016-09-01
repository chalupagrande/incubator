var helpers  = require('./helpers.js')
//settings live in the names space 's'. so you must use `settings.s.key`
var settings = require('./settings.js')
var express  = require("express")
//~~~~~~~~
var multer   = require('multer')
var upload   = multer({ dest: 'uploads/' })
var request  = require('request')
//~~~~~~~~
var http     = require('http')
var app      = express()

var port = process.env.VCAP_APP_PORT || 3000;
var host = process.env.VCAP_APP_HOST || 'localhost';


//~~~~~ EXPRESS CONFIG ~~~~~~~
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./client'));

/* ~~~~~~~~~~~~~~~~~~~~~~~
 FORM SUMBISSION HANDLING
~~~~~~~~~~~~~~~~~~~~~~~~ */
app.post('/upload', upload.single('proposal'), function (req, res, next) {

  console.log(req.body)
  console.log(req.file)

  var services = JSON.parse(process.env.VCAP_SERVICES);
  //service name, check the VCAP_SERVICES in Bluemix to get the name of the services you have
  var service_name = 'bluemailservice'

  if (services[service_name]) {
    var svc = services[service_name][0].credentials
    service_url = "bluemail.w3ibm.mybluemix.net/rest/v2/emails"

    service_username = svc.username
    service_password = svc.password

  } else {
    console.log('The service '+service_name+' is not in the VCAP_SERVICES. Did you forget to bind it?')
  }

  //~~~ BUILD THE EMAIL ~~~
  var email = {};
  email.applicationId = service_username;
  email.password      = service_password;
  email.contact       = req.body.sender || settings.s.defaultSenderEmail;

  //email recipients
  email.recipients =  [{"recipient": settings.s.targetEmail}]
  //adds additional recipients
  if(settings.s.additionalTargetEmails){
    settings.s.additionalTargetEmails.forEach(function(obj){
      email.recipients.push(obj)
    })
  }

  //subject line
  email.subject = settings.s.emailSubject;

  // builds the content of the message
  email.message = helpers.buildMessage(req.body)

  var options = {
            body: email,
            json: true,
            headers: [{
                name: "content-type",
                value: "application/json"
            },
            {
                name: "accept",
                value: "application/json"
            }]
        }

  //send request to Bluemail service.
  request.post(
        'https://'+service_username+':'+service_password+'@'+service_url,
        options, // request options for Bluemail
        function (error, response, body) {
            if (!error && response.statusCode == 201) {
              //construct custom response object
              res.send({
                "error" : false,
                "status": response.body.link[0].href,
                "resend": response.body.link[1].href
              })
            } else {
              res.send({
                "error": true,
                "msg"  : "There was a problem posting your mail."
              })
            }
        }
    );

})//end POST /upload
//~~~~~~~/ EXPRES CONFIG ~~~~~~~~~~~

// ~~~~~ LAUNCH ~~~~~~~~~
var httpServer = http.createServer(app)
httpServer.listen(port)


