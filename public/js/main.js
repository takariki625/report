"use strict;"
//header & main
const header=document.querySelector("header");
header.addEventListener("click", e =>{
  if(e.target.id === "editBtn"){
    e.target.style.display="none";
    const box=document.createElement("span");
    box.id="box";
    const cancelBtn=document.createElement("span");
    const saveBtn=document.createElement("span");
    cancelBtn.textContent="x";
    cancelBtn.id="cancelBtn";
    saveBtn.textContent="s";
    saveBtn.id="saveBtn";
    box.appendChild(saveBtn)
    box.appendChild(cancelBtn);
    header.appendChild(box);
    editMethod(0);
  }
  if(e.target.id === "cancelBtn"){
    editMethod(1);
  }
  if(e.target.id === "saveBtn"){
    editMethod(2);
  }
})
const title=document.getElementById("titleSpan");
const comment=document.getElementById("commentSpan");
function editMethod(count){
  if(count === 0){
    const inputText=document.createElement("input");
    inputText.type="text";
    inputText.value=title.textContent;
    title.replaceWith(inputText);
    const inputComment=document.createElement("textarea");
    inputComment.value=comment.textContent;
    comment.replaceWith(inputComment);
    return;
  }else if(count === 1){
    document.querySelector("input[type='text']").replaceWith(title);
    document.querySelector("textarea").replaceWith(comment);
  }else if(count === 2){
    const inputText=document.querySelector("input[type='text']");
    const textarea=document.querySelector("textarea");
    if(confirm("変更した内容を保存しますか？")){
      fetch("?action=update",{
        method:"POST",
        body:new URLSearchParams({
          title:inputText.value,
          comment:textarea.value,
          id:header.dataset.id,
        })
      })
      title.textContent=inputText.value;
      comment.textContent=textarea.value;
      inputText.replaceWith(title);
      textarea.replaceWith(comment);
    }else{
      return;
    }
  }else{
    return;
  }
  header.lastChild.remove();
  document.getElementById("editBtn").style.display="inline";
}

//footer
const footer=document.querySelector("footer");
const formdata=new FormData();
let existingImg=[]; //既存のimg
footer.addEventListener("click", e =>{
  const bigImg=document.getElementById("fild");
  if(bigImg !== null && e.target.id !== "imgDelete"){
    bigImg.lastChild.classList.replace("bigImg","img");
    bigImg.remove();
    return;
  }
  if(e.target.type === "file"){
    for(let i=0; i<=existingImg.length; i++){
      if(e.target.name === existingImg[i]){
        alert("すでに選択しています");
        e.preventDefault();
        return;
      }
    }
    existingImg.push(e.target.name);
    e.target.addEventListener("change", t =>{
      let fileReader=new FileReader();
      fileReader.onload=(function (e){
        const src=e.target.result;
        const img=document.createElement("img");
        img.src=src;
        img.classList.add("upImg");
        const submitSpan=document.getElementById("submitSpan");
        submitSpan.insertBefore(img,submitSpan.firstChild);
        formdata.set(t.target.name,t.target.files[0]);
      })
      fileReader.readAsDataURL(e.target.files[0]);
    })
  }
  if(e.target.id === "upload"){
    const submitSpan=document.getElementById("submitSpan");
    if(submitSpan.childElementCount === 1){
      alert("画像を選択してください");
      return;
    }
    formdata.set("id",header.dataset.id);
    fetch("?action=upload",{
      method:"POST",
      body:formdata,
    })
    .then(response =>{
      return response.json();
    })
    .then(json =>{
      if(json.image1 !== undefined){
        imgEdit("image1",json.image1);
      }
      if(json.image2 !== undefined){
        imgEdit("image2",json.image2);
      }
      if(json.image3 !== undefined){
        imgEdit("image3",json.image3);
      }
    })
  }
  if(e.target.tagName === "IMG" && e.target.className !== "upImg"){
    const div=document.createElement("div");
    div.id="fild";
    const img=e.target.cloneNode(true)
    img.classList.replace("img","bigImg");
    const span=document.createElement("span");
    span.textContent="x";
    span.id="imgDelete";
    div.appendChild(span);
    div.appendChild(img);
    footer.appendChild(div);
  }
  if(e.target.id === "imgDelete"){
    if(confirm("画像を削除しますか？")){
      const image=e.target.parentNode.lastChild.name;
      fetch("?action=imgDelete",{
        method:"POST",
        body:new URLSearchParams({
          image:image,
          id:header.dataset.id,
        })
      })
      fileCreate(e.target.parentNode.lastChild);
    }
  }
})
//labelを作る
function fileCreate(target){
  target.parentNode.remove();
  const image=document.getElementsByName(target.name);
  image.forEach(e=>{
    const label=document.createElement("label");
    label.textContent="+";
    const input=document.createElement("input");
    input.type="file";
    input.accept="image/*";
    input.name=e.name;
    label.appendChild(input);
    e.parentNode.replaceWith(label);
    const newExisting=existingImg.filter(img =>{
      return img !== e.name;
    })
    existingImg=newExisting;
  })
}
//imgをlabelの部分に追加
function imgEdit(number , image){
  formdata.delete(number);
  const numberLabel=document.getElementsByName(number);
  numberLabel.forEach(label =>{
    const img=document.createElement("img");
    img.src=image;
    img.name=number;
    img.classList.add("img");
    const span=document.createElement("span");
    span.id="img";
    span.appendChild(img);
    label.parentNode.replaceWith(span);
    label.remove();
    document.getElementById("submitSpan").firstChild.remove();
  })
}