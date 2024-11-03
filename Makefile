# =====================================================================================
#  V A R I A B L E S
DOCKER_COMPOSE_LOCAL=docker-compose.yaml
INGRESS_FILE=k8s-ingress-deloyment.yaml
# =====================================================================================
# D E V  E N V I R O N M E N T  C O M M A N D S
git_hooks:
	docker build -f ./config/Dockerfile.base -t git-hooks:latest .
	docker run -it git-hooks /bin/bash -c "cd /app && pre-commit install"

# ====================================================================================
# D O C K E R  C O M M A N D S

.PHONY: build
build:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) build

.PHONY: run
run:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) up

.PHONYY: run_recreate
run_recreate:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) up --force-recreate

.PHONY: rerun
rerun:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) down
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) up --build

.PHONY: stop
stop:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) down

.PHONY: restart
restart:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) down
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) up

.PHONY: clean
clean:
	docker-compose -f $(DOCKER_COMPOSE_LOCAL) down --volumes --rmi all

# ====================================================================================
# D E P L O Y M E N T  C O M M A N D S

.PHONY: deploy_ingress
deploy_ingress:
	kubectl apply -f deployment/${INGRESS_FILE}
