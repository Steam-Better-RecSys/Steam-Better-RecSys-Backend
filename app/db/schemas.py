from typing import List

from pydantic import BaseModel


class GameBase(BaseModel):
    game_id: int
    title: str
    description: str


class GameCreate(GameBase):
    pass


class Game(GameBase):
    id: int
    img_vertical: str
    img_horizontal: str

    class Config:
        orm_mode = True


class TagBase(BaseModel):
    name: str


class TagCreate(TagBase):
    pass


class Tag(TagBase):
    id: int

    class Config:
        orm_mode = True


class GameSchema(Game):
    tags: List[Tag]


class TagSchema(Tag):
    games: List[Game]
