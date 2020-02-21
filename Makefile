# ----------------------------
#       CONFIGURATION
# ----------------------------

# Import deploy config
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

# This version-strategy uses git tags to set the version string
VERSION := $(shell git describe --tags --always --dirty)

# Set gitlab-ci variables if not in a CI context
ifndef CI_REGISTRY_IMAGE
	CI_REGISTRY_IMAGE := $(DOCKER_REGISTRY)/harpocrates-app/${APP_NAME}
endif
ifndef CI_COMMIT_REF_NAME
	CI_COMMIT_REF_NAME := $(shell git rev-parse --abbrev-ref HEAD)
endif
CI_COMMIT_REF_NAME := $(shell if echo "$(CI_COMMIT_REF_NAME)" | grep -q "/"; then echo $(CI_COMMIT_REF_NAME) |  sed -n "s/^.*\/\(.*\)$$/\1/p"; else echo $(CI_COMMIT_REF_NAME); fi)

# Set default goal (`make` without command)
.DEFAULT_GOAL := help

# ----------------------------
#          COMMANDS
# ----------------------------

.PHONY: echo
echo:
	@echo "$(CI_COMMIT_REF_NAME)"

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: docker-login
docker-login: ## Log in to the default registry
	@docker login -u $(CI_REGISTRY_USER) -p $(CI_REGISTRY_PASSWORD) $(DOCKER_REGISTRY)

.PHONY: docker-logout
docker-logout: ## Logout to the default registry
	@docker logout $(DOCKER_REGISTRY)

.PHONY: build
build: ## Build a docker image
	@docker build -t $(CI_REGISTRY_IMAGE)/$(SERVICE):$(VERSION) -f $(SERVICE)/$(DOCKERFILE_PREFIX)Dockerfile ./$(SERVICE) $(BUILD_ARGS)

.PHONY: start
start: ## Build a docker image
	@docker-compose up -d

.PHONY: tag
tag: ## Tag a docker image and set some aliases
ifeq ($(CI_COMMIT_REF_NAME),master)
	@docker tag $(CI_REGISTRY_IMAGE)/$(SERVICE):$(VERSION) $(CI_REGISTRY_IMAGE)/$(SERVICE):latest
endif
	@docker tag $(CI_REGISTRY_IMAGE)/$(SERVICE):$(VERSION) $(CI_REGISTRY_IMAGE)/$(SERVICE):$(CI_COMMIT_REF_NAME)

.PHONY: deploy
deploy: ## Push image to the docker registry
	@docker push $(CI_REGISTRY_IMAGE)/$(SERVICE):$(VERSION)
ifeq ($(CI_COMMIT_REF_NAME),master)
	@docker push $(CI_REGISTRY_IMAGE)/$(SERVICE):latest
endif
	@docker push $(CI_REGISTRY_IMAGE)/$(SERVICE):$(CI_COMMIT_REF_NAME)

.PHONY: clean
clean: ## Remove all images related to the project
	@docker images | grep $(CI_REGISTRY_IMAGE) | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi $(CI_REGISTRY_IMAGE):{}


.PHONY: api-client
api-client: ## generate JS API client code from specification
	@openapi-generator-cli generate \
		-g javascript \
		-o ./js-api-client/ \
		-i ./api-specification/api-specification/openapi.yml \
		--additional-properties=usePromises=true \
		--additional-properties=projectName=@harpocrates/api-client \
		--additional-properties=licenseName=MIT

.PHONY: api-client-doc
api-client-doc: ## generate JS API client code from specification
	$(MAKE) -C js-api-client docs

.PHONY: api-server
api-server: ## generate Python API server code from specification
	@openapi-generator generate \
		-g python-flask \
		-o ./api \
		-i ./api-specification/api-specification/openapi.yml \
		--additional-properties=packageName=harpocrates_server \
		--additional-properties=serverPort=80 \

.PHONY: codeclimate-report
codeclimate-report:
	@CONTAINER_TIMEOUT_SECONDS=1200 CODECLIMATE_DEBUG=1 codeclimate analyze  -f html > codeclimate.html