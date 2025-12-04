#!/usr/bin/env bash

# Build and deploy frontend locally:
# ./build_and_deploy_frontend.sh

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
LOCAL_IMAGE_NAME="pen2-frontend"

# -------------------------------------------------------------------
#   Main Script
# -------------------------------------------------------------------
print_process "Building Docker image '$LOCAL_IMAGE_NAME' locally..."
docker build -t "$LOCAL_IMAGE_NAME" ../frontend
print_success "Docker image '$LOCAL_IMAGE_NAME' built successfully!"

print_process "Starting container..."
docker run -d -p 3000:3000 --name pen2-frontend "$LOCAL_IMAGE_NAME"
print_success "Frontend container started on http://localhost:3000"
