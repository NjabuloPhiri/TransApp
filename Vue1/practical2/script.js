function generateGuess(){
  return Math.round(Math.random() * 10)
}

const timerValue =10

const app = new Vue({
    el: "#app",
    data: {
      timer: 10,
      computerGuess: generateGuess(),
      number_guessed: 0,
      errors: [],
      showModal: false,
      success: false,
      failure: false,
      customMessage: ''
    },
    methods: {
      enter: function(){
        if(this.number_guessed == this.computerGuess){
          alert('Genius!')
        }else{
          this.errors.push(true)
          if (this.errors.length >=3){
            alert('You suck!')
            //reset errors
            this.errors = []
            //reset timer
            this.timer = timerValue
            //reset guess
            this.computerGuess = generateGuess() 
          }
        }
      }
    }
  })

function countDown(){
  app.timer--
  if(app.timer === 0){
    app.showModal = true
    app.failure = true
    app.success = false
    app.timer = timerValue
    app.customMessage = "The correct value was "+ app.computerGuess
  }
}
setInterval(countDown, 1000)