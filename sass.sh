#! /bin/bash
if [ ! $# == 0 ]
    then
    if [ $1 == 'dev' ]
        then
        echo "compiling for developement"
        sass $2 styles/main.scss:builds/assets/styles/style.css --line-numbers --sourcemap=none --style expanded $3
        elif [ $1 == 'prod' ]
        then
        echo "compiling for production"
        sass $2 styles/main.scss:builds/assets/styles/style.css $3
        else
        echo "compiling with given switches"
        sass styles/main.scss:builds/assets/styles/style.css $1
    fi
    else
    echo "Usage: sass.sh [env|watch-mode] [watch-mode] [other-switches]"
    echo "to modify paths edit sass.sh"
fi