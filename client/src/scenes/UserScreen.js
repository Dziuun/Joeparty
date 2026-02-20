

const singleQuestionThatUserSee = 
    {
    id: '',
    category: '',
    question: '',
    value: '',
    }
    ;

const whatUserShouldSeeStructure = [
    {
    id: '',
    category: '',
    question: '',
    value: '',
    }, 
    {
    category: '',
    question: '',
    value: '',
    }
]

const whatUserPressed = {
    answerUserPressed: 'A',
    questionId: ''
}



// Server



const fullQuestionDate = [  // przycjhodzi z bazy danych
    
    {
    id: '',
    category: '',
    question: '',
    value: '',
    validAnswer: '';
    }
]



function questionEvaluator(singleQuestionThatUserSee, whatUserPressed) {
    const questionFound = fullQuestionDate.find(singleQuestionThatUserSee.Id);

    return [questionFound.validAnswer === whatUserPressed, questionFound]
}


function reactToAnswer(whatUserPressed) {
    // Pattern Maszyna stanu/Orchiestrator
    const questionFound = fullQuestionDate.find(singleQuestionThatUserSee.Id);
    const [question, isResponseValid] = questionEvaluator()

    whatShouldHappenOnAnswer()

}


function whatShouldHappenOnAnswer(didUserGuessedGood) {
    if (didUserGuessedGood) {
        // Dodanie punktów do tablicy z Userami
        // odpowiedź do USera, żeby pokazać confetti
    }
    else {
        //pass question to next User
    }

}