const Urls = require('../models/shortUrls')
const {int2radix64,radix64toint} = require('../services/radix64-service')

async function createRandomShortCode(link) {
    const gencode = parseInt(Math.random()*999999999999)
    console.log(gencode);
    
    const exists = await Urls.findOne({id: gencode})
    //console.log(exists);
   // process.exit();

    if(exists){
		return await createRandomShortCode(link);
    }
   return await Urls.create({
      id:gencode,
      code:int2radix64(gencode),
      link:link
    })

}
async function createCustomShortCode(code, link){
    const gid = radix64toint(code);
    const exists = await Urls.findOne({id:gid})
    if(exists){
        throw new Error("This shortcode [" + code + "] already exists");
    }
    return Urls.create({
        id:gid,
        code:code,
        link:link
    })

}
async function findLongUrl(code){
    const gid = radix64toint(code);
    return await Urls.findOne({id:gid})

}
module.exports ={createRandomShortCode,createCustomShortCode,findLongUrl}