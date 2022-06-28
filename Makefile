c4-lite-server:
	docker run \
		--interactive \
		--name c4-lite-server \
		--publish 8080:8080 \
		--rm \
		--tty \
		--volume ${PWD}/docs:/usr/local/structurizr \
		structurizr/lite
