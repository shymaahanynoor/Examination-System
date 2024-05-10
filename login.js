
var email = document.getElementsByTagName("input")[0];
var password = document.getElementsByTagName("input")[1];
var emailSpan = document.getElementById("emailSpan");
 var passSpan = document.getElementById("passSpan");

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    else {
        passSpan.style.display = 'none';
      

    }
}


$("#signinBtn").on("click", function (e) {
    e.preventDefault();
    console.log("loiu");
    $("input").each(function () {
        var input = $(this);
        if (input.val().trim() === "") {
            $(this).next("span").text("This field is required").css("display", 'inline');
        }
                   
     })

 

let flag=0;
$("span").each(function(e) {

   if( $(this).css("display")=="block"){
     flag++;
    
   }

})

if(flag==0){


var res = JSON.parse( localStorage.getItem("list"))?.find((el)=>{
    return  (el.email == email.value && el.password == password.value);
  
  })
if(res == undefined){

$(".meslog").text(" Incorrect password or Incorrect  Email").css({"color":"red","display":"block"});

}

else{
    localStorage.setItem("name",JSON.stringify(res) )
        $(".meslog").text("Sucsses Login").css({"color":"green","display":"block"});

        setTimeout(()=>{
            window.location="exam.html";
            
              }
            ,1500  )
       
    }

  }

});

