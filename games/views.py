from rest_framework import mixins
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema_view, extend_schema
from games.models import Game, Guess
from games.serializers import GameSerializer, GuessSerializer
from games.services import GameService
from games.types import GameData

TAG = "games"


@extend_schema_view(create=extend_schema(tags=[TAG]))
class GuessViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Guess.objects.all()
    serializer_class = GuessSerializer
    permission_classes = []  # type: ignore

    def perform_create(self, serializer) -> None:
        word = serializer.validated_data["word"]
        game = serializer.validated_data["game"]
        GameService().add_guess(word, game)


@extend_schema_view(
    create=extend_schema(tags=[TAG]),
    retrieve=extend_schema(tags=[TAG]),
)
class GameViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Game.objects.prefetch_related("guesses").all()
    serializer_class = GameSerializer
    permission_classes = []  # type: ignore

    def perform_create(self, serializer) -> None:
        service = GameService()
        game = service.create_game()
        game_state = service.get_state(game)
        serializer.instance = game_state

    def get_object(self) -> GameData:
        game = super().get_object()
        return GameService().get_state(game)
