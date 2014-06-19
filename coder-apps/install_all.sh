#!/bin/bash

## 
## Copies the common platform apps to
## the coder-base working directory. 
##
## sh install_all base_path
##
## Eg.
## sh install_all ../coder-base/

if [ $# != 1 ]
  then
    echo -e "\nUse:\ninstall_all coderbase\n"
    exit
fi

base=$1

mkdir -p $base
cp -r ../coder-base/* $base/
./install_common.sh $base

## Using the base folder's copy of npm perform the necessary library pulls.
echo "Preparing dependent libraries"
cd $base
./node/bin/npm install


