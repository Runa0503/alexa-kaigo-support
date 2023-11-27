(() => {
  // ユーザープールの設定
  const poolData = {
    UserPoolId: "us-east-2_ZbFTPSICT",
    ClientId: "2gbu9f376htq5psvp8lbimpf5a"
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const attributeList = [];

  // Amazon Cognito 認証情報プロバイダーを初期化します
  AWS.config.region = "us-east-2"; // リージョン
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:74d6c027-7793-4093-b740-77e0f2016fb7"
  });

  // 「Create Account」ボタン押下時
  const createAccountBtn = document.getElementById("createAccount");
  createAccountBtn.addEventListener("click", () => {
    /**
     * サインアップ処理。
     */
    const username = document.getElementById("userid").value;
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById('password').value;

    // 何か1つでも未入力の項目がある場合、処理終了
    const message = document.getElementById("message-span");
    if (!username | !email |!name | !password) {
      message.innerHTML = "未入力項目があります。";
      return false;
    }

    // ユーザ属性リストの生成
    const dataName = {
      Name: "name",
      Value: name
    };
    const dataEmail = {
      Name: "email",
      Value: email    
    }
    const dataRole = {
      Name: "custom:role",
      Value: "5"
    };
    const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataName
    );
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );
    const attributeRole = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataRole
    );

    attributeList.push(attributeName);
    attributeList.push(attributeEmail);
    attributeList.push(attributeRole);

    // サインアップ処理
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        message.innerHTML = err.message;
        return;
      } else {
        // サインアップ成功の場合、アクティベーション画面に遷移する
        alert(
          "登録したメールアドレスへアクティベーション用のリンクを送付しました。"
        );
        location.href = "signin.html";
      }
    });
  });
})();
