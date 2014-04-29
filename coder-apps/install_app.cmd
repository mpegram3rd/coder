@echo off
if =%3-==-- echo "Usage: install_app.cmd [appname] [coderbase] [apppath]" & exit /b

set app=%1
set base=%2
set from=%3


mkdir %base%\apps\%app%
mkdir %base%\static\apps\%app%
mkdir %base%\static\apps\%app%\js
mkdir %base%\static\apps\%app%\css
mkdir %base%\static\apps\%app%\media
mkdir %base%\views\apps\%app%

copy %from%\%app%\app\*.* %base%\apps\%app%
copy %from%\%app%\views\*.* %base%\views\apps\%app%
copy %from%\%app%\static\js\*.* %base%\static\apps\%app%\js
copy %from%\%app%\static\css\*.* %base%\static\apps\%app%\css
copy %from%\%app%\static\media\*.* %base%\static\apps\%app%\media