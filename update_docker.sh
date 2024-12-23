#!/bin/bash

# Variables
docker_container_name="charon-db"
db_name="business_db"
sql_file="pgdump.sql"

echo "Starting the database update process..."

# Check if SQL file exists
if [ ! -f "$sql_file" ]; then
  echo "Error: SQL file not found at $sql_file"
  exit 1
fi

# Step 1: Stop the container if it's running
echo "Stopping Docker container $docker_container_name..."
docker stop $docker_container_name || echo "$docker_container_name was not running."

# Step 2: Start the container
echo "Starting Docker container $docker_container_name..."
docker start $docker_container_name

# Step 3: Drop the existing database and recreate it
echo "Resetting the database..."
docker exec -i $docker_container_name psql -U postgres -c "DROP DATABASE IF EXISTS $db_name;"
docker exec -i $docker_container_name psql -U postgres -c "CREATE DATABASE $db_name;"

# Step 4: Load the new SQL file
echo "Loading new SQL file into the database..."
docker exec -i $docker_container_name psql -U postgres -d $db_name <"$sql_file"

# Final step: Verify the process
echo "Verifying the database update..."
docker exec -i $docker_container_name psql -U postgres -d $db_name -c "\dt"

echo "Database update completed successfully!"
