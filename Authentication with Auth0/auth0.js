window.addEventListener('load', function() {

    var webAuth = new auth0.WebAuth({
      domain: 'transapp203.auth0.com',
      clientID: 'FdFFBn1kNXoxO9rb1QKKIb4WpVtqN7o1',
      responseType: 'token id_token',
      scope: 'openid',
      redirectUri: window.location.href
    });
  
    var loginBtn = document.getElementById('btn-login');
  
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
  });