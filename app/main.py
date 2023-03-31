from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import recommendations
from .config import config_env

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations.router)


@app.get('/')
def get_home():
    return {"health_check": "OK"}
