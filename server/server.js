const express = require("express");
const cors = require("cors");
// const { faker } = require('@faker-js/faker');
const { Faker, en, de, fr } = require("@faker-js/faker");

const app = express();
app.use(cors());

const localeMap = {
    en: en,
    de: de,
    fr: fr,
};

function generateBooks(seed, page, lang = "en", likesAvg, reviewsAvg) {
    // faker = new Faker({ locale: [de] });
    faker = new Faker({ locale: localeMap[lang] || en });
    faker.seed(parseInt(seed) + page);

    return Array.from({ length: 20 }, (_, index) => ({
        index: index + 1 + page * 20,
        isbn: faker.commerce.isbn(13),
        title: faker.person.firstName(),
        author: faker.person.firstName() + ' ' + faker.person.lastName(),
        publisher: faker.company.name(),
        // title: faker.book.title(),
        // author: faker.book.author(),
        // publisher: faker.book.publisher(),
    }));
}

app.get("/books", (req, res) => {
    const { seed, page, lang = "en", likesAvg, reviewsAvg } = req.query;
    const books = generateBooks(seed, Number(page), lang);
    res.json(books);
});

app.listen(3001, () => console.log("Server running on port 3001"));