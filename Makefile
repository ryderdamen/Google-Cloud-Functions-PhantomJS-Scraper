.PHONY: install
install:
	cd src && npm install && cd ..

.PHONY: deploy
deploy:
	@read -p "Enter GCloud Project Name: " projectname; \
	gcloud functions deploy PhantomScraper --entry-point main --trigger-http --runtime nodejs8 --source ./src/ --project $$projectname

.PHONY: test
test:
	echo "Not yet built"