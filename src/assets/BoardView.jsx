import BoardRow from "./BoardRow";

const testQuestions = [
  {
    category: "anime",
    question: "How many guitars does bocchi have?",
    anwsers: ["one", "two", "three", "five"],
    correctAnwserIndex: 1,
    correctAnwsers: [2, "TWO", "TWOGUITARS"],
    questionValue: 100,
  },
  {
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
  {
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
  {
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
  {
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
  {
    category: "gaming",
    question: "How many teams does a usual game of Counter Strike have?",
    anwsers: ["3", "4", "2", "8"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
];

const QUESTIONS_PER_CATEGORY = 5;

function BoardView() {
  return (
    <div>
      {testQuestions.map((cat, i) =>
        i % QUESTIONS_PER_CATEGORY === 0 ? (
          <BoardRow catName={cat.category} />
        ) : (
          ""
        ),
      )}
    </div>
  );
}

export default BoardView;
