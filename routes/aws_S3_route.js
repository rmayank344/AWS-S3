const express = require('express');
const router = new express.Router();
const {validateFileType} = require("../helper/fileValidator");
const {awsObjectUpload, awsGetObject, awsDeleteObject} = require("../controller/awsFileCntrll");

// File upload routes
router.post('/upload-object', validateFileType, awsObjectUpload);

//Get Object
router.get('/get-object', awsGetObject);

//Delete Object
router.delete('/delete-object', awsDeleteObject);

module.exports = router;