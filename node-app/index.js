const client = require('./grpc-client');

function runEcho(echoRequest) {
  return new Promise((resolve, reject) => {
    client.Echo(echoRequest, (err, response) => {
      if (err) return reject(err);

      return resolve(response);
    });
  });
}

function runEchoError(echoRequest) {
  return new Promise((resolve, reject) => {
    client.EchoError(echoRequest, (err, response) => {
      if (err) return reject(err);

      return resolve(response);
    });
  });
}

async function run() {
  const echoRequest = {
    message: 'Dom'
  }

  console.log('Sending request to gRPC server: ', echoRequest);
  const response = await runEcho(echoRequest);
  console.log('Got response from gRPC server: ', response);
}

async function runError() {
  try {
    const echoRequest = {
      message: 'Dom'
    }

    console.log('Expecting error from request to gRPC server: ', echoRequest);
    await runEchoError(echoRequest);
  } catch (err) {
    console.error('GOT ERROR FROM gRPC SERVER: ', err);
  }
}

async function main() {
  await run();
  await runError();
}

if (require.main === module) {
  main();
}