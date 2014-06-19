#!/bin/bash

##
## Creates the bundle for the Mac
##
## sh bundle-mac.sh base_path
##
## Eg.
## sh bundle-mac.sh ../coder-base/

if [ $# != 1 ]
  then
    echo -e "\nUse:\nbundle-mac.sh coderbase\n"
    exit
fi

base=$1

mkdir -p $base

## Copy the startup script to the base folder
cp ../coderdojo/scripts/run-coder.sh $base

## Expand NodeJS bundle and install it in the base folder.
mkdir -p ./tmp
cp ../coderdojo/nodejs/node-mac.tar.gz ./tmp
cd ./tmp
gunzip node-mac.tar.gz
tar -xvf node-mac.tar
cd ..
mkdir -p $base/node
cp -R ./tmp/nodejs/* $base/node
rm -fr ./tmp

## do the rest of the installation process
./install_all.sh $base
cd $base


