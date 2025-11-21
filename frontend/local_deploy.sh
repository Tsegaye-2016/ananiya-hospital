#!/bin/bash
npm run build
# Local dist folder
LOCAL_DIST="/home/tsegaye/Desktop/hospitals website/ananiya-hospital/frontend/dist"

# Remote server details
REMOTE_USER="ehealth"
REMOTE_HOST="10.10.3.76"
REMOTE_PATH="/home/ehealth/ananiya-web/ananiya-hospital/frontend"

echo "🚀 Starting Deployment..."

echo "🗑️  Removing old dist folder on remote server..."
ssh $REMOTE_USER@$REMOTE_HOST "rm -rf $REMOTE_PATH/dist"

echo "📁 Copying new dist folder to the server..."
scp -r "$LOCAL_DIST" $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

echo "✅ Deployment completed successfully!"
