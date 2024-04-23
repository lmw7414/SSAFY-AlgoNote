
FROM openjdk:17-ea-slim

ARG JAR_FILE=./algonote-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT [ "java", "-jar" ,"./app.jar" ]