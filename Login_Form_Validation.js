function get(ele){
    return document.querySelector(ele);
}

function clear(){
    email.value = '';
    pwd.value = '';
    emailVal='';
    passwordVal='';
    email.parentNode.className = "input-group email-group";
    pwd.parentNode.className = "input-group password-group";
    res1.style.display = 'none';
}

let email = get('.email');
let pwd = get('.password');
let signin = get('.signin');
let google = get('.google-signin-group');
let forgot1 = get('form .forgot');
let signup = get('.signup-group');
let result1 = get('.result');
let error = get('.error');
let closeIcon = get('.result i');
let res1 = get('.signin-group span');
let emailError = '';
let pwdError = '';
const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


const users =[
    {
        email:'vignesh.t@zirius.in',
        pwd:'Vignesh@123'
    },
    {
        email: 'davidjrmeshach@gmail.com',
        pwd: '#David123'
    },
    {
        email: 'rajasaravananmcsea@gmail.com',
        pwd: 'Raja123#'
    },
    {
        email: 'mageshwaranbalaji25@gmail.com',
        pwd: 'Eshwaran@123'
    },
    {
        email: 'harsha@zirius.in',
        pwd: 'Harsha$123'
    }
]

let emailVal="";
let passwordVal="";

email.addEventListener('input', (event) => {
    emailVal = event.target.value;

    if((emailError=='Empty' && emailVal!="") || (emailError=='Invalid' && regEx.test(emailVal)==true)){
        email.parentNode.className = "input-group email-group";
        emailError='';
    }
})

pwd.addEventListener('input', (event) => {
    passwordVal = event.target.value;
    
    if((pwdError=='Empty' && passwordVal!="") || 
        (pwdError=='Invalid' && passwordVal.length>=6) || 
        (pwdError=='lowercase' && /[a-z]/.test(passwordVal)==true) || 
        (pwdError=='uppercase' && /[A-Z]/.test(passwordVal)==true) || 
        (pwdError=='number' && /[0-9]/.test(passwordVal)==true) || 
        (pwdError=='special' && /[$@!%*#?&]/.test(passwordVal)==true)){
        pwd.parentNode.className = "input-group password-group";
        pwdError='';
    }
})

function emailValidation(){
    let errorMsg='';

    if(emailVal==''){
        errorMsg = "Provide a email";
        emailError = 'Empty'
    }
    else if(regEx.test(emailVal)==false){
        errorMsg = "Provide a properly formatted email";
        emailError = 'Invalid'
    }

    if(errorMsg==''){
        email.nextElementSibling.innerHTML = errorMsg;
        return true;  
    }
    else{
        email.parentNode.className = "input-group email-group error";
        email.nextElementSibling.innerHTML = errorMsg;
        return false;
    }
}

function pwdValidation(){
    let errorMsg='';
    if(passwordVal==''){
        errorMsg = "Provide a password";
        pwdError = 'Empty'
    }
    else if(passwordVal.length<6){
        errorMsg = "Password min 6 char";
        pwdError = 'Invalid';
    }
    else if(/[a-z]/.test(passwordVal)==false ){ 
        errorMsg = "Password min 1 lowercase";
        pwdError = 'lowercase';
    }
    else if(/[A-Z]/.test(passwordVal)==false){
        errorMsg = "Password min 1 uppercase";
        pwdError = 'uppercase';
    }
    else if(/[0-9]/.test(passwordVal)==false){
        errorMsg = "Password min 1 number";
        pwdError = 'number';
    }
    else if(/[$@!%*#?&]/.test(passwordVal)==false){
        errorMsg = "Password min 1 special char";
        pwdError ='special';
    }

    if(errorMsg==''){
        pwd.nextElementSibling.innerHTML = errorMsg;
        return true;
    }
    else{
        pwd.parentNode.className = "input-group password-group error";
        pwd.nextElementSibling.innerHTML = errorMsg;
        return false;
    }

   

}

signin.addEventListener( 'click', (event)=> {
    event.preventDefault();
    let bool = emailValidation();
    let bool1 = pwdValidation();

    if(bool && bool1){
        res1.style.display = 'block';

        if(signin.value == 'Back to Login'){
            clear();
            signin.value = 'Sign In';
            get('form.forgot .header-group h1').innerHTML = 'Welcome back';
            get('form.forgot .header-group span').innerHTML = 'Welcome back! Please enter your details';
            get('form.forgot .password-group label').innerHTML = 'password';
            get('form.forgot .password-group input').placeholder = 'Enter your password';
            get('form.forgot .rem-for-group').style.display = '';
            get('form.forgot .google-signin-group').style.display = '';
            get('form.forgot .signup-group').style.display = '';
            return;
        }

        if(signin.value == 'Change Password'){
            for (let index = 0; index < users.length; index++) {
                if(users[index].email == emailVal){
                    users[index].pwd = passwordVal;
                    email.parentNode.className = "input-group email-group success";
                    pwd.parentNode.className = "input-group password-group success";
                    res1.innerHTML = 'Updated Successfully'
                    res1.className = 'res';
                    signin.value = 'Back to Login';
                    return;
                }
            }
             email.parentNode.className = "input-group email-group";
            pwd.parentNode.className = "input-group password-group";
            res1.className='res error';
            res1.innerHTML = 'Invalid User Identification';
            return;
        }

        for(let user of users){
            if(emailVal==user.email && passwordVal==user.pwd){
                let user_details = {
                    email: user.email,
                    pwd: user.pwd
                }
                localStorage.setItem('user', JSON.stringify(user_details));
                location.href = "home_page.html";
                return;
            }
        }
        email.parentNode.className = "input-group email-group";
        pwd.parentNode.className = "input-group password-group";
        res1.className='res error'
        res1.innerHTML = 'Invalid credentials'
    }
    else{
        res1.style.display='none';
    }
})



function resultPopup( type , err , icon){
    result1.style.display = 'flex';
    closeIcon.className = icon;
    result1.className = type;
    error.innerHTML = err;

    setTimeout(resultClose , 3000);
}

closeIcon.addEventListener('click',resultClose)

google.addEventListener('click',()=>{
    resultPopup("result process","","fa-solid fa-rotate")
})

forgot1.addEventListener('click',()=>{
    clear();
    get('form.forgot .header-group h1').innerHTML = 'Reset Password';
    get('form.forgot .header-group span').innerHTML = 'Enter your new password and try again';
    get('form.forgot .password-group label').innerHTML = 'New password';
    get('form.forgot .password-group input').placeholder = 'Enter new password';
    get('form.forgot .rem-for-group').style.display = 'none';
    get('form.forgot .google-signin-group').style.display = 'none';
    get('form.forgot .signup-group').style.display = 'none';
    signin.value = 'Change Password';
})

signup.addEventListener('click',()=>{
    resultPopup("result process","","fa-solid fa-rotate")
})

function resultClose(){
    result1.style.display = 'none';
    result1.className = 'result';
}
