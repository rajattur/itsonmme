#!/bin/bash
SERVICE_NAME="${SERVICE_NAME}"
echo ${SERVICE_NAME}
# exec sed -i.bak s/-\\\${'SERVICE_NAME'}/-'89898989'/g 'deployment.yaml'