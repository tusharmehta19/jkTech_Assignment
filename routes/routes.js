import express from 'express'
const router = express.Router();
import { createBucket } from "../controller/jkTech_assignment.js"
import { getBucketlist } from "../controller/jkTech_assignment.js"
import { uploadAsset } from "../controller/jkTech_assignment.js"
import { getFileList } from "../controller/jkTech_assignment.js"
import { deleteUrl } from "../controller/jkTech_assignment.js"

import Upload from "../imageUpload/imageuploadfile.js";


router.post('/createBucket', createBucket)
router.put('/deleteUrl', deleteUrl)
router.get('/getBucketlist', getBucketlist)
router.post('/upload_asset', Upload.fields([{ name: "url", maxCount: 1 }]), uploadAsset)
router.get('/getFileList', getFileList)








export default router;