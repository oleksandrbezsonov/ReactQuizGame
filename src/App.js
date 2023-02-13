import './index.scss';
import React from 'react';

const questions = [
  {
    title: 'React - це ... ?',
    variants: ['бібліотека', 'фреймворк', 'криптовалюта'],
    correct: 0,
  },
  {
    title: 'Компонент - це ... ',
    variants: ['застосунок', 'частина застосунку або веб-сторінки', 'хімічний елемент'],
    correct: 1,
  },
  {
    title: 'Що таке JSX?',
    variants: [
      'Це простий HTML',
      'Це функція',
      'Це той самий HTML, але з можливістю виконувати JS-код',
    ],
    correct: 2,
  },
];

function Result({correct , onReset}) {

  const handleReset = () => {
    onReset(0)
  }

  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/9281/9281540.png" />
      <h2>Ви відгадали {correct} відповідей з {questions.length}</h2>
      <button onClick={handleReset}>Спробувати знову</button>
    </div>
  );
}

function Game({step, question, onClickVariant}) {

  const progress = Math.round((step / questions.length) * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: `${progress}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
        question.variants.map((text, index) => (
            <li onClick={() => onClickVariant(index)} key={text}>
              {text}
            </li>
          ))}
      </ul>
    </>
  );
}

function App() {

  const [step, setStep] = React.useState(0)
  const [correct, setCorrect] = React.useState(0)
  const question = questions[step]
  const onClickVariant = (index) => {
    setStep(step + 1)

    if(index === question.correct){
      setCorrect(correct + 1)
    }
  }

  function handleReset(newValue) {
    setStep(newValue)
    setCorrect(newValue)
  }

  return (
    <div className="App">
      {(()=>{
        if (step !== questions.length) {
          return <Game step={step} question={question} onClickVariant={onClickVariant}/>
        } else {
          return <Result correct={correct} onReset={handleReset}/>
        }})()
      }
    </div>
  );
}

export default App;
