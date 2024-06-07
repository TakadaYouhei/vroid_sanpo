"use strict";

function main()
{
  var base_url = "https://hub.vroid.com";
  // ペーストボタン
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
  
	// 認証情報読み込み
	// ⚠️認証情報を公開するのは本来はNG。ローカルテスト用の実装。
  var txt_application_id = document.getElementById("txt_application_id");
  var txt_secret = document.getElementById("txt_secret");
  var txt_redirect_uri = document.getElementById("txt_redirect_uri");
  var btn_get_credential = document.getElementById("btn_get_credential");
  btn_get_credential.addEventListener("click", function(){
  	// js を読み込んだhymlから見た JSONファイルのURL
    var url = 'secret/credential.json';
    
    // fetchを使用してJSONファイルを読み込む
    fetch(url)
      .then(response => {
        // レスポンスが正常かチェック
        if (!response.ok) {
          throw new Error('ネットワークレスポンスが正常ではありません');
        }
        // レスポンスをJSONとして解析
        return response.json();
      })
      .then(data => {
        // 解析されたJSONデータを使用
        // console.log(data);
        txt_application_id.value = data.application_id;
        txt_secret.value = data.secret;
        txt_redirect_uri.value = data.redirect_uri;
      })
      .catch(error => {
        // エラー処理
    		console.error('読み込み中にエラーが発生しました:', error);
      });
  });
 
  // アクセストークンの取得
  var btn_get_access_token = document.getElementById("btn_get_access_token");
  btn_get_access_token.addEventListener("click", function(){
    var url = base_url + "/oauth/token";
    var params = {
      client_id: txt_application_id.value,
      client_secret: txt_secret.value,
      redirect_uri: txt_redirect_uri.value,
      grant_type: "authorization_code",
      code: txt_auth_code.value,
    };
    var txt_params = JSON.stringify(params);
    //console.log(txt_params);
    /*
    fetch(url, {
      method:"post",
      headers:{
        "Content-Type": "application/json",
        "X-Api-Version": "11"
      },
      body: txt_params
    })
      .then(response => {
        console.log("success.");
        return response.text();
      })
      .then(data => {
        console.log(data.text());
      }).catch(error => {
        console.error(error.message);
        console.error("token の取得に失敗しました", error);
      });
    });
    */
    try {
      url = "http://zipcloud.ibsnet.co.jp/api/search?zipcode=1000001";
      fetch(url, {
        method:"get",
        
      }).then(response => {
        console.log("ok");
      }).catch(error =>{
        console.error("error", error);
      });
      console.log("ok?");
    } catch(error) {
      console.error("Error:", error);
    }
  });
}


document.addEventListener('DOMContentLoaded', main);
