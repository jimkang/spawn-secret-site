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
