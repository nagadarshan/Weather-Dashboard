#!/bin/bash
# start_server.sh: Serve weather_data directory on port 9000

cd "$(dirname "$0")/weather_data"
python3 cors_server.py
