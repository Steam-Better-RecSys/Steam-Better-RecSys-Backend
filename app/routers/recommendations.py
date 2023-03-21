import requests
from fastapi import APIRouter

from ..config import config_env

router = APIRouter(prefix="/recommendations")


@router.get('')
def get_recommendations(game_id: int):
    return {"response": requests.get(config_env['ML_HOST'] + '/recommendations', params={'game_id': game_id}).json()['items']}
