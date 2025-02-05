# docker version
docker run --detach -p 5555:5432 --name pb138-team-project-database -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=database postgres:latest
