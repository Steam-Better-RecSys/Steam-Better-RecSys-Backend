from pydantic import BaseModel


class GameBase(BaseModel):
    game_id: int
    title: str


class GameCreate(GameBase):
    pass


class Game(GameBase):
    id: int
    header: str

    class Config:
        orm_mode = True
