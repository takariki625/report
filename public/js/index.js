"use strict;"
const registerForm=document.getElementById("registerForm");
const ul=document.querySelector("ul");

registerForm.addEventListener("submit", e=>{
  e.preventDefault();
  const text=document.querySelector("input[type='text']");
  if(text.value === "")return;
  fetch("?action=register",{
    method:"POST",
    body:new URLSearchParams({
      text:text.value,
    })
  })
  .then(response =>{
    return response.json();
  })
  .then(json =>{
    const li=document.createElement("li");
    li.dataset.id=json;
    li.textContent=text.value;
    const span=document.createElement("span");
    span.textContent="x";
    li.appendChild(span);
    ul.appendChild(li);
    text.value="";
  })
})
ul.addEventListener("click",e =>{
  if(e.target.tagName === "LI"){
    const id=e.target.dataset.id;
    window.location.href="main.php?id="+id;
  }
  if(e.target.tagName === "SPAN"){
    const id=e.target.parentNode.dataset.id;
    const fd=new FormData();
    fd.append("id",id);
    if(confirm("削除しますか？")){
      fetch("?action=delete",{
        method:"POST",
        body:fd
      })
      .then(response =>{
        return response.json();
      })
      .then(json =>{
        if(json){
          e.target.parentNode.remove();
        }else{
          alert("エラーが発生しました");
        }
      })
    }
  }
})
