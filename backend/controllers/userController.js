const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
    const {name, password} = req.body;
    try{ 
           const user = await User.findOne({name});
           if (!user) { return res.status(400).json({status: "Fail", message: "Incorrect Username/Password"});}
           const iscorrect = await bcrypt.compare(password,user.password);
           if (iscorrect){
            var generatedToken = generateToken(user);
            req.session.user = user;
               res.status(200).json({
            status: 'Success',
            token: generatedToken,
            user });
        }
        else {return res.status(400).json({status: "Fail", message: "Incorrect Username/Password"});}
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}

exports.createUser = async (req, res, next) => {
  const {name, password, requestinguserid, requestinguserpassword, adminrights} = req.body;
  try{
  if (checkifadmin(requestinguserid, requestinguserpassword))
  {
  try{ 
         const hashpassword = await bcrypt.hash(password, 12);
         const newUser = await User.create({name, password: hashpassword, adminrights: adminrights});
         res.status(200).json({
          status: 'Success',
          data: {user: newUser} 
      });
      }
  catch (e) { res.status(400).json({status: "Fail"});}
} 
else res.status(400).json({status: "Fail: Unauthorized User"});
}
catch (e) { res.status(400).json({status: "Fail"});}
}

exports.getAllUsers = async (req, res, next) => {
  try{
  const {requestinguserid, requestinguserpassword} = req.body;
  if (checkifadmin(requestinguserid, requestinguserpassword))
  {
    try{ 
        const users = await User.find();
         res.status(200).json({
          status: 'Success',
          results: users.length,
          data: {users: users} 
      });
      }
      catch (e) { res.status(400).json({status: "Fail"});}
    } 
    else res.status(400).json({status: "Fail: Unauthorized User"});
}
catch (e) { res.status(400).json({status: "Fail"});}
}

exports.updateUser = async (req, res, next) => {
  const {newname, newpassword, newadminrights, requestinguserid, requestinguserpassword} = req.body;
  try{
    if (checkifadmin(requestinguserid, requestinguserpassword))
    {
    try{
      const usertoupdate = await User.findOne({_id: req.params.id});
      var updatename = "";
      var hashpassword = "";
      var updateadminrights = 0;
      if(!newname){updatename = usertoupdate.name;}
      else {updatename = newname;}
      if(!newpassword){hashpassword = usertoupdate.password;}
      else {hashpassword = await bcrypt.hash(newpassword, 12);}
      if(!newadminrights){updateadminrights = usertoupdate.adminrights;}
      else {updateadminrights = newadminrights;}
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {name: updatename, password: hashpassword, adminrights: updateadminrights}, {new: true, runValidators: true});
         res.status(200).json({
          status: 'Success',
          data: {user: updatedUser} 
      });
      }
  catch (e) { res.status(400).json({status: "Fail"});}
  } 
else res.status(400).json({status: "Fail: Unauthorized User"});
}
catch (e) { res.status(400).json({status: "Fail"});}
}

exports.deleteUser = async (req, res, next) => {
  const {requestinguserid, requestinguserpassword} = req.body;
  try{
    if (checkifadmin(requestinguserid, requestinguserpassword))
    {
    try{ 
         const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json({
          status: 'Success'
      });
      }
  catch (e) { res.status(400).json({status: "Fail"});}
} 
else res.status(400).json({status: "Fail: Unauthorized User"});
}
catch (e) { res.status(400).json({status: "Fail"});}
}


exports.logOut = async (req, res) => {
  try{ 
      res.status(200).json({status: "LogOut Complete"});
    }
  catch (e) { res.status(400).json({status: "Fail"});}
}

exports.verifyToken = async (req, res) => {
  var token = req.body.token;
  var user = req.body.user;

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.SESSION_SECRET, function (err) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    return res.status(200).json({ token, user });
  });
}

exports.verifyTokenRequest = async (req) => {
  var token = req.body.token;

  if (!token) {
    return false;
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.SESSION_SECRET, function (err) {
    if (err) return false;

    return true;
  });
}
 
function generateToken(user) {
  if (!user) return null;
  var u = {name: user.name };
  return jwt.sign(u, process.env.SESSION_SECRET, {
    expiresIn: 60 * 60
  });
}

checkifadmin = async (requestinguserid, requestinguserpassword) =>
{
  const requestingusertoverify = await User.findOne({_id: requestinguserid});
  if (!requestingusertoverify) { return false;}
  if (requestingusertoverify._doc.adminrights === 1)
  {
  if (requestinguserpassword === requestingusertoverify._doc.password) iscorrect = true;
  if (iscorrect){
    return true;
  }
  else return false;
  }
}