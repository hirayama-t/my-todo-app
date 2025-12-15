@echo off
REM 変更を全てadd
cd /d %~dp0

git add -A

REM コミット（変更がある場合のみ）
git diff --cached --quiet
if %errorlevel% neq 0 (
    git commit -m "自動コミット"
    git push origin main
    echo プッシュ完了
) else (
    echo 変更がありません
)
