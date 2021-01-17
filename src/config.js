// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: false,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
       'AMAZON.CancelIntent': 'Cancel',
       'AMAZON.FallbackIntent' : 'Help',
       'AMAZON.HelpIntent' : 'Help',
       'AMAZON.NavigateHome' : 'WelcomeIntent',
       'Default Fallback Intent' : 'Help',
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },
 };
 