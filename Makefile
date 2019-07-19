
start: clean install dev

dev:
	BASE_API_URL=http://handcarry.local:3000 npm run dev

clean:
	npm prune

install:
	npm install
