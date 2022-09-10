from games.types import Absent, Correct, Lost, Present, Playing, Won


MAX_GUESSES = 6

ABSENT: Absent = "absent"
PRESENT: Present = "present"
CORRECT: Correct = "correct"


LETTER_STATES = (
    (ABSENT, "Absent"),
    (PRESENT, "Present"),
    (CORRECT, "Correct"),
)

PLAYING: Playing = "playing"
WON: Won = "won"
LOST: Lost = "lost"

GAME_STATES = (
    (PLAYING, "Playing"),
    (WON, "Won"),
    (LOST, "Lost"),
)
