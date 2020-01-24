from http import HTTPStatus
from harpocrates_server.models.http_status import HttpStatus as ApiHttpStatus

def create_api_http_status(error: HTTPStatus): -> ApiHttpStatus
    return ApiHttpStatus(
            code=error.value,
            message="{phrase} : {description}".format(
                phrase=error.phrase, description=error.description
            ),
        )