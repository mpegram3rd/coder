@echo off
if =%1-==-- echo "Usage: install_all.cmd [coderbase]" & exit /b

set base=%1

REM Create base folder
IF NOT EXIST %base%   (
   mkdir %base%
)

echo "Copying base files...."
xcopy ..\coder-base\*.* %base% /E

echo "Installing common files"
call install_common.cmd %base%

echo "Preparing dependent libraries"
cd %base%

REM Note this isn't going to work because npm isn't installed
REM node\npm install