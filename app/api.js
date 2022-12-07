exports.handler = async (aws_event) => {
    const responseCode = 200;
    
    const responseBody = {
        message: "Service seems to be up...",
        input: aws_event
    };

    const response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    return response;
}