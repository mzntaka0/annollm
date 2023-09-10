"""
This file do automatically register files in endpoints/* to fastAPI's router.
So you can just create a file named w/ exactly the same name of the endpoint and then it'll be registered automatically.
"""

import importlib
from pathlib import Path
from typing import List

from fastapi import APIRouter


api_router = APIRouter()

# NOTE: you can write down which files are gonna be ignored by endpoint definition in endpoints/*
excludes = [
    '__pycache__',
    '__init__'
]

include_ = lambda p: (  # noqa: E731
    (p.stem not in excludes) and
    (not p.stem.startswith('.'))
)

endpoints: List[str] = [
    p.stem for p in Path('./app/api/endpoints').glob('*') if include_(p)
]

# TODO: need to accept a nested directory structure mapped w/ endpoints structure.
for endpoint in endpoints:
    module = importlib.import_module(f'app.api.endpoints.{endpoint}')
    try:
        router = module.router
    except AttributeError:
        print(f'endpoint "/{endpoint}" has no router')
        continue
    api_router.include_router(
        router,
        prefix=f'/{endpoint}',
        tags=[endpoint]
    )
