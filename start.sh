#!/bin/sh

set -e

echo "Applying Alembic migrations..."
npx sequelize-cli db:migrate --config config/config.js

echo "Starting FastAPI application..."
node server.js