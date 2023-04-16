from typing import List

import requests
from requests.structures import CaseInsensitiveDict
from fastapi import APIRouter, Response, Request, Depends

from config import config_env
from sqlalchemy.orm import Session

from app.db import crud, schemas
from dependencies import get_db

router = APIRouter()


@router.get('', response_model=List[schemas.GameSchema])
async def get_recommendations(request: Request, response: Response, game_id: int = 0, liked: int = 1,
                              db: Session = Depends(get_db)):
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    resp = requests.get(config_env['ML_HOST'] + '/recommendations', params={'game_id': game_id, 'liked': liked},
                              json=request.cookies, headers=headers).json()
    response.set_cookie(key="vector", value=resp["vector"])
    games = crud.get_games_by_ids(db=db, ids=resp['games'])

    return games


@router.post('/selected_games')
async def set_selected_games(request: Request, response: Response, db: Session = Depends(get_db)):
    req = await request.json()
    resp = requests.post(config_env['ML_HOST'] + '/selected_games', json=req).json()
    response.set_cookie(key="vector", value=resp["vector"])
    return request.cookies.get('vector')


@router.get("/selected_games")
def get_selected_games(request: Request, response: Response):
    return request.cookies.get('vector')
