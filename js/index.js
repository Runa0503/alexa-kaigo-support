//const AWS = require('aws-sdk');
//const cognitoIdentity = new AWS.CognitoIdentity();

window.onload = function() {
  // ユーザープールの設定
  const poolData = {
    //UserPoolId: "us-east-2_JmUTcwnbM",
    //ClientId: "3opela6mgkmsattg0hpr6mnr4f"
    UserPoolId: "us-east-2_ZbFTPSICT",
	  ClientId: "2gbu9f376htq5psvp8lbimpf5a"
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser(); // 現在のユーザー

  const currentUserData = {}; // ユーザーの属性情報

  // Amazon Cognito 認証情報プロバイダーを初期化します
  AWS.config.region = "us-east-2"; // リージョン
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:74d6c027-7793-4093-b740-77e0f2016fb7"
  });

  // 現在のユーザーの属性情報を取得・表示する
  // 現在のユーザー情報が取得できているか？
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        location.href = "signin.html";
      } else {
        // ユーザの属性を取得
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            location.href = "signin.html";
          }

          // 取得した属性情報を連想配列に格納
          for (let i = 0; i < result.length; i++) {
            currentUserData[result[i].getName()] = result[i].getValue();
          }
          document.getElementById("name").innerHTML =
            "ようこそ！" + currentUserData["name"] + "さん";
          document.getElementById("role").innerHTML =
            "Your Role is " + currentUserData["custom:role"];
          document.getElementById("email").innerHTML =
            "Your E-Mail is " + currentUserData["email"];

          // サインアウト処理
          const signoutButton = document.getElementById("signout");
          signoutButton.addEventListener("click", event => {
            cognitoUser.signOut();
            location.reload();
          });
          signoutButton.hidden = false;
          console.log(currentUserData);
        });
      }
    });
  } else {
    location.href = "signin.html";
  }
};
