#!/bin/bash

set -e
set -x

git stash

if [ "$1" = "force" ]; then
    git fetch --all
    git reset --hard origin/main
else
    git pull --rebase
fi

git stash pop

podman compose build --pull

TAG=`date --utc +"%Y%m%d%H%M%S"`

podman tag registry.jirik.dev/kfc/app:latest registry.jirik.dev/kfc/app:$TAG
podman tag registry.jirik.dev/kfc/prisma:latest registry.jirik.dev/kfc/prisma:$TAG

podman push registry.jirik.dev/kfc/app:latest
podman push registry.jirik.dev/kfc/app:$TAG
podman push registry.jirik.dev/kfc/prisma:latest
podman push registry.jirik.dev/kfc/prisma:$TAG

sudo podman pull registry.jirik.dev/kfc/app:latest
sudo podman pull registry.jirik.dev/kfc/prisma:latest

sudo systemctl restart kfc-app.service
sudo systemctl restart kfc-prisma.service
