@echo off
if =%1-==-- echo "Usage: install_common.cmd [coderbase]" & exit /b

echo "Creating folders...."

set base=%1

REM Create base folders
IF NOT EXIST %base%   (
   mkdir %base%
)

if NOT EXIST %base%\apps  (
	mkdir %base%\apps
)

if NOT EXIST %base%\static (
	mkdir %base%\static
)

if NOT EXIST %base%\static\apps (
	mkdir %base%\static\apps
)

if NOT EXIST %base%\views (
	mkdir %base%\views
)

if NOT EXIST %base%\views\apps (
	mkdir %base%\views\apps
)

echo "Copying apps"

call install_app.cmd auth %base% .\common\
call install_app.cmd boilerplate %base% .\common\
call install_app.cmd coder %base% .\common\
call install_app.cmd coderlib %base% .\common\
call install_app.cmd editor %base% .\common\
call install_app.cmd eyeball %base% .\common\
call install_app.cmd game2d %base% .\common\
call install_app.cmd hello_coder %base% .\common\
call install_app.cmd space_rocks_ %base% .\common\
call install_app.cmd localauth %base% .\common\

REM RVA Coder Dojo extra bundles
call install_app.cmd pop_up_penguins %base% .\common\
call install_app.cmd comic_creator %base% .\common\
call install_app.cmd rva_coderdojo_matrix %base% .\common\

REM  Assets for other projects used in RVA Coder Dojo
if NOT EXIST %base%\project-assets  (
	mkdir %base%\project-assets
)
xcopy ..\project-assets\*.* %base%\project-assets /E

echo "Copy completed"
