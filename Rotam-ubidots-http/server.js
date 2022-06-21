const { get } = require("http");
const https = require("https");

const ubitods_api = {
    hostname: 'industrial.api.ubidots.com',
    port: 443,
    path: '/api/v1.6/devices/esp32-gps/trama/values',
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'X-Auth-Token': 'BBFF-qY0aPc5lETRyrHXb8dKBqVBzxSv8H3'
    }
}
const rotam_server = {
    hostname: '44.200.220.115',
    port: 8080,
    path: '/v1',
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
}
  
var time_prev=0;
var time_next=0;

setInterval(() => {
    const ubidots_request_data = https.request(ubitods_api, response => {
        //console.log(`statusCode: ${response.statusCode}`);
        let buffer = '';
        response.on('data', (chunk) => {
            buffer = buffer + chunk.toString();
        });
      
        response.on('end', () => {
            const data = JSON.parse(buffer);
            time_prev = time_next;
            
            time_next = data.results[0].timestamp;
            //console.log('time prev:',time_prev);
            //console.log('time next:',time_next);
            if(time_prev != time_next){
                console.log(data.results[0]);
            }
        });
    });
    ubidots_request_data.on('error', error => {
        console.error(error);
    });
    
    ubidots_request_data.end();
}, 1000);