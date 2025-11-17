#!/bin/bash

USER="ehealth"
SERVER="10.10.3.76"

REMOTE_INTERNAL="/home/ehealth/ananiya-web"
REMOTE_PUBLIC="/var/www/anawebs"

LOCAL_DIST="./dist"

# Ask for SSH password
read -s -p "Enter SSH password for $USER@$SERVER: " SSH_PASS
echo ""

echo "🚀 Building Vite project..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🧹 Cleaning internal folder on server..."
sshpass -p "$SSH_PASS" ssh $USER@$SERVER "
    rm -rf $REMOTE_INTERNAL && mkdir -p $REMOTE_INTERNAL
"

echo "📤 Uploading dist/ → internal folder..."
sshpass -p "$SSH_PASS" scp -r $LOCAL_DIST/* $USER@$SERVER:$REMOTE_INTERNAL

echo "🧹 Cleaning public Apache folder..."
sshpass -p "$SSH_PASS" ssh $USER@$SERVER "
    echo \"$SSH_PASS\" | sudo -S rm -rf $REMOTE_PUBLIC
    echo \"$SSH_PASS\" | sudo -S mkdir -p $REMOTE_PUBLIC
"

echo "📥 Copying files → Apache folder..."
sshpass -p "$SSH_PASS" ssh $USER@$SERVER "
    echo \"$SSH_PASS\" | sudo -S cp -r $REMOTE_INTERNAL/* $REMOTE_PUBLIC
    echo \"$SSH_PASS\" | sudo -S chown -R www-data:www-data $REMOTE_PUBLIC
    echo \"$SSH_PASS\" | sudo -S chmod -R 755 $REMOTE_PUBLIC
    echo \"$SSH_PASS\" | sudo -S systemctl reload apache2
"

echo "✅ Deployment completed successfully!"
