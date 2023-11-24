import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req.body.bucket_name", req.body)
        let bucketName = req.body.bucket_name
        cb(null, "uploads/" + bucketName);
    },
    filename: async (req, file, cb) => {
        console.log("file", file.originalname)
        cb(null, file.originalname.split('.')[0] + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })


export default upload;
