#!/bin/sh

npx sequelize-cli db:migrate --config config/config.js
node server.js