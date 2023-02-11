#!/bin/bash

VER=$(node -p -e "require('./package.json').version")

echo Version: $VER
echo

echo Building code
	
    npm run build
	
echo Copying to 'dist' folder

	rm -Rf dist && mkdir dist	
	
    cp -R source/plugins/** dist/

    rm -R dist/*/src
	rm -R dist/*/_out/*.d.ts
	rm -R dist/*/_out/*.tsbuildinfo
		
echo Done!


