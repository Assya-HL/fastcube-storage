/* ==========================
REGISTER
========================== */

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener(

"submit",

(e)=>{

e.preventDefault();

const name =
document.getElementById(
"name"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const confirm =
document.getElementById(
"confirm"
).value;


if(password !== confirm){

alert(
"Passwords do not match"
);

return;

}


const user = {
name,
email,
password
};


localStorage.setItem(
"user",
JSON.stringify(
user
)
);


alert(
"Account created successfully"
);


window.location.href =
"login.html";

}

);

}



/* ==========================
LOGIN
========================== */

const loginForm =

document.getElementById(
"loginForm"
);


if(loginForm){

loginForm.addEventListener(

"submit",

(e)=>{

e.preventDefault();


const email =

document.getElementById(
"email"
).value;


const password =

document.getElementById(
"password"
).value;


const remember =

document.getElementById(
"remember"
);


const user = JSON.parse(
localStorage.getItem(
"user"
)
);


if(
!user ||
email !== user.email ||
password !== user.password
){

alert(
"Invalid email or password"
);

return;

}



localStorage.setItem(
"logged",
"true"
);


if(
remember &&
remember.checked
){

localStorage.setItem(
"remember",
"true"
);

} else {

localStorage.removeItem("remember");

}


alert(
"Login successful"
);


window.location.href =
"index.html";

}

);

}



/* ==========================
PROTECTION
========================== */

if(
window.location.pathname.includes(
"index.html"
)
){

const logged =
localStorage.getItem(
"logged"
);

/* FIX 3: check strict */
if(
logged !== "true"
){

window.location.href =
"login.html";

}

}



/* ==========================
AUTO LOGIN
========================== */

if(
window.location.pathname.includes(
"login.html"
)
){

const remember =
localStorage.getItem(
"remember"
);

const logged =
localStorage.getItem("logged");

/* FIX 4: لازم بجوج يكونو true */
if(
remember === "true" &&
logged === "true"
){

window.location.href =
"index.html";

}

}



/* ==========================
LOGOUT
========================== */

function logout() {


localStorage.removeItem("logged");
localStorage.removeItem("remember");

sessionStorage.clear();

window.location.replace("login.html");

}