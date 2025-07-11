import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../authenticator/jwtAuth.js";
export const signUp = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();
    if(newUser){
        createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({ message: "User created successfully",user:{
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email
    } });

    }

  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    createTokenAndSaveCookie(user._id, res);
    res.status(200).json({ message: "Sign in successful",user:{
        _id:user._id,
        fullName:user.fullName,
        email:user.email
    } });

  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const signOut = async(req,res)=>{
try {res.clearCookie("jwt");
res.status(201).json({
    message:"User Logged out successfully"
})
} catch(error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
}
}
export const allUsers = async (req,res)=>{
  try{
    const loggedInUser = req.user._id;
const filterdUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");
res.status(201).json(
  filterdUsers,
);
  } catch(error){
console.log("error in geting all users"+error)
res.status(400).json(error);
  }
}
