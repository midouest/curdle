from collections import Counter
from games.constants import ABSENT, CORRECT, LOST, MAX_GUESSES, PRESENT, PLAYING, WON
from games.models import Game, Guess, Word
from games.exceptions import GameOverException
from games.types import GameData, GameState, ResultData, LetterData


class GameService:
    def is_game_over(self, game: Game) -> bool:
        return game.guesses.count() >= MAX_GUESSES

    def create_game(self) -> Game:
        answer = Word.objects.filter(answer=True).order_by("?").first()
        assert answer is not None
        game = Game.objects.create(answer=answer)
        return game

    def add_guess(self, word: Word, game: Game) -> Guess:
        if self.is_game_over(game):
            raise GameOverException()

        guess = game.guess_set.create(word=word)  # type: ignore
        return guess

    def get_state(self, game: Game) -> GameData:
        guesses = game.guess_set.select_related("word").all()  # type: ignore
        answer_word = game.answer.content

        results = []
        alphabet = {}

        for guess in guesses:
            letters = []
            answer_counts = Counter(answer_word)
            guess_word = guess.word.content

            for (guess_char, answer_char) in zip(guess_word, answer_word):
                letter_state = LetterData(char=guess_char, state=ABSENT)
                if guess_char == answer_char:
                    letter_state.state = CORRECT
                    answer_counts[guess_char] -= 1
                letters.append(letter_state)

            for (letter_state, guess_char, answer_char) in zip(
                letters, guess_word, answer_word
            ):
                if guess_char != answer_char and answer_counts[guess_char] > 0:
                    letter_state.state = PRESENT
                    answer_counts[guess_char] -= 1
                alphabet[guess_char] = letter_state.state

            result = ResultData(id=guess.pk, letters=letters)
            results.append(result)

        state: GameState = PLAYING
        won = len(guesses) > 0 and all(
            [letter.state == CORRECT for letter in results[-1].letters]
        )
        if won:
            state = WON
        elif self.is_game_over(game):
            state = LOST

        answer = None
        if state != PLAYING:
            answer = game.answer.content

        return GameData(
            id=game.pk,
            answer=answer,
            state=state,
            results=results,
            alphabet=alphabet,
        )
