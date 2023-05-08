const {Router} = require("express")

const router = Router()

const groceryList = [
    {
        item: "milk",
        quantity: 2,
        amount: 400
    },
    {
        item: "chocolate",
        quantity: 4,
        amount: 1400
    },
    {
        item: "cereal",
        quantity: 1,
        amount: 600
    },
   ]

router.get("/",(req,res)=>{
    const {amount} = req.query
    const parsedAmount = parseInt(amount)
    // res.cookie("visited",true,{
    //     maxAge : 10000
    // })
    if(!isNaN(parsedAmount)){
        const filteredList = groceryList.filter(a=>a.amount <= amount)
        res.send(filteredList)
    }else res.send(groceryList)
})

router.get("/:item",(req,res)=>{
    const {item} = req.params
    let groceryItem = groceryList.find(grocery=> grocery.item?.toLowerCase() === item.toLowerCase())
    res.send(groceryItem)
})

router.post("/",(req,res)=>{
    
    groceryList.push(req.body)
    res.sendStatus(201)
})

router.post("/shopping/cart",(req,res)=>{
    const {cart} = req.session
    if(cart){
        req.session.cart.push(req.body)
    }else {
        req.session.cart = [req.body]
    }
    console.log(req.session)
    res.sendStatus(201)
})

router.get("/shopping/cart",(req,res)=>{
    const {cart} = req.session
    console.log(cart)
    res.send(cart)
})


module.exports = router