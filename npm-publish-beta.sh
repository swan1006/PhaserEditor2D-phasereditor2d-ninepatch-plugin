#!/bin/bash

# exit when any command fails
set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

./build.sh

echo NPM publishing beta

npm publish --tag beta