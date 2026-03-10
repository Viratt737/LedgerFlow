const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowercase: true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invail email"],
        unique:true
    },
    name:{
        type:String,
        required:[true, "name is required for creating a account"]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating a user"],
        minlength : [6,"PassWord must be atleast 6 character"],
        select:false
    }
},
{
    timestamps: true,
});

userSchema.pre('save', async function(next){
     
    if(!this.isModified('password')){
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;