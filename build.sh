#!/bin/bash
set -eu

yarn
echo -n "Input github link > "
read GITHUB_LINK
export REPOSITORY_NAME=`echo $GITHUB_LINK | cut -d "/" -f 4-5`
USER_NAME=`echo $GITHUB_LINK | cut -d "/" -f 4`
REPO_NAME=`echo $GITHUB_LINK | cut -d "/" -f 5`

if [ -d './static' ]
then
  rm -Rf ./static
fi

mkdir static
node index.js

unzip ./static/PITCHME.zip -d ./static/

