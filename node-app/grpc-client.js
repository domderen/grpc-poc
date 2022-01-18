var PROTO_PATH = __dirname + '/../protos/echo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var echo = grpc.loadPackageDefinition(packageDefinition).echo;
var client = new echo.EchoService('localhost:50051',
  grpc.credentials.createInsecure());

module.exports = client