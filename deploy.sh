#!/bin/bash
set -e

REMOTE_ALIAS="itmo"
PORTBASE="38700"
APP_NAME="lab3"

PROJECT_DIR="Project"
LOCAL_WAR_PATH="${PROJECT_DIR}/build/libs/${APP_NAME}.war"
REMOTE_JBOSS_HOME="~/wildfly/wildfly-21.0.0.Final"
REMOTE_DEPLOY_DIR="${REMOTE_JBOSS_HOME}/standalone/deployments"
REMOTE_BIN_DIR="${REMOTE_JBOSS_HOME}/bin"

echo "Building WAR..."
(cd "${PROJECT_DIR}" && ./gradlew clean war)

echo "Uploading to Helios..."
scp "${LOCAL_WAR_PATH}" "${REMOTE_ALIAS}:${REMOTE_DEPLOY_DIR}/"

echo "Checking WildFly status..."
IS_RUNNING=$(ssh ${REMOTE_ALIAS} "sockstat -l | grep ${PORTBASE} || true")

if [ -z "$IS_RUNNING" ]; then
    echo "WildFly is not running. Starting server..."
    ssh ${REMOTE_ALIAS} "
        cd ${REMOTE_BIN_DIR}
        nohup ./standalone.sh > standalone.log 2>&1 &
        disown
    "
    echo "Waiting for WildFly to start (12s)..."
    sleep 12
else
    echo "WildFly is already running. Reloading deployment (3s)..."
    sleep 3
fi

echo "Setting up SSH port forwarding..."
pkill -f "ssh.*-L ${PORTBASE}:localhost:${PORTBASE}" 2>/dev/null || true
sleep 1
ssh -f -N -L ${PORTBASE}:localhost:${PORTBASE} ${REMOTE_ALIAS}

TARGET_URL="http://localhost:${PORTBASE}/${APP_NAME}/controller"
echo "Opening ${TARGET_URL}"
open "${TARGET_URL}"

echo "Deployment complete."
