# Node-ts-backend

        POC on NodeJs and TypeScript with NestJs Framework. Used Postgres DB and Redis Cache. Follow Below Guide.

# Technologies 
- Node
- TypeScript
- Nest JS
- Postgres
- Redis
- Passport-JWT

# Software requirement
- Docker 
- Postgres
- Run the .sql file inside database folder


# Running the app
- Build Image with ## docker build . -t nodebackend
- Run Compose File ## docker-compose up

# Testing Application
## Create User 
- POST API http://localhost:3000/user/registration 
- Payload {
    "username": "DeviKar",
    "email":"devi@gmail.com",
    "password":"1111"
}

## Login 
- POST API http://localhost:3000/user/login 
- Payload {
    "username": "DeviKar",
    "password":"1111"
}
## Update Self Data 
- PUT API http://localhost:3000/user/update 
- Payload {
    "username": "DeviKar",
    "email":"devi@gmail.com",
    "password":"1111"
}
## Find an User info
- GET API http://localhost:3000/user/by/username/{username} 
