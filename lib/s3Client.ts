import { S3 } from "@aws-sdk/client-s3";

export const s3Client = new S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: "us-east-1", // Always use this for DigitalOcean Spaces
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  }
});