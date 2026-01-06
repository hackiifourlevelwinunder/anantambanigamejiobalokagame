
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

let users = fs.existsSync("users.json") ? JSON.parse(fs.readFileSync("users.json")) : {};

function save(){ fs.writeFileSync("users.json", JSON.stringify(users,null,2)); }

app.post("/api/register",(req,res)=>{
  const {mobile,password}=req.body;
  if(users[mobile]) return res.json({ok:false});
  users[mobile]={password,balance:100000};
  save(); res.json({ok:true});
});

app.post("/api/login",(req,res)=>{
  const {mobile,password}=req.body;
  if(!users[mobile]||users[mobile].password!==password) return res.json({ok:false});
  res.json({ok:true,balance:users[mobile].balance});
});

app.post("/api/withdraw",(req,res)=>{
  const {mobile,amount}=req.body;
  if(!users[mobile]||users[mobile].balance<amount) return res.json({ok:false});
  users[mobile].balance-=amount;
  save(); res.json({ok:true,balance:users[mobile].balance});
});

app.listen(3000,()=>console.log("Running http://localhost:3000"));
