import uvicorn
import requests
from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def get_home():
    return {"health_check": "OK"}


@app.get('/recommendations')
def get_recommendations(game_id: int):
    return requests.get('https://ml:80/recommendations', params={'game_id': game_id})


if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8081)
