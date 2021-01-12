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
        // return this.toIntent('RecBedTimeIntent');
    },
    WelcomeIntent() {
        this.ask('Welcome to Sleep Schedule! Tell me what time you want to wake up');

    },
    RecBedTimeIntent() {

        const userWakeUpTime = this.$inputs.userWakeUpTime.key;

        // const wakeUpTime = moment(userWakeUpTime)

        const sleepTime = this.calculateSleepTime(userWakeUpTime)

        this.$speech.addText( 'You should go to bed at ' + sleepTime)

        this.tell(this.$speech)
        // this.$speech.addText('To wake up at ' + userWakeUpTime + ', you need to sleep at' + recommendedBedTime)
    },
    RecWakeUpTimeIntent() {

        // if (this.$inputs.whenToSleep == null){
        //     userSleepTime = 0
        // }

        // const userSleepTime = this.$inputs.whenToSleep.key
        const userSleepTime = this.$inputs.duration

        console.log(userSleepTime)
        

        const wakeUpTime = this.calculateWakeUpTime(userSleepTime)

        this.$speech.addText('If you go to bed now, you should wake up at ' + wakeUpTime )
        
        this.tell(this.$speech)

    },
    // YesIntent() {
    //     this.ask('Do you need to wake up at a certain time');

    //     this.ask('Hello World! What\'s your name?', 'Please tell me your name.');

        
    // },
    // NoIntent() {
    //     this.ask('Do you need to wake up at a certain time');

    //     this.ask('Hello World! What\'s your name?', 'Please tell me your name.');

        
  
    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },

    calculateSleepTime(inputTime){
        let userWakeUpTime = moment(inputTime)
        userWakeUpTime.subtract(465, 'minutes')
        return userWakeUpTime.format('LT')
    },

    calculateWakeUpTime(inputHowLong){

        let currentTime = moment()
        // console.log(currentTime.format('LT'))

        currentTime =  currentTime.add(465 + inputHowLong, 'minutes')
        // var wakeUpTimesArray = []
        // wakeUpTimesArray.push(currentTime.add(285, 'm').format('LT'))
        
        // wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
        
        // wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
        
        // wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
      
        
        return currentTime.format('LT')
      }
});



module.exports.app = app;
