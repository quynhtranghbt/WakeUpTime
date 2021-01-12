'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const moment = require('moment')
const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('WelcomeIntent');
    },
    WelcomeIntent() {
        this.$speech.addText('Welcome to Sleep Schedule! Tell me what time you need to wake up')
        this.$speech.addBreak('300ms')
        this.$speech.addText('and I’ll recommend you the time you should go to bed')
        this.$speech.addBreak('500ms')
        this.$speech.addText('or ask')
        this.$speech.addBreak('300ms')
        this.$speech.addText('What time I should wake up?')

        this.ask(this.$speech)

        // this.ask('Welcome to Sleep Schedule! Tell me what time you need to wake up and I’ll recommend you the time you should go to bed or ask “What time I should wake up?”');

    },
    RecBedTimeIntent() {

        const userWakeUpTime = this.$inputs.userWakeUpTime.key;

        const sleepTime = this.calculateSleepTime(userWakeUpTime)

        this.$speech.addText( 'You should go to bed at ')
        for(let i = 0; i<sleepTime.length; i++){
            if (i == sleepTime.length-1){
                this.$speech.addText('or ')
            }
            this.$speech.addText(sleepTime[i])  
            this.$speech.addBreak('700ms')     
        }
        // this.$speech.addText(text)

        this.tell(this.$speech)
        
    },
    RecWakeUpTimeIntent() {

        const userSleepTime = this.$inputs.duration

        console.log(userSleepTime)
        

        const wakeUpTime = this.calculateWakeUpTime(userSleepTime)

        this.$speech.addText('If you go to bed now, you should wake up at ' )
        
        for(let i = 0; i<wakeUpTime.length; i++){
            if (i == wakeUpTime.length-1){
                this.$speech.addText('or ')
            }
            this.$speech.addText(wakeUpTime[i])  
            
            this.$speech.addBreak('700ms')
        }

        // this.$speech.addText(text)
        this.tell(this.$speech)

    },

        
  
    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },

    calculateSleepTime(inputTime){
        let userWakeUpTime = moment(inputTime)
        var bedTimesArray = []
        // recommend 6,then 5 and 4 
        bedTimesArray.push(userWakeUpTime.subtract(555, 'minutes').format('LT'))
        bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))
        bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))
        
        

        return bedTimesArray
    },

    calculateWakeUpTime(){

        let currentTime = moment()
       
        var wakeUpTimesArray = []
        // recommend 6, then 5 and 4
        wakeUpTimesArray.push(currentTime.add(555, 'm').format('LT'))
        wakeUpTimesArray.push(currentTime.subtract(90, 'm').format('LT'))
        wakeUpTimesArray.push(currentTime.subtract(90, 'm').format('LT'))
              
        return wakeUpTimesArray
      }
});



module.exports.app = app;
