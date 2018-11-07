var app = new Vue ({
    el: '#app',
    data: {
        guess: 0,
        user_guess: 0
    },
    methods: {
        showNum: function (){
    
            if(Number(this.user_guess) === this.guess){
                alert('correct!')
                this.guess = Math.round(Math.random() * 10)
                console.log(this.guess)
            }else {
                alert('incorrect. try again.')
            }
        }
    }
})

app.guess = Math.round(Math.random() * 10)

console.log(app.guess)



