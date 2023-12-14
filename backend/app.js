import express, { response } from 'express';
import got from "got";
import jsdom from "jsdom";

const app = express();
const { JSDOM } = jsdom;
const port = 8080;

const link = "https://www.olx.ua/uk/list";

app.post('/olx', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const searchString = req.query.reqsrt;
    const searchAmount = Number(req.query.amount);

    console.log(searchString, searchAmount);
    const conqLink = `${link}/q-${searchString}/`;

    got(conqLink).then(response => {

        const dom = new JSDOM(response.body);

        let goodsInfoArray = Array.from(dom.window.document.querySelectorAll('div[data-cy=l-card]'));

        return goodsInfoArray.map(el => {
            const el1 = el.querySelector("h6");
            if (el1 !== null) {
                return el1.innerHTML;
            }
        })
            .filter(e => e)
            .slice(0, searchAmount);

    }).then((goodsInfoArray) => {
        console.log(goodsInfoArray);
        res.send(JSON.stringify(goodsInfoArray));
    })
})

app.post('/get-incorrect-words', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    console.log(req.query);
    const words = req.query.words.split(',');
    const wordExistsObject = {};
    console.time(`time for ${words.length} words checking`);

    try {
        await Promise.all(words.map(async (word, i) => {
            try {
                const response = await got(`https://goroh.pp.ua/Тлумачення/${word}`);
                const dom = new JSDOM(response.body);
                const wordExists = !dom.window.document.querySelector('header.article-head').innerHTML.includes('не містить');
                wordExistsObject[word] = wordExists;
                console.log(wordExistsObject);
            } catch (ex) {
                wordExistsObject[word] = false;
                console.log("DAMN!" + ex);
            }
        }));
    } catch (error) {
        console.error("Error occurred during Promise.all():", error);
    }

    console.log("final:", wordExistsObject);
    console.timeEnd(`time for ${words.length} words checking`);
    res.send(wordExistsObject);
});

app.listen(port, () => { });

console.log(`start listening at ${port}`);