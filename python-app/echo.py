
import asyncio
import logging
from typing import AsyncIterable

import grpc
import echo_pb2
import echo_pb2_grpc

from validators import is_question, has_improper_words, is_spam

# List of available validators.
_validators = [is_question, has_improper_words, is_spam]


class Echo(echo_pb2_grpc.EchoService):
    async def Echo(
        self, request: echo_pb2.EchoRequest, context: grpc.aio.ServicerContext
    ) -> echo_pb2.EchoResponse:
        logging.info("Received request, sleeping for 2 seconds...")
        await asyncio.sleep(2)
        logging.info("Sleep completed, responding")
        return echo_pb2.EchoResponse(message="Hello, %s!" % request.message)


    async def EchoError(
        self, request: echo_pb2.EchoRequest, context: grpc.aio.ServicerContext
    ) -> echo_pb2.EchoResponse:
        logging.info("Received echoError request")
        raise Exception("Error!")


    async def Validate(
        self, request: echo_pb2.ValidationRequest, context: grpc.aio.ServicerContext
    ) -> AsyncIterable[echo_pb2.ValidationResponse]:
        logging.info("Received validate request, running validators")
        for validationResult in asyncio.as_completed(
            map(lambda val: val(request.argument), _validators)
        ):
            yield await validationResult