const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const user=new Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    list: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    password:{type:String,required:true},
})

const  User=mongoose.model('User',user);
module.exports=User