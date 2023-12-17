
import express from "express";
import got from "got";

import { JSDOM } from 'jsdom';
import { getEbaySearchUrl } from "./helpers.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

app.get('/get-ebay-page', async (req, res) => {

    const searchString = req.query.search_string;
    const searchAmount= req.query.amount;
    const url = getEbaySearchUrl(searchString);

    const parsedPageResponse = await got(url);
    const parsedPageDOM = new JSDOM(parsedPageResponse.body);
    const goodsTitles = [...parsedPageDOM.window.document.querySelectorAll('.s-item__title')].map(s => s.lastChild.textContent);
    goodsTitles.shift();
    res.send(JSON.stringify(goodsTitles.slice(0, searchAmount)));
})

app.listen(port, () => {
    console.log(`Ebay backend listening on port ${port}`)
})