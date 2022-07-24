import express from 'express';
import { fetchConversations, fetchEditorial, botFetch, botCollage, uploadCollage } from './routes/index.js';
import { BASE_URL, HTTP_AGENTS } from "./environment/index.js";
import multer from "multer";
import cors from "cors";

import dotenv from 'dotenv'
import  fileUpload from 'express-fileupload'
dotenv.config()
const uploadMulter = multer();
const app = express();
const botRouter = express.Router();
const router = express.Router();

app.use(cors());
// file middleware
app.use(express.json({limit: '50mb'}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening  ${process.env.PORT || 3000}`);
})
app.set('view engine', 'jade');

app.use('/sharing-link', async (req, res, next) => {
    console.log(HTTP_AGENTS.test(req.headers['user-agent']));

    (HTTP_AGENTS.test(req.headers['user-agent'])) ? botRouter(req, res, next) : router(req, res, next)
});


app.use('/sharing-collage', async (req, res, next) => {
   console.log(req.headers['user-agent']);
    (HTTP_AGENTS.test(req.headers['user-agent'])) ? botRouter(req, res, next) : router(req, res, next)
});

app.get("/", (req, res, next) => {
    res.redirect(BASE_URL);
});
botRouter.get('/collage/:id', botCollage);
router.get('/collage/:id', fetchConversations);
router.post("/upload", uploadCollage);
router.get("/blog", fetchEditorial);
botRouter.get('/blog', botFetch);


