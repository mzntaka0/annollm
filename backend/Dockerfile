ARG PYTHON_VERSION
FROM python:${PYTHON_VERSION}-slim as base

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/work" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    appuser

WORKDIR /work

FROM base as build

# dependencies for rye installation
RUN \
    --mount=type=cache,target=/var/lib/apt/lists \
    --mount=type=cache,target=/var/cache/apt/archives \
        apt-get update \
        && apt-get install -y --no-install-recommends \
            curl \
            ca-certificates \
            build-essential

# use the appuser in the build stage
# to allow re-using pip cache in run stage
USER appuser

ENV RYE_HOME="/work/rye"
ENV PATH="$RYE_HOME/shims:$PATH"

RUN curl -sSf https://rye-up.com/get | RYE_INSTALL_OPTION="--yes" bash

RUN --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=requirements.lock,target=requirements.lock \
    --mount=type=bind,source=requirements-dev.lock,target=requirements-dev.lock \
    --mount=type=bind,source=.python-version,target=.python-version \
    --mount=type=bind,source=README.md,target=README.md \
    --mount=type=bind,source=app,target=app \
    # this on mounts the pip cache
    # to build faster on subsequent builds
    --mount=type=cache,target=/work.cache/pip,uid=$UID \
    # install proeject prod deps
    rye sync --no-dev --no-lock \
    # build the weels for all packages in workspace
    # and plase them into /dist/work directory
    && rye build --all --wheel \
    # edit requirements.lock file to remove editable packages from it
    # and place it in the same /work/dist directory
    && sed '/-e/d' requirements.lock > dist/requirements.lock


# production container
FROM base as run

USER appuser

# add bin user folder
# to have access to [project.scripts]
# installed by your packages
ENV PATH=/work/.local/bin:$PATH

# mount pip cache to reuse dependencies already downloaded in the first step
# mount dist directory to have access to modified requirements.lock file and built wheels
# install dependencies for requirements.lock file (pip cache will be used from the previous stage, so now new downloads should happen)
# and wheels directly from directory
RUN --mount=type=cache,target=/work/.cache/pip,uid=$UID \
    --mount=type=bind,from=build,source=/work/dist,target=/work/dist \
    python -m pip install -r /work/dist/requirements.lock /work/dist/*.whl

CMD ["python", "-m", "app.main"]
