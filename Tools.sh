clear() {
	sudo rm -fr dist
	sudo rm -fr build
	sudo rm -fr nohup.out
	sudo rm -fr __pycache__
}

pull() {
	git fetch --all
	git reset --hard origin/master
}

push() {
	clear
	git config --global user.email "yingshaoxo@gmail.com"
	git config --global user.name "yingshaoxo"
	git add .
	git commit -m "update"
	git push origin
}

serve() {
    yarn build
    cp models dist/ -fr
    cp age_models dist/ -fr
    node serve.js
    #python3 serve.py
}


if [ "$1" == "clear" ]; then
    clear

elif [ "$1" == "pull" ]; then
    pull

elif [ "$1" == "push" ]; then
    push

elif [ "$1" == "serve" ]; then
    serve

elif [ "$1" == "" ]; then
    echo "
clear
pull
push
serve
"

fi
