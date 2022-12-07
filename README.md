# somewhat-decent-pubsub
A somewhat decent scalable and developer-friendly pubsub implementation.

This is a proof-of-concept that aims to:

1. Allow payloads of up to 10MB (limited by API Gateway maximum request body size).
2. Route messages over SQS whenever the payload would fit, or otherwise send an HTTP reference to the S3 object.
3. Allow clients to access Pubsub events over HTTPS, thus avoiding the need for them to require additional permissions on the Pubsub buckets.
4. Return descriptive error messages whenever the schema validation does not pass, ie:

````
{
    "message": "Invalid request body", 
    "error": "[object has missing required properties ([\"name\"])]"
}
````

To test:

1. Deploy the stack to your AWS Account. You might need to update some references, notably the secrets used.
2. Upon deployment, feel free to test the different payloads:
    1. small-payload.json and large-payload are payload that will pass validation.
    2. invalid-small-payload.json and invalid-large-payload.json are payloads that will fail on validation.
3. To test from your local, you can run `curl -d @small-payload.json https://(your api id).execute-api.(region).amazonaws.com/(stage name)`

