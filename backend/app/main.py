import logging
from datetime import datetime
import json

import uvicorn
from fastapi import FastAPI
import pytz
from fastapi.logger import logger
from starlette.middleware.cors import CORSMiddleware

from app.api import api_router
from app.core.config import settings


logging.Formatter.converter = lambda *args: datetime.now(
    tz=pytz.timezone("Asia/Tokyo")
).timetuple()


logging.basicConfig(format="%(asctime)s -- %(message)s", datefmt="[%Y-%m-%d %H:%M:%S]")

gunicorn_logger = logging.getLogger("gunicorn.error")
logger.handlers = gunicorn_logger.handlers
logger.setLevel(logging.DEBUG)


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"/{settings.VERSION_NAME}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[
    #    str(origin) for origin in settings.BACKEND_CORS_ORIGINS
    # ],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="")


def start():
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)


with open("./openapi.json", "w") as f:
    json.dump(app.openapi(), f)


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)
