sudo docker rm spring-container --force

sudo docker build --no-cache -t spring-image .

sudo docker run -p 8080:8081 -d -v /home/ubuntu/images:/images --name spring-container spring-image