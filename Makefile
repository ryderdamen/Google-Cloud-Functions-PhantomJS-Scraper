.PHONY: install
install:
	cd src && npm install && cd ..

.PHONY: deploy
deploy:
	@read -p "Enter GCloud Project Name: " projectname; \
	@read -p "Enter Function Name: " functionname; \
	gcloud functions deploy $$functionname --entry-point main --trigger-http --runtime nodejs8 --source ./src/ --project $$projectname

.PHONY: test
test:
	echo "Not yet built"
