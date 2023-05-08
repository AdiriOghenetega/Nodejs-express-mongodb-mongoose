const {Router} = require("express")
const User = require("../database/schemas/user")
const {hashPassword,comparePassword} = require("../utils/helper")
const passport = require("passport")


const router = Router()

// router.post("/login",async (req,res)=>{

//     const {username,password} = req.body

    
//     if(username && password){
//         if(req.session.user){
//             res.send(req.session.user)
//         }else{
//             const userDB = await User.findOne({username})
//             if(!userDB) res.status(401).send("authentication failed")
//             const isValidPass = comparePassword(password,userDB.password)
//             if(!isValidPass) {
//                 res.status(401).send("authentication failed")
//             }else{
//                 req.session.user = userDB
//                 res.status(201).send("authentication successful")
//             }
            
//         }
//     }else res.sendStatus(400)
   
// })

router.post("/login",passport.authenticate("local"),(req,res)=>{
    console.log("logged in")
    res.sendStatus(201)
})

router.post("/register", async (req,res)=>{
    const {username,password,email}= req.body
    const userDB = await User.findOne({$or:[{username},{email}]})
    if(userDB){
        res.status(400).send({msg:"user already exists!"})
    }else{
     const passwordHash = hashPassword(req.body.password)
     console.log(passwordHash)
       const newUser = await User.create({
            username,
            password:passwordHash,
            email
        })
        newUser.save()
        res.sendStatus(201)
    }
})

router.get("/discord",passport.authenticate("discord"),(req,res)=>{
    res.sendStatus(200)
})
router.get("/discord/redirect",passport.authenticate("discord"),(req,res)=>{
    res.sendStatus(200 )
})

module.exports = router