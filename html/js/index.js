"use strict";

function main()
{
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
    console.log(data);
  })
  .catch(error => {
    // エラー処理
		console.error('読み込み中にエラーが発生しました:', error);
  });

}


document.addEventListener('DOMContentLoaded', main);
