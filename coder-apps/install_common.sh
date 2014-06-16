#!/bin/bash

## 
## Copies the common platform apps to
## the coder-base working directory. 
##
## sh install_common base_path
##
## Eg.
## sh install_common ../coder-base/

if [ $# != 1 ]
  then
    echo -e "\nUse:\ninstall_common coderbase\n"
    exit
fi

base=$1

./install_app.sh auth $base ./common/
./install_app.sh boilerplate $base ./common/
./install_app.sh coder $base ./common/
./install_app.sh coderlib $base ./common/
./install_app.sh editor $base ./common/
./install_app.sh eyeball $base ./common/
./install_app.sh game2d $base ./common/
./install_app.sh hello_coder $base ./common/
./install_app.sh space_rocks_ $base ./common/
./install_app.sh localauth $base ./common/

## RVA Coder Dojo extra bundles
./install_app.sh pop_up_penguins $base ./common/
./install_app.sh comic_creator $base ./common/
./install_app.sh rva_coderdojo_matrix $base ./common/

## Assets for other projects used in RVA Coder Dojo
mkdir -p $base/project-assets
cp -r ../project-assets/* $base/project-assets

