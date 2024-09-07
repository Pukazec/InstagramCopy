# Define the paths to your Dockerfiles and the tags for the images
$dockerfilePaths = @(".\server\DockerfileApi", ".\server\DockerfileWorker", ".\instagram-client\Dockerfile")
$imageTags = @("instagramCopy/api", "instagramCopy/worker", "instagramCopy/web")

docker build -f '.server\Dockerfile.api' -t 'instagramCopy/api'

# Loop through the Dockerfiles and build each image
for ($i = 0; $i -lt $dockerfilePaths.Count; $i++) {
    $dockerfilePath = $dockerfilePaths[$i]
    $imageTag = $imageTags[$i]
    
    Write-Host "Building image $imageTag from $dockerfilePath" -ForegroundColor DarkYellow
    
    docker build -f $dockerfilePath -t $imageTag .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error building $imageTag from $dockerfilePath" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "$imageTag built successfully." -ForegroundColor LightGreen
    }
}

Write-Host "All builds completed successfully." -ForegroundColor DarkGreen