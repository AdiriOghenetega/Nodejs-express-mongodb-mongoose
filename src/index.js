const express = require("express")
const math = require("./math")
const MongoStore = require('connect-mongo');
const passport = require("passport")
const groceryRouter = require("./routes/groceryroutes")
const marketRouter = require("./routes/marketroutes")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const authRouter = require("./routes/auth")

require("./database")
// require("./strategies/local")
require("./strategies/discord")


const app = express()

const PORT= 3001



app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/test' })
  }))
app.use(express.json())
// app.use(express.urlencoded())

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1/auth",authRouter)


app.use((req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.sendStatus(401)
    }
})


app.use("/api/v1/groceries",groceryRouter)
app.use("/api/v1/markets",marketRouter)

app.listen(PORT,()=>console.log(`Express app running on ${PORT}`))


const {add,sub}=math

console.log(add(5,6),sub(5,6))

