#!/usr/bin/env bash

set -e

# Get the .env file.
echo "Downloading .env file..."
aws secretsmanager get-secret-value \
    --secret-id ${ENV_SECRET_ID:-.env.frontend} | \
    python -c "import json,sys;obj=json.load(sys.stdin);print obj['SecretString'];" > .env

# Build.
echo "Building..."
node_modules/.bin/vue-cli-service build --mode staging

# Deploy to S3.
echo "Deploying..."
node_modules/.bin/vue-cli-service s3-deploy --mode staging
