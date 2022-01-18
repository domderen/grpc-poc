import asyncio
import logging

import echo_pb2


async def is_question(argument: str) -> echo_pb2.ValidationResponse:
    logging.info("Running is_question validator for argument: %s", argument)
    await asyncio.sleep(2)

    if argument.endswith("?"):
        return echo_pb2.ValidationResponse(
            isValid=False,
            errorMessage="This argument is a question",
            validationType=echo_pb2.ValidationResponse.IS_QUESTION,
        )
    else:
        return echo_pb2.ValidationResponse(
            isValid=True,
            validationType=echo_pb2.ValidationResponse.IS_QUESTION,
        )


async def has_improper_words(argument: str) -> echo_pb2.ValidationResponse:
    logging.info("Running has_improper_words validator for argument: %s", argument)
    await asyncio.sleep(4)

    if "blimey" in argument.lower():
        return echo_pb2.ValidationResponse(
            isValid=False,
            errorMessage="This argument contains improper words",
            validationType=echo_pb2.ValidationResponse.HAS_IMPROPER_WORDS,
        )
    else:
        return echo_pb2.ValidationResponse(
            isValid=True,
            validationType=echo_pb2.ValidationResponse.HAS_IMPROPER_WORDS,
        )


async def is_spam(argument: str) -> echo_pb2.ValidationResponse:
    logging.info("Running is_spam validator for argument: %s", argument)
    await asyncio.sleep(6)

    if not " " in argument:
        return echo_pb2.ValidationResponse(
            isValid=False,
            errorMessage="This argument is spam",
            validationType=echo_pb2.ValidationResponse.IS_SPAM,
        )
    else:
        return echo_pb2.ValidationResponse(
            isValid=True,
            validationType=echo_pb2.ValidationResponse.IS_SPAM,
        )
