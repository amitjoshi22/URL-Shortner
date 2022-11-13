const express = require('express');
const router = express.Router();

const {createRandomShortCode,createCustomShortCode,findLongUrl} = require('../services/url-service')

router.post('/',async(req,res)=>{
    const link = req.body.link;
    const code = req.body.code; 
    if(!code){
        const url = await createRandomShortCode(link);
        return res.json(url)
    }
    try{
        const url = await createCustomShortCode(code,link)
        return res.json(url);
    }catch(error){
        return res.status(400).json({error: error.message})
    }
})

router.get('/:code',async(req,res)=>{
    const code = req.params.code;
    const url = await findLongUrl(code);
    console.log(url);
    if(url){
        return res.status(200).json(url)
    }else{
        return res.status(404).json({error:"No such shortcode created"})
    }

})

module.exports=router;