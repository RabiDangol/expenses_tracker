import { Schema, model } from 'mongoose';
// const { type } =require('os')

//schema design
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required and should be unique'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{ timestamps:true}
);

//export
const userModel =model('user',userSchema);
export default userModel;