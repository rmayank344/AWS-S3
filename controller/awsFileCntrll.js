const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const aws_S3 = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// MIME type resolver
function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    pdf: 'application/pdf'
  };
  return types[ext] || 'application/octet-stream';
}

// User can user this function upload object in AWS S3
const awsObjectUpload = async (req, res) => {
  const { fileName, fileBase64 } = req.body;

  if (!fileBase64 || !fileName)
    return res.status(400).json({ error: 'fileBase64 and fileName are required' });

  const base64Data = Buffer.from(fileBase64.replace(/^data:.*;base64,/, ''), 'base64');

  const key = `user-file/${uuid()}-${fileName}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: getMimeType(fileName),
  };

  try {
    await aws_S3.upload(params).promise();
    res.json({ message: 'File uploaded successfully', key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'S3 upload failed' });
  }
};


const awsGetObject = async (req, res) => {
  const { fileName } = req.query;
  if (!fileName) return res.status(400).json({ error: 'filename query param is required' });

  const key = `user-file/${fileName}`;

  const staticUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  try {
    const signedUrl = await aws_S3.getSignedUrlPromise('getObject', {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: 180
    });

    res.json({
      message: 'URL generated successfully',
      staticUrl,
      preSignedUrl: signedUrl
    });
  } catch (err) {
    console.error('S3 Error:', err);


    res.status(500).json({ error: 'Failed to get file' });
  }
};


const awsDeleteObject = async (req, res) => {
  const { fileName } = req.query;
  if (!fileName) return res.status(400).json({ error: 'filename query param is required' });

  const key = `user-file/${fileName}`;

  try {
    await aws_S3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'S3 delete failed' });
  }
};


module.exports = { awsObjectUpload, awsGetObject, awsDeleteObject };