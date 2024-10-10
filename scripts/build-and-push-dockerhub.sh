#!/bin/bash

# Exit script on any error
set -e

# Get the latest Git SHA (short form)
GIT_SHA=$(git rev-parse --short HEAD)
DOCKERHUB_USERNAME="maxjasz"


# Variables - customize these
IMAGE_NAME="fit3162-19-backend"

# Build the Docker image
echo "Building Docker image..."
docker build -t $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA ./api

# Tag the Docker image with the latest Git SHA
echo "Tagging Docker image with Git SHA: $GIT_SHA"
docker tag $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA $DOCKERHUB_USERNAME/$IMAGE_NAME:latest

# Push the image to Docker Hub with both the Git SHA and 'latest' tags
echo "Pushing Docker image to Docker Hub..."
docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA
docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:latest

# Success message
echo "Docker image for backend pushed successfully!"



# Variables - customize these
IMAGE_NAME="fit3162-19-frontend"

# Build the Docker image
echo "Building Docker image..."
docker build -t $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA ./frontend

# Tag the Docker image with the latest Git SHA
echo "Tagging Docker image with Git SHA: $GIT_SHA"
docker tag $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA $DOCKERHUB_USERNAME/$IMAGE_NAME:latest

# Push the image to Docker Hub with both the Git SHA and 'latest' tags
echo "Pushing Docker image to Docker Hub..."
docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:$GIT_SHA
docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:latest

# Success message
echo "Docker image for frontend pushed successfully!"



