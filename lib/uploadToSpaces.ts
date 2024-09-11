import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from './s3Client';  // Adjust this import path as necessary

export async function uploadToSpaces(file: File, key: string): Promise<string | undefined> {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.DO_SPACES_BUCKET!,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ACL: "public-read",
      },
    });

    const result = await upload.done();
    return result.Location;
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    return undefined;
  }
}