from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from db import models
from db.database import engine

from dependencies import get_db

from config import config_env

from routers import recommendations, games

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    recommendations.router,
    prefix="/recommendations",
    tags=["Recommendations"],
    dependencies=[Depends(get_db)]
)
app.include_router(
    games.router,
    prefix="/games",
    tags=["Games"],
    dependencies=[Depends(get_db)]
)


@app.get('/')
def get_home():
    return {"health_check": "OK"}
