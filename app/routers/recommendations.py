import requests
from requests.structures import CaseInsensitiveDict
from fastapi import APIRouter

from ..config import config_env

router = APIRouter(prefix="/recommendations")


@router.get('')
def get_recommendations(game_id: int):
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    resp = requests.get(config_env['ML_HOST'] + '/recommendations', params={'game_id': game_id}, headers=headers)
    return resp.json()
