# 임시기록용

## 로그인,회원가입

- passport-jwt 사용 : 프론트(유저)로부터 req.headers에 토큰을 받음

- 프론트에서 리덕스를 사용해 state를 사용해서 로그인된 유저를 판별해서 헤더에 보여주는 버튼이 달라지게만들었었음<br/>

Ex) 아래 코드처럼..

```javascript
user && avatar::(<span>isLogin</span>);
```

근데 이렇게하면 isLogin 글자를 보여주고 avatar를 보여줌<br/>
원인은 페이지를 렌더링하는과정에서 리덕스로 전역상태인 user가 undefined로 되었다가 서버로부터 user data를 받아서 state user에 저장시키는 과정을 거치게되서 그런거였음 <br/>
그래서 로그인시 리덕스 state에 user를 집어넣고, 로컬호스트에도 user를 집어넣고, 로컬호스트에서 user값을 판별해서 헤더에서 보여주는 버튼이 다르게나타나게끔해줬음
