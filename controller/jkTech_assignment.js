import moment from 'moment'
import fs from 'fs'
import { executeQuery } from "../database/databaseConnection.js"
let dir = './uploads/'


export const createBucket = async (req, res) => {
    try {

        let { bucket_name, user_id } = req.body

        if (bucket_name === "" || user_id === "") {
            return res.status(400).send({ message: "bucket_name, user_id All fields are mandatory to proceed further" })
        }

        let insertBucket = `INSERT INTO bucket_list (bucket_name, user_id)values('${bucket_name}', '${user_id}')`;

        let queryResponse = await executeQuery(insertBucket)
        let folderName = dir + bucket_name
        if (queryResponse.affectedRows == 1) {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
            return res.status(200).send({ message: "Insert data Sucessfully", status: true })
        } else {
            return res.status(200).send({ message: "Something went wrong.", status: false })

        }


    } catch (error) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error: error })

    }
}

export const getBucketlist = async (req, res) => {
    try {
        let { user_id } = req.query

        let getBucket = `Select * from bucket_list where user_id = ${user_id}`;

        let responseSet = await executeQuery(getBucket)

        if (responseSet.length > 0) {
            return res.status(200).send({ message: "Data Found Sucessfully", data: responseSet })


        }
        else {
            return res.status(200).send({ message: "Data Not Found", data: responseSet })

        }


    } catch (error) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error: error })

    }
}

export const uploadAsset = async (req, res) => {
    try {

        let devUrl = `http://localhost:9900/uploads/`
        let { url } = req.files
        let { user_id, bucket_name } = req.body;

        let urlName = typeof (url) == "object" ? devUrl + url[0].originalname : "";

        let getBucketInfo = `select * from bucket_list where user_id=${user_id} and bucket_name = '${bucket_name}' limit 1`;

        let getQueryResponse = await executeQuery(getBucketInfo)

        if (getQueryResponse.length > 0) {
            let insertUrl = `INSERT INTO file_list (bucket_id, user_id, url)values('${getQueryResponse[0].id}', '${user_id}','${urlName}')`;
            await executeQuery(insertUrl)
            res.status(200).send({ message: "Update Success", status: true })


        } else {
            console.log("reject user_id");
            res.status(200).send({ message: "Bucket not found", status: false })

        }


    } catch (error) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error: error })

    }
}

export const getFileList = async (req, res) => {
    try {
        let { user_id } = req.query

        let getFileList = `Select fl.id as listId, fl.user_id,fl.url from file_list as fl JOIN bucket_list as bl on fl.bucket_id=bl.id where fl.user_id = ${user_id}`;

        let responseSet = await executeQuery(getFileList)

        if (responseSet.length > 0) {
            return res.status(200).send({ message: "Data Found Sucessfully", data: responseSet })
        }
        else {
            return res.status(200).send({ message: "Data Not Found", data: responseSet })

        }


    } catch (error) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error: error })

    }
}

export const deleteUrl = async (req, res) => {
    try {
        let { id } = req.body;

        let deleteUrl = `Delete from file_list where id = ${id}`;
        let responseSet = await executeQuery(deleteUrl)
        if (responseSet.affectedRows == 1) {
            console.log(executeQuery, "executeQuery")
            res.status(200).send({ message: "Delete Data successfully", status: true })


        } else {
            console.log("reject id");
            res.status(200).send({ message: "id not found", status: false })

        }


    } catch (error) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error: error })

    }
}