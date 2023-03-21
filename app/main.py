from fastapi import FastAPI

from .routers import recommendations
from .config import config_env

app = FastAPI()


app.include_router(recommendations.router)


@app.get('/')
def get_home():
    return {"health_check": "OK"}
