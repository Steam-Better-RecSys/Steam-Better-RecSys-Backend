PROJECT="Steam Wizzard API"

generate:
	npm run generate -- ./src/migrations/$(name)

build:
	git pull && docker-compose up -d --build

.PHONY: generate