var express = require('express');
var router = express.Router();
const User = require('../models/usermodel');
const jwt = require( 'jsonwebtoken');
const {auth, checkRole} = require('../middlewares/authmiddleware');
const bcrypt = require('bcryptjs');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register route 
router.post('/register',async function(req,res,next){
  try{
    const {name, email, password, role, phone} = req.body;

    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({msg: 'User already exists'});
    }
    
    const pass = await bcrypt.hash(password, 10);
    user = new User({name, email, password: pass, role, phone});
    await user.save();

    res.status(201).json({message: 'user successfully registered'});
  }
  catch(error){
    res.status(500).json({message: 'Error registering user'});
  }
})

// Login route

router.post("/login", async (req, res , next) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "Invalid email or password." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({ message: "Login successful!", token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Logout Route
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully!" });
});

//dashboard route
router.get('/dashboard',auth,checkRole(['admin']),function(req,res,next){
  res.json({message: 'welcome to admin dashboard'})
})


module.exports = router;
