#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_ID_FILE="$SCRIPT_DIR/oauth-client.json"

SCOPES="https://www.googleapis.com/auth/cloud-platform,\
https://www.googleapis.com/auth/tagmanager.edit.containers,\
https://www.googleapis.com/auth/tagmanager.publish,\
https://www.googleapis.com/auth/tagmanager.delete.containers,\
https://www.googleapis.com/auth/tagmanager.edit.containerversions,\
https://www.googleapis.com/auth/tagmanager.manage.accounts,\
https://www.googleapis.com/auth/tagmanager.manage.users,\
https://www.googleapis.com/auth/tagmanager.readonly,\
https://www.googleapis.com/auth/analytics.edit,\
https://www.googleapis.com/auth/analytics.readonly"

gcloud auth application-default login \
    --client-id-file="$CLIENT_ID_FILE" \
    --scopes="$SCOPES"

gcloud auth application-default set-quota-project inn32-marketing
