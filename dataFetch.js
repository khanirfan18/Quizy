import { decode } from "html-entities"

export async function dataFetch() {
    const res = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    )
    const data = await res.json()

    return data.results.map(item => ({
        question: decode(item.question),
        answers: [...item.incorrect_answers, item.correct_answer]
            .map(answer => decode(answer)),
        correctAnswer: decode(item.correct_answer)
    }))
}
