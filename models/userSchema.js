const mongoose =require("mongoose");
const validator =require("validator");
const bcryptjs =require("bcryptjs");
const jwt =require("jsonwebtoken");

const keysecret = "abcdefghijklmnopqrstuvwxyz123456"

const userSchema =new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not Valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    cpassword:{
        type:String,
        required:true,
        minlength:8
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
});


//password hashing process
userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password =await bcryptjs.hash(this.password,12);
        this.cpassword =await bcryptjs.hash(this.cpassword,12);
    }
    
    next()
});

//token generate
userSchema.methods.generateAuthtoken =async function(){
    try {
        let token23  =jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        });
       this.tokens =this.tokens.concat({token:token23});
       await this.save();
       return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}

//creating a model

const userdb =new mongoose.model("users",userSchema);


module.exports =userdb;