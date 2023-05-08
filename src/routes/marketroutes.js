const { Router} = require("express")

const router = Router()

const markets = [
    {
        name: "Market Square",
        description : "All purpose sales"
    },
    {
        name: "Spar",
        description : "All purpose sales"
    },
    {
        name: "Shoprite",
        description : "All purpose sales"
    },
]

router.get("/",(req,res)=>{
    res.send(markets)
})

module.exports = router