var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var session = require('express-session');
var RedisStore = require('connect-redis')(session);


// definicja licznika jako „middleware”
var count = function (req, res, next) {
    var n;
    req.session.count = req.session.count || 0;
    if (req.url !== '/favicon.ico') {
      n = req.session.count++;
      res.send('Odwiedzono ' + n + ' razy\n');
    }
};

// obsługa sesji za pomocą ciasteczek
//app.use(cookieSession({secret: '$ekretny $ekret'}));
app.use(session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// dodajemy nasz licznik jako kolejny „middleware”
app.use(count);

app.listen(port, function () {
    console.log('Serwer działa na porcie ' + port);
});
