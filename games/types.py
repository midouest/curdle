from dataclasses import dataclass
from typing import Dict, List, Literal, Optional, Union


Absent = Literal["absent"]
Present = Literal["present"]
Correct = Literal["correct"]

LetterState = Union[Absent, Present, Correct]


@dataclass
class LetterData:
    char: str
    state: LetterState


@dataclass
class ResultData:
    id: int
    letters: List[LetterData]


Playing = Literal["playing"]
Won = Literal["won"]
Lost = Literal["lost"]

GameState = Union[Playing, Won, Lost]


@dataclass
class GameData:
    id: int
    answer: Optional[str]
    state: GameState
    results: List[ResultData]
    alphabet: Dict[str, LetterState]
