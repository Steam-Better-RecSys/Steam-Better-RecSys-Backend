from typing import List

from sqlalchemy.orm import Session, joinedload

from . import models


def get_game_by_id(db: Session, game_id: int):
    return db.query(models.Game).options(joinedload(models.Game.tags)).where(models.Game.game_id == game_id).one()


def get_games(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Game).options(joinedload(models.Game.tags)).offset(skip).limit(limit).all()


def get_games_by_ids(db: Session, ids: List[int]):
    return db.query(models.Game).options(joinedload(models.Game.tags)).filter(models.Game.game_id.in_(ids)).all()


def get_tags(db: Session):
    return db.query(models.Tag).all()
