.PHONY: doc
doc: ## generate JS API client documentation
	mkdir -p mkdocs
	cp -r docs mkdocs
	cp README.md mkdocs/index.md
	mkdocs build
.PHONY: pdf-doc
pdf-doc:
	pandoc ./README.md ./docs/*.md  -o api-client-documentation.pdf --pdf-engine=xelatex --toc