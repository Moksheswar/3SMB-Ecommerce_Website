let otpSent=-1
async function verify(){
    showtoast();
    let mail=document.getElementById('login-email').value
    const res=await fetch('http://localhost:5000/get-otp',{
        method:"POST",
        headers:{
            "Content-Type":"Application/JSON"
        },
        body:JSON.stringify({
            mail
        })
    });
    const data=await res.json();
    otpSent=data.otp;
}
let toastBox = document.getElementById('toastBox');
function showtoast() {
    let toast = document.createElement('div');
    toast.classList.add('toast1');
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i>OTP sent successfully';
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}
function showSignUp() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}
function showLogin() {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}
async function signUp() {
    let username = document.getElementById('signup-username').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    const res=await fetch('http://localhost:5000/user/signup',{
        method:"POST",       
        headers:{
            "Content-Type":"Application/JSON"
        },
        body:JSON.stringify({
            username:username,
            pass:password,
            email:email
        })
    });
    const data=await res.json();
    if (res.ok) {
        console.log("Registration successful");
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } else {
        alert("User Already Exixts!");
    }
}
async function login() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let otp=document.getElementById('login-otp').value;   
    console.log('login',email, password);

    const res=await fetch('http://localhost:5000/user/login',{
        method:"POST",       
        headers:{
            "Content-Type":"Application/JSON"
        },
        body:JSON.stringify({
            pass:password,
            email:email
        })
    });
    const data=await res.json();
    console.log(data);
    console.log('login',email, password);
    if (res.ok && data.status) {
        if(otp==otpSent){
            localStorage.setItem("log",true);
            localStorage.setItem("user",email);
            window.location.href="frontpage.html";
        } 
        else {
            alert("Invalid OTP");
        }
    } else {
        alert("No Account Found Please Create!");
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'block';
    }
}