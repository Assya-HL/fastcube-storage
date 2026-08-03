const API =
localStorage.getItem("api")
||
"http://127.0.0.1:8000";


/* ===========================
AUTH
=========================== */

const logged = localStorage.getItem("logged");

if(!logged){

window.location.href =
"login.html";

}


/* ===========================
ELEMENTS
=========================== */

const tbody =
document.getElementById("tbody");

const total =
document.getElementById("totalFiles");

const uploads =
document.getElementById("uploadsCount");

const storage =
document.getElementById("storageSize");

const uploadForm =
document.getElementById("uploadForm");

const search =
document.getElementById("search");

const dropZone =
document.getElementById("dropZone");

const progressBar =
document.getElementById("progressBar");

const themeBtn =
document.getElementById("themeBtn");


/* ===========================
TOAST
=========================== */

function showToast(msg){

const toast =
document.getElementById("toast");

if(!toast) return;

toast.innerText =
msg;

toast.style.display =
"block";

setTimeout(()=>{

toast.style.display =
"none";

},2000);

}


/* ===========================
ACTIVITY
=========================== */

function addActivity(text){

let activities =

JSON.parse(

localStorage.getItem(

"activities"

)

)

||

[];


activities.unshift(text);


localStorage.setItem(

"activities",

JSON.stringify(

activities

)

);


renderActivities();

}



function renderActivities(){

const list =

document.getElementById(

"activityList"

);


if(!list) return;


let activities =

JSON.parse(

localStorage.getItem(

"activities"

)

)

||

[];


list.innerHTML = "";


activities.forEach(

(item,index)=>{


list.innerHTML +=

`

<li>

<span>

${item}

</span>


<button

class="deleteActivityBtn"

onclick="deleteActivity(${index})">

✖

</button>

</li>

`;

}

);

}



function deleteActivity(index){

let activities =

JSON.parse(

localStorage.getItem(

"activities"

)

)

||

[];


activities.splice(

index,

1

);


localStorage.setItem(

"activities",

JSON.stringify(

activities

)

);


renderActivities();


showToast(

"Activity deleted"

);

}



function clearActivities(){

localStorage.removeItem(

"activities"

);


renderActivities();


showToast(

"Activities cleared"

);

}


/* ===========================
LOAD FILES
=========================== */

async function loadFiles(){

try{

const response =

await fetch(

`${API}/files`

);


const files =

await response.json();


tbody.innerHTML = "";


let totalSize = 0;


files.forEach(file=>{


totalSize +=

file.size || 0;


tbody.innerHTML +=

`

<tr>

<td>

${file.name}

</td>

<td>

${(file.size/1024).toFixed(2)}

KB

</td>

<td>

<button

onclick="downloadFile('${file.name}')">

Download

</button>

<button

onclick="deleteFile('${file.name}')">

Delete

</button>

</td>

</tr>

`;



});


total.innerText =

files.length;


uploads.innerText =

files.length;


storage.innerText =

(totalSize/1024)

.toFixed(2)

+

" KB";


const profileFiles =

document.getElementById(

"profileFiles"

);


const profileUploads =

document.getElementById(

"profileUploads"

);


if(profileFiles){

profileFiles.innerText =

files.length;

}


if(profileUploads){

profileUploads.innerText =

files.length;

}


}

catch(error){

console.log(

error

);


showToast(

"Backend unavailable"

);

}

}
/* ===========================
UPLOAD
=========================== */

if(uploadForm){

uploadForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

const input =

document.getElementById(

"fileInput"

);

if(input.files.length===0){

showToast(

"Choose a file"

);

return;

}

const data = new FormData();

data.append(

"file",

input.files[0]

);

if(progressBar){

progressBar.style.width="30%";

}

await fetch(

`${API}/upload`,

{

method:"POST",

body:data

}

);

if(progressBar){

progressBar.style.width="100%";

}

showToast(

"Upload success"

);

addActivity(

"Uploaded : "

+

input.files[0].name

);

input.value="";

loadFiles();

setTimeout(()=>{

if(progressBar){

progressBar.style.width="0%";

}

},1000);

}

);

}



/* ===========================
DELETE
=========================== */

async function deleteFile(name){

const ok = confirm(

`Delete ${name} ?`

);

if(!ok) return;

await fetch(

`${API}/delete/${name}`,

{

method:"DELETE"

}

);

showToast(

"Deleted"

);

addActivity(

"Deleted : "

+

name

);

loadFiles();

}



/* ===========================
DOWNLOAD
=========================== */

function downloadFile(name){

showToast(

"Downloading..."

);

addActivity(

"Downloaded : "

+

name

);

window.open(

`${API}/download/${name}`

);

}



/* ===========================
SEARCH
=========================== */

if(search){

search.addEventListener(

"input",

()=>{

const value =

search.value.toLowerCase();

const rows =

document.querySelectorAll(

"#tbody tr"

);

rows.forEach(row=>{

const text =

row.textContent

.toLowerCase();

row.style.display =

text.includes(value)

?

""

:

"none";

});

}

);

}



/* ===========================
PAGES
=========================== */

function showPage(pageId){

document.querySelectorAll(

".page"

).forEach(page=>{

page.style.display="none";

});

const page =

document.getElementById(

pageId

);

if(page){

page.style.display="block";

}

document.querySelectorAll(

".sidebar li"

).forEach(li=>{

li.classList.remove(

"active"

);

});

const active =

Array.from(

document.querySelectorAll(

".sidebar li"

)

)

.find(li=>

li.getAttribute(

"onclick"

)

?.includes(

pageId

)

);

if(active){

active.classList.add(

"active"

);

}

}



/* ===========================
PROFILE
=========================== */

function profile(){

showPage(

"profilePage"

);

}


function openSettings(){

showPage(

"settingsPage"

);

}



/* ===========================
THEME
=========================== */

function toggleTheme(){

document.body.classList.toggle(

"dark"

);

const dark =

document.body.classList.contains(

"dark"

);

localStorage.setItem(

"theme",

dark

?

"dark"

:

"light"

);

if(themeBtn){

themeBtn.innerText =

dark

?

"☀️"

:

"🌙";

}

}


if(themeBtn){

themeBtn.addEventListener(

"click",

toggleTheme

);

}
/* ===========================
SETTINGS
=========================== */

function saveSettings(){

const api =

document.getElementById(

"apiUrl"

).value;

const repo =

document.getElementById(

"githubRepo"

).value;

localStorage.setItem(

"api",

api

);

localStorage.setItem(

"repo",

repo

);

showToast(

"Settings saved"

);

}



/* ===========================
LOGOUT
=========================== */

function logout(){

localStorage.removeItem(

"logged"

);

showToast(

"Logout"

);

setTimeout(()=>{

window.location.href =

"login.html";

},1000);

}



/* ===========================
DRAG DROP
=========================== */

if(dropZone){

dropZone.addEventListener(

"dragover",

(e)=>{

e.preventDefault();

dropZone.style.background =

"#eff6ff";

}

);


dropZone.addEventListener(

"dragleave",

()=>{

dropZone.style.background = "";

}

);


dropZone.addEventListener(

"drop",

(e)=>{

e.preventDefault();

dropZone.style.background = "";

const file =

e.dataTransfer.files[0];

if(file){

uploadFile(file);

}

}

);

}



/* ===========================
UPLOAD FILE
=========================== */

function uploadFile(file){

const data =

new FormData();

data.append(

"file",

file

);

fetch(

`${API}/upload`,

{

method:"POST",

body:data

}

)

.then(()=>{

showToast(

"Upload success"

);

addActivity(

"Uploaded : "

+

file.name

);

loadFiles();

})

.catch(()=>{

showToast(

"Upload failed"

);

});

}



/* ===========================
INIT
=========================== */

window.onload = ()=>{


renderActivities();


showPage(

"dashboardPage"

);


loadFiles();



const loader =

document.getElementById(

"loader"

);

if(loader){

loader.style.display =

"none";

}



const theme =

localStorage.getItem(

"theme"

);

if(theme==="dark"){

document.body.classList.add(

"dark"

);

if(themeBtn){

themeBtn.innerText =

"☀️";

}

}



const api =

localStorage.getItem(

"api"

);

const repo =

localStorage.getItem(

"repo"

);



if(api){

const apiInput =

document.getElementById(

"apiUrl"

);

if(apiInput){

apiInput.value = api;

}

}



if(repo){

const repoInput =

document.getElementById(

"githubRepo"

);

if(repoInput){

repoInput.value = repo;

}

}



/* ===========================
USER PROFILE
=========================== */

const user =

JSON.parse(

localStorage.getItem(

"user"

)

);



if(user){


const username =

document.getElementById(

"username"

);


const profileName =

document.getElementById(

"profileName"

);


const profileEmail =

document.getElementById(

"profileEmail"

);



if(username){

username.innerText =

user.name;

}



if(profileName){

profileName.innerText =

user.name;

}



if(profileEmail){

profileEmail.innerText =

user.email;

}


}


};