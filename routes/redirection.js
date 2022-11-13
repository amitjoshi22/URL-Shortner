const express = require('express');
const router = express.Router();
const Urls = require('../models/shortUrls')
const {findLongUrl} = require('../services/url-service')

router.get('/:code',async(req,res)=>{
    const code = req.params.code;
    const url = await findLongUrl(code);

    if(url){
        return res.redirect(url.link)
    }else{
        return res.redirect('https://www.google.com');
    }

})

module.exports = router;