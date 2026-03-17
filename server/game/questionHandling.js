import { NUMBER_OF_CATEGORIES } from "../../config.js";
import { getRoom } from "../rooms/roomManager.js";
import { getRandomIndexNumber } from "../utils.js";

export async function getQuestions(allowedCat, db) {
  if (allowedCat.length > NUMBER_OF_CATEGORIES)
    allowedCat = randomizeCategories(allowedCat);

  const questions = await RandomizeQuestions(allowedCat, db);

  return questions;
}

export function provideQuestion(questionId, player) {
  const room = getRoom(player.roomId);

  const [question] = findQuestion(questionId, room);

  room.curQuestion = question;

  return room;
}

function randomizeCategories(allowedCat) {
  let filteredCategories = [];
  for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
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

function findQuestion(questionId, room) {
  return room.questions.filter((question) => {
    return question._id.toString() === questionId;
  });
}
