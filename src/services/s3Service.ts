import AWS from 'aws-sdk';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file: File, bucketName: string) => {
  const fileContent = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: bucketName,
    Key: `uploads/${Date.now()}_${path.basename(file.name)}`, // file name
    Body: fileContent,
    ACL: 'public-read', // Make the file public
  };

  return s3.upload(params).promise();
};
