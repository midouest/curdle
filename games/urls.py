from rest_framework import routers
from games.views import GameViewSet, GuessViewSet

router = routers.SimpleRouter()
router.register(r"games", GameViewSet, basename="game")
router.register(r"guesses", GuessViewSet)

urlpatterns = router.urls
