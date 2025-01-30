const express = require("express");
const cors = require("cors");
const seedrandom = require('seedrandom');
// const { faker } = require('@faker-js/faker');
const { Faker, en, de, fr } = require("@faker-js/faker");

const app = express();
app.use(cors());

const localeMap = {
    en: en,
    de: de,
    fr: fr,
};

// function getLikesAndReviews(likes) {
    // const intLikes = Math.floor(likes);
    // const remain = (likes - intLikes);
    // if (remain >= 0.5) {
    //     const roundedRemain = Math.ceil(remain);
    //     const result = intLikes + roundedRemain
    //     console.log(result)
    //     return result;
    // }
    //     console.log(intLikes);
    //     return intLikes;
// }

function getLikesAndReviews(avg, rng) {
    const base = Math.floor(avg);
    const remainder = avg - base;
    return rng() < remainder ? base + 1 : base;
}

function generateBooks(seed, page, lang = "en", likesAvg = 0, reviewsAvg = 0) {
    // faker = new Faker({ locale: [de] });
    const rng = seedrandom(`${seed}-${page}`);
    console.log(rng);

    faker = new Faker({ locale: localeMap[lang] || en });
    faker.seed(seed);

    return Array.from({ length: 20 }, (_, index) => ({
        index: index + 1 + page * 20,
        isbn: faker.commerce.isbn(13),
        title: faker.person.firstName(),
        author: faker.person.firstName() + ' ' + faker.person.lastName(),
        publisher: faker.company.name(),
        likes: getLikesAndReviews(likesAvg, rng),
        reviews: getLikesAndReviews(reviewsAvg, rng)
        // title: faker.book.title(),
        // author: faker.book.author(),
        // publisher: faker.book.publisher(),
    }));
}

app.get("/books", (req, res) => {
    const { seed = "42", page, lang = "en", likesAvg = "0", reviewsAvg = "0" } = req.query;
    const books = generateBooks(seed, Number(page), lang, parseFloat(likesAvg), parseFloat(reviewsAvg));
    res.json(books);
    console.log(seed);

});

app.listen(3001, () => console.log("Server running on port 3001"));