from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from db import crud, schemas

from dependencies import get_db

router = APIRouter()


@router.get('', response_model=List[schemas.GameSchema])
def read_games(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_games(db=db, skip=skip, limit=limit)


@router.get('/tags', response_model=List[schemas.Tag])
def read_tags(db: Session = Depends(get_db)):
    return crud.get_tags(db=db)
