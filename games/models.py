from django.db import models


class TimestampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ["created_at"]


class Word(TimestampModel):
    content = models.CharField(max_length=5, unique=True)
    answer = models.BooleanField()

    def __str__(self) -> str:
        return self.content


class Game(TimestampModel):
    answer = models.ForeignKey(
        Word, on_delete=models.PROTECT, related_name="answer_game_set"
    )
    guesses = models.ManyToManyField(Word, through="Guess")

    def __str__(self) -> str:
        return f"{self.answer} ({self.pk})"


class Guess(TimestampModel):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    word = models.ForeignKey(
        Word, on_delete=models.PROTECT, related_name="guess_game_set"
    )

    def __str__(self) -> str:
        return f"{str(self.word)} ({self.pk})"

    class Meta:
        verbose_name_plural = "Guesses"
