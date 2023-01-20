SHELL:= /bin/bash
ROOT_PATH:=$(abspath $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

DATE=$(shell date '+%Y-%m-%d-%H:%M:%S')
GIT_COMMIT=$(shell cd "${ROOT_PATH}" && git rev-parse --short HEAD)
GIT_DIRTY=$(shell cd "${ROOT_PATH}" && test -n "$(git status --porcelain)" && echo "+CHANGES" || true)
GIT_TAG=$(shell cd "${ROOT_PATH}" && git describe --tags --abbrev=0 2>/dev/null)

VERSION=$(subst v,,${GIT_TAG})

## Output related vars
ifdef TERM
	BOLD:=$(shell tput bold)
	RED:=$(shell tput setaf 1)
	GREEN:=$(shell tput setaf 2)
	YELLOW:=$(shell tput setaf 3)
	RESET:=$(shell tput sgr0)
endif

# $(msg) bla bla bla   instead of   @echo bla bla bla
msg = @echo

.DEFAULT_GOAL:=help

#############################################################################
.PHONY: help
help:
	@grep --no-filename -E '^[a-zA-Z_/-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
#############################################################################


#############################################################################
.PHONY: version
version: ## Building new version to git
	$(msg) "$(GREEN)Building new version to git$(RESET)"
	$(eval NEW_VERSION=$(shell read -p "Enter new release version (current version ${VERSION}): " enter ; echo $${enter}))
	@if [ ${NEW_VERSION} ]; then\
		git add .;\
		git commit -a -m "meta: Create release";\
		git tag v${NEW_VERSION};\
		git push origin main;\
		git push --tags origin main;\
	else \
		echo "$(RED)Git build error$(RESET)";\
	fi
#############################################################################


#############################################################################
.PHONY: build
build: ## Building project
	$(msg) "$(GREEN)Building project$(RESET)"
	@yarn vite build --mode production
#############################################################################


#############################################################################
.PHONY: package
package: ## Building a docker container
	$(msg) "$(GREEN)Building a docker container$(RESET)"
	$(eval NEW_VERSION=$(shell read -p "Enter new release version (current version ${VERSION}): " enter ; echo $${enter}))
	@cat ${ROOT_PATH}/.docker/Dockerfile > ${ROOT_PATH}/Dockerfile
	@sed -i -E "s/_GIT_COMMIT_/${GIT_COMMIT}/g" ${ROOT_PATH}/Dockerfile
	@sed -i -E "s/_VERSION_/${NEW_VERSION}/g" ${ROOT_PATH}/Dockerfile
	docker build -f ${ROOT_PATH}/Dockerfile -t ghcr.io/werbot/werbot.web:latest .
	docker tag ghcr.io/werbot/werbot.web:latest ghcr.io/werbot/werbot.web:${NEW_VERSION}
	rm -rf ${ROOT_PATH}/dist
	rm ${ROOT_PATH}/Dockerfile
	docker image prune --filter "dangling=true" --force
#############################################################################


#############################################################################
.PHONY: push
push: ## Submitting docker to the registry
	$(msg) "$(GREEN)Submitting docker to the registry$(RESET)"
	$(eval NEW_VERSION=$(shell read -p "Enter new release version (current version ${VERSION}): " enter ; echo $${enter}))
	docker push ghcr.io/werbot/werbot.web:latest
	docker push ghcr.io/werbot/werbot.web:${VERSION}
#############################################################################


#############################################################################
%: ## A parameter
	@true
#############################################################################
