from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import column_property
from sqlalchemy.sql.expression import cast

from .database import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    game_id = Column(Integer, unique=True, index=True)
    title = Column(String)
    header = column_property("https://cdn.cloudflare.steamstatic.com/steam/apps/" + cast(game_id, String) + "/header.jpg")


