
async function login(){
  const r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({mobile:mobile.value,password:pass.value})});
  const d=await r.json(); if(d.ok) location.href="lobby.html"; else alert("Login failed");
}
async function register(){
  const r=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({mobile:mobile.value,password:pass.value})});
  const d=await r.json(); alert(d.ok?"Registered":"User exists");
}
