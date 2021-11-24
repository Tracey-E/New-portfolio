  //jshint esversion: 6;
  //message generator;
  //every login gives new/random message;
  //should contain 3 diff types data;
  //plan of action;
  /*what type of messages to use?;
  (ideas here)1, fortune cookie(sim to mad libs mxd with 8 ball),;
               random message of what future hold,who,time,outcome,;
  */
  //create  random words for who and outcome switch/boolean,; 
  //rand nums = diff time(day week year etc).;
  //outcomes are strings that will be attached.;
  // final message needs to read with all above info,; 
  //bottom
  //start of code;


  function mxdMessages() {
      const generateWho = () => {
          let who = ['You', 'A Friend', 'A relative'];
          const randomNumber = Math.floor(Math.random() * 3);
          return who[randomNumber];
      };
      const time = () => {
          let num = Math.floor(Math.random() * 5);
          switch (num) {
              case 0:
                  return "Today";
              case 1:
                  return "Tomorrow";
              case 2:
                  return "This week";
              case 3:
                  return "This month";
              case 4:
                  return "This year";
              default:
                  return "Try Again";
          };
          return time;

      };
      const outcome = () => {
        let out = ['will complete a task', 'will be offered a hug', 'should get the take away you are wanting'];
        const randomNumber = Math.floor(Math.random() * 3);
        return out[randomNumber];
    };
    alert(` ${ time()} ${ generateWho()}  ${ outcome()} `);
}



     



    
 