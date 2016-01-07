#!/bin/bash

# input
src="styles/"
src+="main.scss"

# output folders
dest="builds/assets/styles/"
# output filename
dev=$dest"style.css"
prod=$dest"style.min.css"
custom=$dest"style.custom.css"

# check directories
if [[ ! -e $dest ]]; then
    mkdir -p $dest
elif [[ ! -d $dest ]]; then
    echo "$dest already exists but is not a directory." 1>&2
fi

# don't edit below this line
if (( $# == 0 )); then
    echo -e $usage
    exit
else
    case $1 in
        --h*|--\? )
            echo -e $usage
            exit
            ;;
        "dev" )
            echo "compiling for developement"
            sass $2 $src:$dev --line-numbers --sourcemap=none --style expanded ${@:3}
            exit
            ;;
        "prod"|"min" )
            echo "compiling for production"
            sass $2 $src:$prod  --sourcemap=none --style compressed ${@:3}
            exit
            ;;
        --w* )
            echo "compiling with given switches in --watch mode"
            sass $1 $src:$custom ${@:2}
            exit
            ;;
        * )
            echo "compiling with given switches"
            sass $src:$custom ${@:1}
            exit
            ;;
    esac
    echo -e $usage
fi

usage="
Usage:\n
sass.sh [environment|watch-mode] [watch-mode|other-switches]\n\n
Examples:\n
1) watch mode with develop environment presets\n
./sass.sh dev --watch\n
---\n
2) 1 time compiling for production\n
./sass.sh prod\n
---\n\n
to modify input/output paths edit sass.sh\n
"
