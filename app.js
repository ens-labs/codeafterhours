var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  , exhbs = require('express3-handlebars')
  , sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);

var app = express();


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.engine('handlebars', exhbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.get('/', routes.index);

app.post('/send_email', function(req, res) {  
      sendgrid.send({
      to:       'info@ens-labs.com',
      from:     req.body.email,
      subject:  req.body.subject,
      text:     req.body.message

},    function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
});
      if (res.codeStatus === 200) {
        res.redirect('done-email.html');
      }

});

///////////////////////////////////Server//////////////////////////////////////////////////////////////////////////////////

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});