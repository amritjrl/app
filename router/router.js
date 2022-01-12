const router=require('express').Router()

router.get('/',(req,res)=>res.send("router running")
)

module.exports=router