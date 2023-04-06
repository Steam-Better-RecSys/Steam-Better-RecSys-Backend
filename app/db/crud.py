from sqlalchemy.orm import Session

from . import models, schemas


def get_game_by_id(db: Session, game_id: int):
    return db.query(models.Game).filter(models.Game.game_id == game_id).first()


def get_games(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Game).offset(skip).limit(limit).all()


def create_game(db: Session, game: schemas.GameCreate):
    db_item = models.Game(**game.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
