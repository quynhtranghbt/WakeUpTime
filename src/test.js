const moment = require('moment')

let currentTime = moment()
let times = getWakeUpTimes()

for (var i = 0; i < times.length; i++){
console.log(times[i])
}

let bedTimes = getBedTimes(9)
for (var i = 0; i < bedTimes.length; i++){
  console.log(bedTimes[i])
}
// var yesOrNo = promt("Do you need to wake up at a certain time?")
// // if yes, get the time
// if (yesOrNo == "yes"){
// var wakeUpAt = promt("What time do you need to wake up?")
// consle.log("If you want to wake up at" + wakeUpAt + " , you should go to bed at one of the following times:")



// }
// // else, display the time you should wake up
// else{

// // if no, display the times that  you should wake up if you sleep now
// console.log("If you're going to sleep now, you shoul wake up at ...")

// }



function getWakeUpTimes(){

  let currentTime = moment()
  console.log(currentTime.format('LT'))
  var wakeUpTimesArray = []
  wakeUpTimesArray.push(currentTime.add(285, 'm').format('LT'))
  console.log("first add" + currentTime.format('LT'))
  // let currentTime = moment()
  wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
  console.log("first add" + currentTime.format('LT'))
  // let currentTime = moment()
  wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
  console.log("first add" + currentTime.format('LT'))
  // let currentTime = moment()
  wakeUpTimesArray.push(currentTime.add(90, 'm').format('LT'))
  console.log("first add" + currentTime.format('LT'))

  // console.log(currentTime.format('LT'))
  
  return wakeUpTimesArray
}

function getBedTimes(wakeUpHour){
  
  var bedTimesArray = []
  bedTimesArray.push(wakeUpHour.subtract(285, 'm'))
  bedTimesArray.push(wakeUpHour.subtract(90, 'm'))
  bedTimesArray.push(wakeUpHour.subtract(90, 'm'))
  bedTimesArray.push(wakeUpHour.subtract(90, 'm'))

  return bedTimesArray
}
