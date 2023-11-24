# jkTech_Assignment

Steps to run the project
Step 1. Create the local database through the below command
-  CREATE DATABASE jktech_db;

Step 2. Create the table in the database through the below command
- CREATE TABLE `jktech_db`.`bucket_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bucket_name` VARCHAR(45) NULL,
  `user_id` INT(11) NULL,
  PRIMARY KEY (`id`));

Step 3. Create the another table in the database through the below command
-   CREATE TABLE `jktech_db`.`file_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL,
  `bucket_id` INT(11) NULL,
  `url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

After configuring the database to run the project through the below command
 npm i
 node app.js

 Here is the link of postman collection of all the API
 https://api.postman.com/collections/28928953-fac395f1-191c-4c35-908f-74adb305f353?access_key=PMAT-01HG09092QH8VJYJWHXP31SZF7