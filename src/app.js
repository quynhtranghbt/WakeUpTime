'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const moment = require('moment-timezone')
const app = new App();
const { TimeZonePlugin } = require('jovo-community-plugin-timezone');
app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new TimeZonePlugin()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('WelcomeIntent');
    },
    WelcomeIntent() {
        this.$speech.addText(['Welcome to Wake Up Time!', 'Good evening!', 'Your sleep assistant is here.'])
        this.$speech.addBreak('300ms')

        this.$speech.addText(['I can recommend times to go to bed, or when to wake up according to your sleep cycle.', 'I will give you suggestions on: when to sleep, or when to wake up.', 'By calculating sleep cycles, I can recommend you times to wake up, or go to bed.'])
        this.$speech.addBreak('300ms')
        this.$speech.addText('Tell me what time you want to wake up')
        this.$speech.addBreak('300ms')
        this.$speech.addText([', or tell me if you want to sleep now', ', or say "I want to sleep now."',])

        // this.ask(this.$speech)
        let title = 'Wake Up Time'
        let content = 'A sleep calculator to help you find best time to wake up or go to bed based on your sleep cycle.'
        let imageUrl = 'https://trang102.s3.amazonaws.com/sleeping.jpg'
        //big banner get from here https://unsplash.com/photos/5NzOfwXoH88
        this.showImageCard(title, content, imageUrl)

        this.ask(this.$speech)

    },
  async  RecBedTimeIntent() {
        //Get time for input
        let userWakeUpTime = '';
        if (this.$alexaSkill) {
            const timeComponents = this.$inputs.userWakeUpTime.key.split(':');
            let date = new Date();
            date.setHours(Number(timeComponents[0]));
            date.setMinutes(Number(timeComponents[1]));
            userWakeUpTime = date.toISOString();
        }
        else {
            userWakeUpTime = this.$inputs ? this.$inputs.userWakeUpTime.key : "error no time";
        }

        const sleepTime = this.calculateSleepTime(userWakeUpTime)


        //Save as session data for debug
        let date = new Date()
        let c = moment();
        let m = moment(userWakeUpTime);
        this.$session.$data.userWakeUpTime = userWakeUpTime;
        this.$session.$data.dateObj = date.toISOString()
        this.$session.$data.currentMomentObj = c.format()
        this.$session.$data.momentObj = m.format()
        this.$session.$data.sleepTime = sleepTime
        this.$session.$data.input = this.$inputs.userWakeUpTime.key

        // const tz = await this.$timeZone.getTimeZone();


        // this.$speech.addText(this.$session.$data.$timeZone);
        this.$speech.addText('You should go to bed at ')
        for (let i = 0; i < sleepTime.length; i++) {
            if (i == sleepTime.length - 1) {
                this.$speech.addText('or ')
            }
            this.$speech.addText(sleepTime[i])
            this.$speech.addBreak('500ms')
        }
        this.$speech.addBreak('300ms').addText(['Good night!', 'Have a good night!', 'Sweet dreams!', "Good night! Don't let the bed bugs bite."])

        this.ask(this.$speech)

    },
    RecWakeUpTimeIntent() {


        const wakeUpTime = this.calculateWakeUpTime()


        //Save as session data for debug
        let date = new Date()
        let m = moment();
        this.$session.$data.wakeUpTime = wakeUpTime;
        this.$session.$data.dateObj = date.toISOString()
        this.$session.$data.momentObj = m.format()
          


        this.$speech.addText('If you go to bed now, you should wake up at ')
        this.$speech.addBreak('300ms')

        for (let i = 0; i < wakeUpTime.length; i++) {
            if (i == wakeUpTime.length - 1) {
                this.$speech.addText('or ')
            }
            this.$speech.addText(wakeUpTime[i])

            this.$speech.addBreak('500ms')
        }
        this.$speech.addBreak('300ms').addText(['Good night!', 'Have a good night!', 'Sweet dreams!', "Good night! Don't let the bed bugs bite."])
        this.ask(this.$speech)

    },

    END() {
        this.tell(['Goodbye', 'Good night']);
    },
    Help() {
        this.$speech.addText('Tell me what time you want to wake up')
        this.$speech.addBreak('300ms')
        this.$speech.addText([', or tell me if you want to sleep now.', ', or say "I want to sleep now."', ', or ask: "What time I should wake up?"'])
        this.$speech.addBreak('400ms')
        this.$speech.addText('To close the app, say "stop".')
        this.ask(this.$speech);
    },


    Cancel() {
        this.tell(['Goodbye', 'Good night']);
    },

    calculateSleepTime(inputTime) {
        let userWakeUpTime = moment(inputTime).tz("America/New_York")
        var bedTimesArray = []
        // recommend 6,then 5 and 4 
        bedTimesArray.push(userWakeUpTime.subtract(555, 'minutes').format('LT'))
        bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))
        bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))



        return bedTimesArray
    },

    calculateWakeUpTime() {
        let date =  new Date()
        let currentTime = moment(date).tz("America/New_York")

        var wakeUpTimesArray = []
        // recommend 6, then 5 and 4
        wakeUpTimesArray.push(currentTime.add(375, 'm').format('LT'))
        wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
        wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))

        return wakeUpTimesArray
    }
});



module.exports.app = app;
