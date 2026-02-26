import express from "express";
import { Router } from "express";
import { getRandomIndexNumber } from "../utils.js";

export default function getQuestionsRouter(db) {
  const router = express.Router();
  router.post("/", async (req, res) => {
    try {
      let allowedCat = req.body.requestedCategories;

      console.log(allowedCat);
      if (allowedCat.length > 6)
        allowedCat = await randomizeCategories(allowedCat);

      const questions = await RandomizeQuestions(allowedCat, db);

      res.json(questions);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Could not fetch questions. Please try another time!");
    }
  });

  return router;
}

async function randomizeCategories(allowedCat) {
  let filteredCategories = [];
  for (let i = 0; i < 6; i++) {
    const r = getRandomIndexNumber(allowedCat.length);

    filteredCategories[i] = allowedCat[r];
    allowedCat.splice(r, 1);
  }

  return filteredCategories;
}

async function RandomizeQuestions(allowedCat, db) {
  const questions = await db
    .collection("questions")
    .aggregate([
      { $match: { category: { $in: allowedCat } } },
      {
        $group: {
          _id: { category: "$category", value: "$questionValue" },
          questions: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          question: {
            $arrayElemAt: [
              "$questions",
              {
                $floor: {
                  $multiply: [{ $rand: {} }, { $size: "$questions" }],
                },
              },
            ],
          },
        },
      },
      { $replaceRoot: { newRoot: "$question" } },
    ])
    .toArray();

  return questions;
}
