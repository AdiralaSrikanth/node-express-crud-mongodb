const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const port = 8081
const Contact = require("./models/contact") //Contact var will have schema 

app.use(bodyParser.urlencoded({extended:false}))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride('_method'))


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true} ,(err)=>{ 
    if(err) {
        console.log(err)
    } else{    
    console.log("DB connected")
}
});

app.get("/", (req,res) => {
    Contact.find({}).
    then((data) => { //finding all the docs from db
    res.render("index.ejs", {data:data})
  })    
})

app.post("/", (req,res) => {
//    const contactData = req.body 
  //we need to store the data(contactData) received from client to mongo db
    Contact.create({ //create a mongo db doc
        name: req.body.name,
        email:req.body.email,
        mobile:req.body.mobile
    })
    .then( () => {
        res.redirect("/")
    })
})

//update
app.get("/update/:id", (req,res) => {
    //find
    Contact.findById(req.params.id)
    .then((contact) => {
        res.render("update", {contact: contact})
    })
})

app.put("/update/:id", (req,res) => {
    Contact.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        name: req.body.email,
        mobile: req.body.mobile
    })
    .then (() =>{
        res.redirect("/")
    })
})





app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})