const { User } = require("../model/user")
const JWT = require("jsonwebtoken")
const bycrypt = require("bcryptjs");

//Register

exports.createUser = async(req,res)=>{
    try{
        const existingUser = await User.findOne({email:req.body.email})

        if(existingUser){
           return res.status(200).send({
            success:false,
            message:"User Already Exist !!!"
           }) 
        }

        //hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(req.body.password, salt);

        const user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            confirmpassword: hashedPassword,
            image:req.body.image
          });
        await user.save();

        return res.status(201).send({
            success:true,
            message:"User created successfully !!!",
            user
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"User not created successfully !!!",
            err
        })
    }
}

//Login

exports.login = async(req,res)=>{
    
    const email = req.body.email;
    try{
        const user = await User.findOne({email})
        
        //if user does not exist
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid Credentials"
                
            })
        }

        //if user is exists then check the password
        const comparePassword = await bycrypt.compare(req.body.password,user.password);

        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        
        const {password,role,...rest} = user._doc;
        const token = JWT.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{
            expiresIn :"5d",
        })

        //set token in the browser cookies and send the response to client

        return res.cookie("accessToken",token,{
            httpOnly :true,
            expires:token.expiresIn,
        }).status(200).send({
            success:true,
            message:"Login Successfully",
            data:{...rest},
            token,
            
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Error in Login API",
            err
        })
    }
}