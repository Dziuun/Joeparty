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
];

function App() {
  return (
    <div>
      <p>{testQuestions[0].category}</p>
    </div>
  );
}

export default App;
