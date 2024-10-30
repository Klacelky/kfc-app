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

podman push registry.jirik.dev/kfc/app:latest
podman push registry.jirik.dev/kfc/prisma:latest

sudo podman pull registry.jirik.dev/kfc/app:latest
sudo podman pull registry.jirik.dev/kfc/prisma:latest

sudo systemctl restart kfc-app.service
sudo systemctl restart kfc-prisma.service
