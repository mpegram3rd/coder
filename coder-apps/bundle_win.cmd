@echo off
if =%1-==-- echo "Usage: bundle_win.cmd [coderbase]" & exit /b

set base=%1

REM Create base folder
IF NOT EXIST %base%   (
   mkdir %base%
)

mkdir %base%
copy scripts\run-coder.cmd %base%

mkdir %base%\node
copy node\node.exe %base%\node

call install_all.cmd %base%

cd %base%
