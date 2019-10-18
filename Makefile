deploy:
	rm -rf ./dist
	yarn build
	ssh root@jernejsila.com 'rm -rf /var/www/typing-exercise/*'
	rsync -avzh ./dist/ root@jernejsila.com:/var/www/typing-exercise