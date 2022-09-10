import pathlib
from django.core.management.base import BaseCommand
from django.db import transaction
from games.models import Word


class Command(BaseCommand):
    def add_arguments(self, parser) -> None:
        parser.add_argument(
            "answers",
            metavar="answers.txt",
            type=pathlib.Path,
            help="Path to a text file containing answer words separated by newlines",
        )

        parser.add_argument(
            "guesses",
            metavar="guesses.txt",
            type=pathlib.Path,
            help="Path to a text file containing guess words separated by newlines",
        )

    def handle(self, *args, **options):
        answers = self.read_words(options["answers"])
        guesses = self.read_words(options["guesses"])

        with transaction.atomic():
            Word.objects.bulk_create(
                [Word(content=content, answer=True) for content in answers]
            )

            Word.objects.bulk_create(
                [Word(content=content, answer=False) for content in guesses]
            )

    def read_words(self, path: pathlib.Path):
        with open(path) as word_file:
            return [line.strip() for line in word_file]
