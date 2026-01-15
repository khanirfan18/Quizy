export default function Intro(props) {
     return (<>
            <section className="intro">
                <h1>Quizzical</h1>
                <p>Brains over button-mashing.</p>
                <button onClick={props.click}>Start quiz</button>
            </section>
        </>)
}