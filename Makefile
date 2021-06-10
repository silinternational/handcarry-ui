quick-start: deps dev

deps:
	npm install

clean:
	npm run clean

dev: 
	npm run local:dev

prod:
	npm run local:prod

build: deps
	npm run build:prod

status:
	npm outdated

update:
	npm update
