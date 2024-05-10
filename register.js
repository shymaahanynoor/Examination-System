var firstName = document.getElementsByTagName("input")[0];
var lastName = document.getElementsByTagName("input")[1];
var email = document.getElementsByTagName("input")[2];
var password = document.getElementsByTagName("input")[3];
var password2 = document.getElementsByTagName("input")[4];
var emailSpan = document.getElementById("emailSpan");
var passSpan = document.getElementById("passSpan");
var pass2Span = document.getElementById("pass2Span");

var nameRegex = /^[a-zA-Z]+$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passRegex = /^.{8,}$/;


$(".name").on("input", function (e) {
    if($(this).val()==""){
        $(this).next(".nameSpan").text("This field is required").css("display", 'inline');
    } else if (!nameRegex.test($(this).val())) {
        e.preventDefault();
        $(this).next(".nameSpan").text("Please enter characters only").css("display", 'inline');
        
    } else  {
        $(this).next(".nameSpan").css("display", 'none');
        
    }
});

function checkEmail(e) {
    if(email.value==""){
        emailSpan.textContent = "This field is required";
        emailSpan.style.display = 'inline';
    }
    else if (!emailRegex.test(email.value)) {
        e.preventDefault();
        emailSpan.textContent = "Please enter a valid email";
        emailSpan.style.display = 'inline';
      
    } else {
        emailSpan.style.display = 'none';
    
    }
}
function checkPassword(e) {
    
    if(password.value==""){
        passSpan.textContent = "This field is required";
        passSpan.style.display = 'inline';
    }
    else if (!passRegex.test(password.value)) {
        e.preventDefault();
        passSpan.textContent = "Password should be at least 8 char";
        passSpan.style.display = 'inline';
       
    } else {
        passSpan.style.display = 'none';
      

    }
}
function checkPassword2(e) {
    if(password2.value==""){
        pass2Span.textContent = "This field is required";
        pass2Span.style.display = 'inline';
    }
    else if(password2.value != password.value) {
        e.preventDefault();
        pass2Span.textContent = "Passwords do not match";
        pass2Span.style.display = 'inline';
        return false;
    } else {
        pass2Span.style.display = 'none';
        return true;
    }
}

var datalist=[];
$("#signBtn").on("click", function (e) {
    e.preventDefault();
  
    $("input").each(function () {
        var input = $(this);
        if (input.val().trim() === "") {
            $(this).next("span").text("This field is required").css("display", 'inline');
        }
                   
     })
     
     if(localStorage.getItem("list")!=null){
        datalist=JSON.parse(localStorage.getItem("list"));
      }
        var res = JSON.parse( localStorage.getItem("list"))?.find((el)=>{
          return  (el.email == email.value ) 
        })
    console.log(res);
       if(res==undefined) {
        let flag=0;
        $("span").each(function(e) {
     
           if( $(this).css("display")=="block"){
             flag++;
            
           }
        
        })
        if(flag==0){
            var data={
                firstName:firstName.value,
                lastName:lastName.value,
                email:email.value,
                password:password.value
            
            }
              datalist.push(data);
              localStorage.setItem("list",JSON.stringify(datalist))
              console.log(localStorage.getItem("list"));
            setTimeout(()=>{
     
             window.location="login.html";
             
             }
             ,500 )
    
    $("input").val("");
    $("input[type='submit']").val("Sign up");
    }
    }else{
        emailSpan.textContent = "this Email already exist";
        emailSpan.style.display = 'inline';
      
      }
  
});