# gRPC Proof of Concept

This repository presents an example application that consists of a Python gRPC server and a NodeJS gRPC client. ProtocolBuffer service definition is located in [protos](protos) directory.

NodeJS application has two flavours:

- **index.js** - is a simple NodeJS gRPC client that shows examples of unary calls, one with successful response and one with error response.
- **websocket-server.js** - is a NodeJS WebSocket server that utilizes gRPC client to send a validation request to Python server, and streams responses from the server all the way to WebSocket client.

## Running examples

First run the Python server application:

```bash
cd python-app
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

Next in a new terminal window initialize NodeJS application:

```bash
cd node-app
npm install
```

Afterwards run the NodeJS simple client application:

```bash
node index.js
```

This will perform an unary call to the Python server and will print the response. One call will succeed, and another one will fail to show how errors are propagated.

Another example we can run is a NodeJS WebSocket server application:

```bash
node websocket-server.js
```

This initializes a simple NodeJS WebSocket server, that accepts arguments as input, and streams back argument validation results from the Python server all the way down to the WebSocket client.

To test this server, you can perform following steps:

```bash
npm install -g wscat
wscat -c ws://localhost:8080
```

And then try sending those arguments to the server:

- Is this argument valid?
- Blimey what a lot of food!
- sdfigojsuignsiugn

## Updating Python Protocol Buffer generated code

```bash
cd python-app
python -m grpc_tools.protoc -I../protos --python_out=. --grpc_python_out=. ../protos/echo.proto
```
