#!/bin/bash
echo "Stopping docker containers"
sudo docker-compose -f /home/docker-compose.yml down
echo "Removing docker container sedsnepal_md_app"
sudo docker rmi supernovabirth/sedsnepal_md_app
echo "Removing docker container sedsnepal_md_web"
sudo docker rmi supernovabirth/sedsnepal_md_web
echo "Running docker-compose up"
sudo docker-compose -f /home/docker-compose.yml up >> docker-compose-log.txt