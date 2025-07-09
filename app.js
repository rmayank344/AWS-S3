const express = require("express");
const app = express();
require('dotenv').config();


app.use(express.json({ limit: '10mb' }));

//routes
app.use("/api/aws-s3", require("./routes/aws_S3_route"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});