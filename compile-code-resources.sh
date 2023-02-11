#!/bin/bash

VER=$(node -p -e "require('./package.json').version")

echo Compiling version $VER

cd source/plugins/*/code-resources

rm -Rf js js-module ts ts-module
mkdir js js-module ts ts-module 

cp ../../../../code-resources-input/* ts/
cp ts/*.ts ts-module/

for f in ts/*; do
    export n=$(basename $f)
    echo Processing $n
    sed -i "" -e "s/\/\*.*\*\///" -e "s/\/\/ version/\/\/ v$VER/" ts/"$n"
    sed -i "" -e "s/\/\*//" -e "s/\*\///" -e "s/\/\/ version/\/\/ v$VER/" ts-module/"$n"
done

npx tsc -t esnext --outDir js/ ts/*.ts &> /dev/null
npx tsc -t esnext --outDir js-module/ ts-module/*.ts &> /dev/null