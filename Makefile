PROJECT_ID:=hipster-shop-259721
K8s_CLUSTER:=demo
ZONE:=us-central1-a

gauth:
	echo ${GCLOUD_SERVICE_KEY} | base64 --decode -i > ${HOME}/gcloud-service-key.json
	@gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gconfig:
	@gcloud config set project $(PROJECT_ID)
	@gcloud container clusters \
		get-credentials $(K8s_CLUSTER) \
		--zone $(ZONE) \
		--project $(PROJECT_ID)
	@gcloud auth configure-docker

build:
	skaffold run -f=skaffold.yaml --default-repo=gcr.io/hipster-shop-259721;

#run:
#	@docker run -p 8000:8000 gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_VERSION)

#push:
#	@docker push gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_VERSION)

#deploy: gconfig
#	@kubectl apply -f k8s.yaml
# https://github.com/kubernetes/kubernetes/issues/27081#issuecomment-238078103
#	@kubectl patch deployment $(IMAGE_NAME) -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"