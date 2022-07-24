import axios from "axios";
import { parse } from 'node-html-parser';

import { API_ENDPOINT, BASE_URL, APP_URL } from "../environment/index.js"
import { getCollageImage } from '../service/index.js';
export const botFetch = async (req, res) => {
    try {
        const categoryId = req.query?.categoryId;
        if (!categoryId) return res.redirect(BASE_URL);

        const { data: result } = await axios.get(API_ENDPOINT);
        if (!result) return res.redirect(BASE_URL);
        const selectedBlog = result.data.find(obj => obj.id === parseInt(categoryId));
        if (!selectedBlog) return res.redirect(BASE_URL);

        const metaTags = {
            url: `${APP_URL}/sharing-link/blog?categoryId=${categoryId}`,
            domain: APP_URL,
            thumbnail: (selectedBlog.thumbnail) ? selectedBlog.thumbnail : '',
            title: (selectedBlog.title) ? parse(selectedBlog.title) : '',
            twitterCard: "summary_large_image",
        };

        res.render('category', {
            ...metaTags
        });
    } catch (err) {
        console.log('[ERROR]', err);
        return res.redirect(BASE_URL);
    }

}


export const botCollage = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const resultData = await getCollageImage(parseInt(conversationId));
        if (!resultData) return res.redirect(BASE_URL);
        const metaTags = {
            url: `${APP_URL}/sharing-collage/collage/${conversationId}`,
            domain: APP_URL,
            thumbnail: `${resultData.link}`,
            title: 'Dada Art',
            twitterCard: "summary_large_image",
        };

        res.render('collage', {
            ...metaTags
        });

    } catch (err) {
        console.log('[ERROR]', err);
        return res.redirect(BASE_URL);
    }

}
