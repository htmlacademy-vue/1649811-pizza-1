#!/bin/bash

docker-compose up -d

cd src/frontend
npm run server

cd ../..
