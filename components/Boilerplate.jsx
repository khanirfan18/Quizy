import clsx from "clsx"

export default function Boilerplate(props) {
  return (
    <section className="ques-ans">
      <h2>{props.ques}</h2>

      {props.ans.map((item, index) => {
        const isSelected = props.selected === item
        const isCorrect = item === props.correct
        const isWrong = isSelected && item !== props.correct

        return (
          <button
            key={index}
            onClick={() => props.click(props.index, item)}
            disabled={props.submitted}
            className={clsx(
              !props.submitted && isSelected && "default-btn",
              props.submitted && isCorrect && "correct-btn",
              props.submitted && isWrong && "wrong-btn"
            )}
          >
            {item}
          </button>
        )
      })}
    </section>
  )
}
