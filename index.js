var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var comment = req.body.comments;
// Check if email already exists in the database






//const uniqueValidator = require('uniqueValidator');

    


    db.collection('users').findOne({email: email},(err,user)=>{
        if(err){
            throw err;
        }
        if (user) {
            // If the email already exists, return an error response
            return res.status(409).send("Email already exists.");
        } else
          // If the email doesn't exist, proceed with inserting the 
           {

            const data =  {
                "email": email,
                "name":name,       
                "phno":phno, 
                "comments": comment
            }

            db.collection('users').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
        
                console.log("Record Inserted Successfully");
       
    });
    
    return res.redirect('signup_success.html')
    
} 

});
});


//data.plugin(uniqueValidator, {message: '{value} is alrady exist'});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);



console.log("Listening on PORT 3000");