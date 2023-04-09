from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from db import crud, schemas

from dependencies import get_db

router = APIRouter()


@router.get('', response_model=List[schemas.Game])
def read_games(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_games(db=db, skip=skip, limit=limit)


@router.post('', response_model=schemas.Game)
def create_game(game: schemas.GameCreate, db: Session = Depends(get_db)):
    return crud.create_game(db=db, game=game)
