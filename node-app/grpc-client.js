const PROTO_PATH = __dirname + '/../protos/echo.proto';

const GRPC_HOST = process.env.GRPC_HOST || 'localhost:50051'

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const echo = grpc.loadPackageDefinition(packageDefinition).echo;

console.log('GRPC_HOST:', GRPC_HOST);

const client = new echo.EchoService(GRPC_HOST,
  grpc.credentials.createInsecure());

module.exports = client