const client = require('./grpc-client');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });


async function main() {
  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      const argument = data.toString();
      console.log('Received argument: ', argument);

      const validationRequest = {
        argument
      }

      console.log('Sending request to gRPC server: ', validationRequest, '\n');
      const call = client.Validate(validationRequest);

      call.on('data', (response) => {
        console.log('Got response from gRPC validator: ', response);
        ws.send(JSON.stringify(response));
      });

      call.on('error', (error) => {
        console.log('Got error from gRPC validator: ', error);
        ws.send('Validation raised an error: ' + JSON.stringify(error));
      });

      call.on('end', () => {
        console.log('Validation request ended.');
        ws.send('Validation completed.');
      });
    });

    ws.send('Welcome to the validation service!');
  });
}

if (require.main === module) {
  main();
}

// Is this argument valid?
// Blimey what a lot of food!
// sdfigojsuignsiugn