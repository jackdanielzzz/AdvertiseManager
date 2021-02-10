# Spring Boot app with MySql and React.js as frontend
This project based on Spring Boot with Spring Data JPA and Hibernate using MySql.

## Description
This Project shows the list of meetings which are stored in the MySql Database. Using the following endpoints, different operations can be achieved:
- `/load` - This preloads first data to the database
- `/api/banners` - This returns all banners in json format
- `/api/categories` - This returns categories in json format
- `http://localhost:8080/bid?category=app` - Request this to see "application banner"


## Libraries used
- Spring Boot
- Spring Data JPA with Hibernate
- MySql
- React.js

## Tools used
- Git 2.29.2
- IntelliJ IDEA Ultimate 2020.2
- MySql running locally
- Visual Studio Code


## How to execute
- `advmanage` - Create new schema with user `root` and password `123`
- `java -jar advmanager.jar` - Classically execute project 
- `http://localhost:8080` - Open URL in your favourite browser
