const passport = require("passport")
const DiscordStrategy = require('passport-discord').Strategy;
const User = require("../database/schemas/discord")

passport.serializeUser((user,done)=>{
    console.log("serialing user...")
    console.log(user)
    done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    console.log("deserializing user id...")
    console.log(id)
    try{
     const user = await User.findById(id)
     if(!user) throw new Error("user not found")
     console.log(user)
     done(null,user)
    }catch(err){
        console.log(err)
        done(err,null)
    }
})

const scopes = ['identify'];

passport.use(new DiscordStrategy({
    clientID: '1103340083718926396',
    clientSecret: 'eQMpU-4vFXwVG0Cg7YIsErjHzFDvKOYA',
    callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
    scope: scopes
},
async function(accessToken, refreshToken, profile, done) {
   console.log(accessToken,refreshToken)
   console.log(profile)
   try{
    const discordUser = await User.findOne({discordID : profile.id})
   if(discordUser){
    console.log("found user")
    return done(null,discordUser)
   }else{
    const newUser = await User.create({discordID : profile.id})
    console.log("created new user")
    return done(null,newUser)
   }} catch(err){
    console.log(err)
    return done(err,null)
   }
}));