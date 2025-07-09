# AWS-S3

# 📁 AWS S3 File Upload API (Base64) — Node.js + Express

This is a backend API to **upload**, **get**, and **delete** files in an AWS S3 bucket using **base64-encoded file content** — without using `multer`. It includes file extension validation, UUID naming, and returns both **static URL** and **pre-signed URL**.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- AWS SDK (v2)
- dotenv
- UUID

---

## 📁 Folder Structure

AWS-S3/
├── app.js
├── .env
├── package.json
├── controller/
│ └── awsFileCntrll.js
├── routes/
│ └── awsRoutes.js
├── config/
│ └── awsS3.js

yaml
Copy
Edit

---

## 🌐 API Endpoints

### 🔼 Upload File  
**POST** `/s3/upload`

- **Body (JSON):**
```json
{
  "fileBase64": "data:image/png;base64,...", 
  "fileName": "aadhar.png"
}
✅ Allowed extensions: pdf, png, jpeg, jpg

🚫 Other files like mp4, zip will be rejected.

Success Response:

json
Copy
Edit
{
  "message": "File uploaded successfully",
  "key": "aws-file/uuid-aadhar.png",
  "fileName": "uuid-aadhar.png"
}
📥 Get File URLs
GET /s3/get?key=aws-file/uuid-aadhar.png

✅ Returns both:

json
Copy
Edit
{
  "staticUrl": "https://mybucket.s3.ap-south-1.amazonaws.com/aws-file/uuid-aadhar.png",
  "preSignedUrl": "https://....X-Amz-Signature=..."
}
❌ Delete File
DELETE /s3/delete?key=aws-file/uuid-aadhar.png

✅ File must exist

🔁 Returns:

json
Copy
Edit
{ "message": "File deleted successfully" }
✅ Features
✅ Upload files from base64 content (Postman/frontend)

✅ Stores in aws-file/ folder inside bucket

✅ Auto-renames using UUID

✅ Static + pre-signed URL support

✅ Restricts file types

✅ Returns proper 404 error if key doesn't exist

✅ All AWS credentials loaded from .env

🔐 .env Setup
env
Copy
Edit
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
BUCKET_NAME=mybucket
🧪 How to Test in Postman
Upload:

Paste base64 string (include the full prefix like data:image/png;base64,...)

Get or Delete:

Use full S3 key like: aws-file/uuid-file.pdf

