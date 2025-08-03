const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const blog=new Schema({
    topic:{type:String,required:true},
    detail:{type:String,required:true},
     User: { type: Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true})

 
const Blog=mongoose.model('Blog',blog);
module.exports=Blog 