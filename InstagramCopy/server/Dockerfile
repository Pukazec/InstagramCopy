FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY ./ .

RUN dotnet restore ./Domain/Domain.csproj
RUN dotnet restore ./Services/Services.csproj
RUN dotnet restore ./InstagramWorker/InstagramWorker.csproj

RUN dotnet restore ./InstagramCopy/InstagramCopy.csproj

RUN dotnet build --no-restore --configuration Release ./InstagramCopy/InstagramCopy.csproj
RUN dotnet publish --no-build --configuration Release -o out ./InstagramCopy/InstagramCopy.csproj

# Run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as run-env

WORKDIR /app
COPY --from=build-env /app/out .

ENV ASPNETCORE_ENVIRONMENT=Docker 
EXPOSE 5443

ENTRYPOINT ["dotnet", "InstagramCopy.dll"]