#!/bin/bash

# This script is used to create Kubernetes infrastructure on Azure AKS following this guide:
# https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/containers/aks-microservices/aks-microservices

# Define common constants
export RESOURCE_GROUP_NAME="aks-test-rg"
export LOCATION="westeurope"
export AKS_CLUSTER_NAME="aks-test"
export REGISTRY_NAME="ContainerRepoAksTest"

# Create resource group
az group create --location $LOCATION --resource-group $RESOURCE_GROUP_NAME

# Create Azure Container Registry
az acr create \
  --resource-group $RESOURCE_GROUP_NAME \
  --name $REGISTRY_NAME \
  --location $LOCATION \
  --sku Basic \
  --admin-enabled true

# Create Azure AKS Cluster
az aks create \
  --vm-set-type  VirtualMachineScaleSets \
  --name $AKS_CLUSTER_NAME \
  --resource-group $RESOURCE_GROUP_NAME \
  --node-count 1 \
  --node-vm-size Standard_A2_v2 \
  --no-ssh-key \
  --location $LOCATION \
  --outbound-type loadBalancer \
  --load-balancer-sku Standard \
  --attach-acr $REGISTRY_NAME

# Create Spot Node Pool
az aks nodepool add \
  --cluster-name $AKS_CLUSTER_NAME \
  --name spotpool1 \
  --resource-group $RESOURCE_GROUP_NAME \
  --enable-cluster-autoscaler \
  --priority Spot \
  --eviction-policy Delete \
  --spot-max-price -1 \
  --min-count 1 \
  --max-count 5 \
  --node-vm-size Standard_A2m_v2

# Create GPU Spot Node Pool
az aks nodepool add \
  --cluster-name $AKS_CLUSTER_NAME \
  --name spotpool2gpu \
  --resource-group $RESOURCE_GROUP_NAME \
  --enable-cluster-autoscaler \
  --priority Spot \
  --eviction-policy Delete \
  --spot-max-price -1 \
  --min-count 0 \
  --max-count 1 \
  --node-vm-size Standard_NC6s_v3

