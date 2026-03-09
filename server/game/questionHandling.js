import { getRandomIndexNumber } from "../utils.js";

export async function getQuestions(allowedCat, db) {
  if (allowedCat.length > 6) allowedCat = randomizeCategories(allowedCat);

  const questions = await RandomizeQuestions(allowedCat, db);

  return questions;
}

function randomizeCategories(allowedCat) {
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
