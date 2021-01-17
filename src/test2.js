const moment = require('moment')

// let ret = calculateSleepTime("2021-01-15T19:00:00")
let sleepnow =  calculateWakeUpTime()
console.log(sleepnow)

function 
calculateSleepTime(inputTime) {
    let userWakeUpTime = moment(inputTime)
    var bedTimesArray = []
    // recommend 6,then 5 and 4 
    bedTimesArray.push(userWakeUpTime.subtract(555, 'minutes').format('LT'))
    bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))
    bedTimesArray.push(userWakeUpTime.add(90, 'minutes').format('LT'))



    return bedTimesArray
}


function   calculateWakeUpTime() {
  let date =  new Date()
  let currentTime = moment("2021-01-14T19:27:00")

  var wakeUpTimesArray = []
  // recommend 6, then 5 and 4
  wakeUpTimesArray.push(currentTime.add(375, 'm').format('LT'))
  wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
  wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))

  return wakeUpTimesArray
}