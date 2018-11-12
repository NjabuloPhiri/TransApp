const app = new Vue ({
    el: "#app",
    data: {
        uname: "",
        psw: "",
        usernameError: false,
        passwordError: false,
        usernameErrorMessage: '',
        passwordErrorMessage: '' 

    },
    methods: {
        send: function(){
            this.usernameError = false
            this.passwordError = false
            this.usernameErrorMessage = ''

            if(this.psw.length < 6){
                this.passwordError = false
                this.passwordErrorMessage = 'password too short'
            }
            if(this.uname.length < 3){
                this.usernameError = true
                this.usernameErrorMessage = 'username too short'
            }
            if(this.uname.includes('@')){
                this.usernameError = true
                this.usernameErrorMessage = 'Username must be a valid email address'
            }
        }
    }
})

