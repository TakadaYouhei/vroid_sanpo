"use strict";

function init()
{
  // ペースト
  var btn_code_paste = document.getElementById("btn_code_paste");
  var txt_auth_code = document.getElementById("txt_auth_code");
  btn_code_paste.addEventListener("click", function(){
    navigator.clipboard.readText()
      .then(text => {
        txt_auth_code.value = text;
      })
      .catch(err => {
        txt_auth_code.value = "error";
      });
  });
}
function main()
{
  init();
}


document.addEventListener('DOMContentLoaded', main);
