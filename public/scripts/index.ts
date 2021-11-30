import { getGists } from "./github-manager";


window.onload = async () => {  
    
    console.log('loaded file');

    return await getGists()
    .then(result => {
        console.log('running main');
        console.log(result);
    })
    .catch((e) => {
        console.error(e);
    });
};



if(navigator.mozGetUserMedia) {
  navigator.GetUserMedia(
    testNEL();   
  } else {
    navigator.getUserMedia(
      
    }
    
function testNEL(){
let options = {
  types: ['deprecation'],
  buffered: true
}

let observer = new window.ReportingObserver(function(reports: any, observer: any) {
  console.log('called observer', reoprts, observer);
//   reportBtn.onclick = () => displayReports(reports);
}, options);

observer.observe();

// const req: any = new Request('https://cdnjs.cloudflare.com/libs/twiliojs/refs/9fd4c89/twilio.min.js', 
// {
//   method: 'POST', 
//   headers: {
//     "Access-Control-Origin": "http://localhost:1313/www-business-card",
//     "NEL": {
//      "success_fraction": 1,
//      "failure_fraction": 1
//      "report_to": "nel",
//      "max_age": 604800
//     },
//    "report-to": {
//      "endpoints":[{
//        "url":"https://enqryc52cw1xc0i.m.pipedream.net",
//       }],
//        "group":"nel",
//        "max_age":604800
//       }
//     }
// });
console.log('end of file')
