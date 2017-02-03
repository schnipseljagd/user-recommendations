# User recommendations
A personal playground for the serverless framework and dynamodb. Happened to be in nodejs.

## Usage
Due to a bug in the dynamic arn assignment you have to apply this diff before the initial deploy and remove it afterwards again and deploy a second time ¯\_(ツ)_/¯

```
diff --git a/serverless.yml b/serverless.yml
index cc550af..18d847a 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -73,9 +73,6 @@ functions:
           cors: true
   createRecommendationForCreatedPlace:
     handler: handler.createRecommendationForCreatedPlace
-    events:
-      - stream:
-          arn: ${env:PLACES_DYNAMODB_TABLE_STREAM_ARN}

 resources:
   Resources:
```

    ./script/deploy

## Tests
Runs integration tests against the dev stage.
    ./script/test
