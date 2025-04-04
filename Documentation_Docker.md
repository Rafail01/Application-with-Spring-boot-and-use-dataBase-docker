## This is a documentation about how run a docker database

## Step 1 : Run this script
docker run --name mysqldb -v mysqldbvol:/var/lib/mysql -p 3306:3306 -e MYSQL_USER=HbRafos -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=TestApp -e MYSQL_ROOT_PASSWORD=pass123 --rm -d mysql/mysql-server:latest

## Step 2 : Run 
docker exec -it mysqldb mysql -u root -p

# Put the password : pass123

## Step 3 : Use the dataBase 
USE TestApp;

