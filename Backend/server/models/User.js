    import mongoose from "mongoose";
    import bcrypt from "bcrypt"

    const UserSchema = new mongoose.Schema({

        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String},  //password is optional cuz Oauth users exist. for traditional registration, Joi will handle
        profileImageUrl: {type: String,default:""},
        premium: {type:Boolean ,default:false},
        resetPasswordToken:{type:String ,default:null},
        resetPasswordExpires:{type:String ,default:null}



    },{timestamps:true})


    UserSchema.methods.comparePassword = async function (password){

        return await bcrypt.compare(password, this.password);

    }

    const User = mongoose.model("User",UserSchema)

    export default User