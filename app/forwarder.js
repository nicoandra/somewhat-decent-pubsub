const AWS_SQS_MAX_SIZE_BYTES = 256 * 1024 * 0.8 // 256KB, minus 20% for safety margin

exports.handler = async (aws_event) => {

    for(let singleRecord of aws_event['Records']) {
        console.log(JSON.stringify(singleRecord))

        const s3Object = singleRecord['s3']['object']
        const objectSize = s3Object['size']

        if (s3Object['size'] > AWS_SQS_MAX_SIZE_BYTES) {
            console.log(`Payload is too big for SQS (${objectSize} bytes), better send a reference to the file`)
            continue;
        }

        console.log(`Payload fits on SQS (${objectSize} bytes), better send over SQS`)
    }

    return true
}