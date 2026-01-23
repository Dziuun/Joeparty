const testQuestions = [
  {
    questionId: 1,
    category: "anime",
    question: "How many guitars does bocchi have?",
    anwsers: ["one", "two", "three", "five"],
    correctAnwserIndex: 1,
    correctAnwsers: [2, "TWO", "TWOGUITARS"],
    questionValue: 100,
  },
  {
    questionId: 2,
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 200,
  },
  {
    questionId: 3,
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 300,
  },
  {
    questionId: 4,
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 400,
  },
  {
    questionId: 5,
    category: "anime",
    question: "What is the name of naruto's tailed beast?",
    anwsers: ["kaibi", "minami", "kyuubi", "goryobi"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 500,
  },
  {
    questionId: 6,
    category: "gaming",
    question: "How many teams does a usual game of Counter Strike have?",
    anwsers: ["3", "4", "2", "8"],
    correctAnwserIndex: 2,
    correctAnwsers: ["KYUUBI", "KYUBI"],
    questionValue: 100,
  },
];

function BoardRow({ catName }) {
  return (
    <div>
      {catName}
      {testQuestions.map((question) =>
        question.category === catName ? (
          <span
            key={question.questionId}
            onClick={() => console.log(question.question)}
          >
            {question.questionValue}
          </span>
        ) : (
          ""
        ),
      )}
    </div>
  );
}

export default BoardRow;
