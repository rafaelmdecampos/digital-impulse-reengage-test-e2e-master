set -e

REGION="us-east-1"
ECR_URL="064250947333.dkr.ecr.us-east-1.amazonaws.com/digital-impulse-reengage-test-e2e"
BUILD_NUMBER="${BUILD_NUMBER:-$(date +%s)}"

echo "Building $BUILD_NUMBER" 

# build a docker image with a unique build number
docker build -t $ECR_URL:$BUILD_NUMBER .  

#tag for "latest" and also push that
docker tag $ECR_URL:$BUILD_NUMBER $ECR_URL:latest

docker push $ECR_URL:latest