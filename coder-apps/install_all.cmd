@echo off
if =%1-==-- echo "Usage: install_all.cmd [coderbase]" & exit /b

goto check_Permissions

:check_Permissions
    echo Administrative permissions required. Detecting permissions...

    net session >nul 2>&1
    if %errorLevel% == 0 (
        echo Success: Administrative permissions confirmed.
    ) else (
        echo Failure: Current permissions inadequate.
        exit /b
    )

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
npm install
