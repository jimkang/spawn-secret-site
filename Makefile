test:
	node tests/basictests.js

pushall:
	git push origin master && npm publish

lint:
	./node_modules/.bin/eslint .

merge-pdfs:
	pdfconcat -o merged.pdf tools/pdfs/*.pdf

build-initial-organizations:
	(date +"%Y-%m-%d %H:%M:%S")

run-four-test-generations:
	node tools/build-initial-organizations.js woa 20 > runs/test-0.json
	node tools/make-organizations-move.js woa runs/test-0.json > runs/test-1.json
	node tools/make-organizations-move.js woa runs/test-1.json > runs/test-2.json
	node tools/make-organizations-move.js woa runs/test-2.json > runs/test-3.json
	cp -f runs/test-3.json ../secret-site-web/data/state.json

