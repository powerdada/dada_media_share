import { BASE_URL } from "../environment/index.js";

export const fetchEditorial = async (req, res) => {

    if (req.query === {}) { return res.redirect(BASE_URL); }
    const categoryId = req.query?.categoryId;
    const redirectUrl = `${BASE_URL}/editorial/category/${categoryId}`;
    res.redirect(redirectUrl)
}




export const fetchConversations = async (req, res) => {
    res.redirect(BASE_URL)
}