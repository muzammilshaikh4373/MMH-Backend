import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()


aws.config.update({
  accessKeyId: process.env.AWS_SEC_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
});


const s3 = new aws.S3();

 const uploadFile = async (files) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${Date.now()}_${files.originalname}`,
    Body: files.buffer, // Set the file content as the Body
  };

  console.log('Upload Params:', params)
  try {
      const data = await s3.upload(params).promise();
      return data;
  } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
  }
};
