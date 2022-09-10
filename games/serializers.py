from rest_framework import serializers
from games.constants import GAME_STATES, LETTER_STATES
from games.models import Word, Guess


class GuessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guess
        fields = "__all__"

    word = serializers.SlugRelatedField(
        queryset=Word.objects.all(), slug_field="content"
    )


class LetterSerializer(serializers.Serializer):
    char = serializers.CharField(read_only=True)
    state = serializers.ChoiceField(choices=LETTER_STATES, read_only=True)


class ResultSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    letters = LetterSerializer(many=True, read_only=True)


class GameSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    answer = serializers.CharField(allow_null=True, read_only=True)
    state = serializers.ChoiceField(choices=GAME_STATES, read_only=True)
    results = ResultSerializer(many=True, read_only=True)
    alphabet = serializers.DictField(
        child=serializers.ChoiceField(choices=LETTER_STATES), read_only=True
    )
