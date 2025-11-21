#!/bin/bash
npm run build
# Local dist folder
LOCAL_DIST="/home/tsegaye/Desktop/hospitals website/ananiya-hospital/frontend/dist"

# Remote server details
REMOTE_USER="ehealth"
REMOTE_HOST="et1.etechsc.com"
REMOTE_PORT=55
REMOTE_PATH="/home/ehealth/ananiya-web/ananiya-hospital/frontend"

echo "🚀 Starting Remote Deployment..."

echo "🗑️  Removing old dist folder on remote server..."
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "rm -rf $REMOTE_PATH/dist"

echo "📁 Copying new dist folder to the remote server..."
scp -P $REMOTE_PORT -r "$LOCAL_DIST" $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

echo "✅ Deployment completed successfully!"
