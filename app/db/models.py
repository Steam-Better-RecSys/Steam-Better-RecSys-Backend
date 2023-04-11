from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import column_property, relationship
from sqlalchemy.sql.expression import cast

from .database import Base

game_tag = Table('game_tag',
                 Base.metadata,
                 Column('game_id', Integer, ForeignKey('games.id')),
                 Column('tag_id', Integer, ForeignKey('tags.id'))
                 )


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    game_id = Column(Integer, unique=True, index=True)
    title = Column(String)
    description = Column(Text)
    img_vertical = column_property(
        "https://cdn.cloudflare.steamstatic.com/steam/apps/" + cast(game_id, String) + "/header.jpg")
    img_horizontal = column_property(
        "https://cdn.cloudflare.steamstatic.com/steam/apps/" + cast(game_id, String) + "/hero_capsule.jpg")
    tags = relationship('Tag', secondary=game_tag, backref='games')


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, unique=True, index=True)

    def __repr__(self):
        return f'Tag "{self.name}"'
