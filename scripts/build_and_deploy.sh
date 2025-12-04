#!/usr/bin/env bash

# Build and deploy locally:
# ./build_and_deploy.sh

set -e  # Exit on error

# -------------------------------------------------------------------
#   Color codes for status messages
# -------------------------------------------------------------------
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# -------------------------------------------------------------------
#   Helper functions for colored output
# -------------------------------------------------------------------
print_process() {
  echo -e "${YELLOW}[PROCESS] $1${NC}"
}

print_success() {
  echo -e "${GREEN}[SUCCESS] $1${NC}"
}

print_error() {
  echo -e "${RED}[ERROR] $1${NC}"
}

# -------------------------------------------------------------------
#   Configuration
# -------------------------------------------------------------------
LOCAL_IMAGE_NAME="pen2-stack"

# -------------------------------------------------------------------
#   Main Script
# -------------------------------------------------------------------
print_process "Building Docker image '$LOCAL_IMAGE_NAME' locally..."
docker build -t "$LOCAL_IMAGE_NAME" .
print_success "Docker image '$LOCAL_IMAGE_NAME' built successfully!"

print_process "Starting containers using docker-compose..."
docker-compose -f ../docker/docker-compose.yml up -d
print_success "Containers started!"
