from rest_framework import exceptions


class GameOverException(exceptions.APIException):
    status_code = 400
    default_detail = "Game Over"
