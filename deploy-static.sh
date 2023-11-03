#!/bin/bash

set -e

git rebase main
git commit --amend --no-edit -m "(static patch) `git show --format=%s --no-patch`"
yarn build
git push -f
