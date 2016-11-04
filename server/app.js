var 
    path = require('path'),
    http = require('http'),
    express = require('express'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    
    // Vue-Router HTML5 History mode
    // http://router.vuejs.org/zh-cn/essentials/history-mode.html
    history = require('connect-history-api-fallback'),  

    router = require('./routes/index')

const 
    NODE_ENV = process.env.NODE_ENV === 'production',
    port = NODE_ENV ? 80 : 3000



app = express()

app.use(history())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json({'limit': '10mb'}))
app.use(bodyParser.urlencoded({'limit': '10mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set seeion
app.use(session({
    secret: 'this is my secret and fuck you all', 
    saveUninitialized: false, 
    resave: false,
    cookie: {httpOnly: true}
}))

// development Access-Control-Allow-Origin
if (!NODE_ENV) {
    app.all('*', function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

        next()
    })
}



// set route
app.use('/resource', router.resource)
app.use('/api', router.api)



app.listen(port, () => {console.log('Server created to port:' + port)})
