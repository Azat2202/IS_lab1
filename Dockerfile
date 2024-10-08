FROM amazoncorretto:21-alpine3.19

WORKDIR /app

COPY . .

RUN ./mvnw package -DskipTests

ENTRYPOINT java -jar ./target/server.jar