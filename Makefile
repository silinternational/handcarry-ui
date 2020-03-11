
start: install dev

install:
	npm install

dev:
	npm run dev

build: install clean
	npm run build

clean:
	npm prune
	npm run clean
