# AKS Proof of Concept

This repository describes steps to create a basic AKS cluster with a single node, similar to what is described in this [Azure AKS documentation](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/containers/aks-microservices/aks-microservices). This installation assumes the smallest possible AKS cluster, with basic Azure Load Balancer and basic Azure Container Registry.

**WARNING: This setup is not recommended for production usecases!** It is an experiment in setting up a smallest possible AKS cluster.

## Required software

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

## Get kubectl credentials that allow admin access to Kubernetes cluster in Azure AKS

```bash
az aks get-credentials \
  --name aks-test \
  --resource-group aks-test-rg \
  --admin
```

## Log into Azure Container Registry (ACR)

```bash
az acr login \
  --name ContainerRepoAksTest
```

## Install Ingess-Nginx & Cert-Manager controllers

Instructions adapted from <https://docs.microsoft.com/en-us/azure/aks/ingress-tls?tabs=azure-cli>

More info on [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/)
More info on [Cert-Manager](https://cert-manager.io/)

```bash
# Install Ingress-Nginx Helm Chart
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.nodeSelector."kubernetes\.azure\.com/mode"=system \
  --set controller.admissionWebhooks.patch.nodeSelector."kubernetes\.azure\.com/mode"=system \
  --set defaultBackend.nodeSelector."kubernetes\.azure\.com/mode"=system \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"=aks-test-ingress-nginx

# Label the ingress-nginx namespace to disable resource validation
kubectl label namespace ingress-nginx cert-manager.io/disable-validation=true

# Install the cert-manager Helm chart
helm upgrade --install cert-manager cert-manager \
  --repo https://charts.jetstack.io \
  --namespace ingress-nginx \
  --set installCRDs=true \
  --set nodeSelector."kubernetes\.azure\.com/mode"=system
```

## Create ClusterIssuer required to create SSL certificates via Let's Encrypt

ClusterIssues is a Cert-Manager configuration file required to create SSL certificates via Let's Encrypt.
More info on [ClusterIssues](https://cert-manager.io/docs/configuration/acme/)

```bash
kubectl apply -f manifests/ClusterIssuer.yaml
```
