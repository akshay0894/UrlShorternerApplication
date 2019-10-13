const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const nanoid= require('nanoid');
const dns = require('dns');
const userRouter = require('./routers/user');
const shortUrlModel= require('./models/shorturl');
const auth = require('./authenticate');

const app=express();
mongoose.Promise= global.Promise;

app.use(( req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, Content-type, Accept, X-Requested-With, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, DELETE, POST,PUT, PATCH, OPTIONS');
  next();
})

mongoose.connect(process.env.mongodbURL, {useNewUrlParser: true}).then(()=>{
console.log('connecntion to db')}).catch(()=>{
})
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(userRouter);
app.get('/', (req,res)=>{
  res.send(path.join(__dirname, '../dist/index.html'));
});

app.post('/shorten',async (req, res,next) => {
    let orignalUrl;
    try{
      orignalUrl= new URL(req.body.longurl);
    }
    catch{
      return res.status(400).json({error:'invalid url'});
    }

    dns.lookup(orignalUrl.hostname, (err)=>{
      if (err){
        return res.status(404).json({error:'Address not found'});
      }
    })

    //genetaring unique id
    const uniqueId = nanoid(7);

    //first finding the document and if not present  save the url in the db
    const doc = await shortUrlModel.findOne({longurl:orignalUrl});
    if(doc){
      res.status(200).json(doc);
    } else {
      const urlObject = new shortUrlModel({
        longurl:orignalUrl,
        shorturl:process.env.localUrl+"/"+uniqueId
      });
     urlObject.save().then(doc =>{
      res.status(200).json(doc);
     });
    }
});

//returning new url when user trying to hit short url
app.get('/:shortid',(req,res,next) =>{
  const shortid= req.params.shortid;

  shortUrlModel.findOne({shorturl: process.env.localUrl+"/"+shortid })
  .then((doc)=>{
   if(doc){
    res.redirect(doc.longurl);
   } else
     res.send(" url does not exists");
  })
})
app.listen(process.env.port|| 3000, ()=>{
  console.log("connected");
})
