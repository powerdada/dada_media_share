import {
    BASE_URL, AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY, AWS_BUCKET
} from "../environment/index.js";

import AWS from 'aws-sdk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});



export const uploadFileS3Bucket = async (file) => {
    const matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const response = {};

    if (matches.length !== 3) {
        return new Error('Invalid base64 string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    const params = {
        Bucket: AWS_BUCKET,
        Key: `collage/collage-${Date.now()}-collage.jpeg`,
        Body:  response.data,
        ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return data.Location;
};

export const addCollageToDatabase = async (link, activity_id) => {

    const findConversation = await prisma.collages.findFirst({
        where: {
            activity_id: activity_id,
        },
    })
    if (findConversation) {
       // await deleteFile(findConversation.pictureId);
        await prisma.collages.update({
            where: {
                id: findConversation.id,
            },
            data: {
                link: link,
            },
        })
        return;
    }

    await prisma.collages.create({ data: { link, activity_id } })

};



export const getCollageImage = async (activity_id) => {

    return prisma.collages.findFirst({
        where: {
            activity_id: activity_id,
        },
    })

 
}
