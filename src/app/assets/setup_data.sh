#!/bin/bash
# setup_data.sh: Generate test data for weather assignment

set -e

# Output directories
DATA_DIR="weather_data"
CITIES_FILE="$DATA_DIR/cities.json"
WEATHER_DIR="$DATA_DIR/city"
# Create data directory
mkdir -p "$DATA_DIR"
mkdir -p "$WEATHER_DIR"

# List of 30 cities with static lat/long (sample data)
cities=(
  "New York:40.7128:-74.0060"
  "London:51.5074:-0.1278"
  "Paris:48.8566:2.3522"
  "Tokyo:35.6895:139.6917"
  "Sydney:-33.8688:151.2093"
  "Berlin:52.5200:13.4050"
  "Moscow:55.7558:37.6173"
  "Toronto:43.6532:-79.3832"
  "Beijing:39.9042:116.4074"
  "Mumbai:19.0760:72.8777"
  "Cape Town:-33.9249:18.4241"
  "Rio de Janeiro:-22.9068:-43.1729"
  "Los Angeles:34.0522:-118.2437"
  "Chicago:41.8781:-87.6298"
  "Dubai:25.2048:55.2708"
  "Singapore:1.3521:103.8198"
  "Hong Kong:22.3193:114.1694"
  "Bangkok:13.7563:100.5018"
  "Rome:41.9028:12.4964"
  "Madrid:40.4168:-3.7038"
  "Istanbul:41.0082:28.9784"
  "Seoul:37.5665:126.9780"
  "San Francisco:37.7749:-122.4194"
  "Mexico City:19.4326:-99.1332"
  "Barcelona:41.3851:2.1734"
  "Amsterdam:52.3676:4.9041"
  "Vienna:48.2082:16.3738"
  "Lisbon:38.7223:-9.1393"
  "Cairo:30.0444:31.2357"
  "Athens:37.9838:23.7275"
)

# Generate cities.json
printf '[\n' > "$CITIES_FILE"
for i in "${!cities[@]}"; do
  IFS=":" read -r name lat lon <<< "${cities[$i]}"
  printf '  {"name": "%s", "lat": %s, "lon": %s}' "$name" "$lat" "$lon" >> "$CITIES_FILE"
  if [ $i -lt $((${#cities[@]}-1)) ]; then
    printf ',\n' >> "$CITIES_FILE"
  else
    printf '\n' >> "$CITIES_FILE"
  fi
done
printf ']\n' >> "$CITIES_FILE"

echo "Created $CITIES_FILE"

# Generate weather data for each city
for city in "${cities[@]}"; do
  IFS=":" read -r name lat lon <<< "$city"
  city_file="$WEATHER_DIR/$(echo $name | tr ' ' '_' | tr -d ',').json"
  printf '[\n' > "$city_file"
  for offset in $(seq -14 14); do
    if [ $offset -lt 0 ]; then
        date=$(date -v${offset}d +%Y-%m-%d)
    else
        date=$(date -v+${offset}d +%Y-%m-%d)
    fi
    # Random weather data
    min_temp=$((RANDOM % 15 + 5))
    max_temp=$((min_temp + RANDOM % 10 + 5))
    wind_speed=$((RANDOM % 20 + 1))
    wind_dir=$((RANDOM % 360))
    rain_pct=$((RANDOM % 101))
    air_quality=$((RANDOM % 201))
    printf '  {"date": "%s", "min_temp": %d, "max_temp": %d, "wind_speed": %d, "wind_dir": %d, "rain_pct": %d, "air_quality": %d}' \
      "$date" "$min_temp" "$max_temp" "$wind_speed" "$wind_dir" "$rain_pct" "$air_quality" >> "$city_file"
    if [ $offset -lt 14 ]; then
      printf ',\n' >> "$city_file"
    else
      printf '\n' >> "$city_file"
    fi
  done
  printf ']\n' >> "$city_file"
  echo "Created $city_file"
done
