import { addCollageToDatabase,  uploadFileS3Bucket } from '../service/index.js'

export const uploadCollage = async (req, res) => {
    try {
        const { body } = req;
        const {  base64 , activity_id } = body;
        const result = await uploadFileS3Bucket(base64);
        res.status(200).json({ message: result });
         addCollageToDatabase(result, parseInt(activity_id))
    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
}


