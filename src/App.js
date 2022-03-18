import  ReactDOM  from 'react-dom';
import { useEffect, useState } from 'react';
import './App.css';
import ClayButton from '@clayui/button';
import ClayLayout from "@clayui/layout";
import { ClayRadioGroup, ClayRadio } from "@clayui/form";
import ClayCard from "@clayui/card";
import ClayLabel from '@clayui/label'

import "@clayui/css/lib/css/atlas.css";

const spritemap = "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";

const {Liferay, themeDisplay} = window;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
	const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [valueAnswer, setValueAnswer] = useState('');  
  const [visibleForm, setVisibleForm] = useState(false);

  const handleAnswerOptionClick = (correctAnswer) => {
    if (correctAnswer === valueAnswer.slice(-1)){
			setScore(score + 10);
		}

    setValueAnswer('');
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion <= questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);

		}

    setShowHint(false);
	};

  function handleHint () {
    setShowHint(true);
    setScore(score - 5);
  }
  
  useEffect(() => {
    Liferay.Util.fetch("/o/c/drivinglicenses")
    .then((response) => response.json())
    .then(({items}) => {
      if (questions.length === 0) {
        setQuestions(items);
        
      }
    });
  }, []);

  return (
    <div className="App">
      {!visibleForm &&(
        <div className='initial-state'>
          <div className="typewriter">
            <h1>WELCOME TO SPACESHIP DRIVING LESSON</h1>
          </div>
          
          <ClayButton
            className="starting-button"
            disabled={questions.length === 0}
            spritemap={spritemap}
            onClick={() => {
              setVisibleForm(true);
            }}>
              {questions.length === 0 ?
              (
                <>Loading...</>
              ):
              (
                <>Let's Start</>
              )
            }
          </ClayButton>
        </div>
      )}

      {visibleForm && (
        <div className='card-container'> 
          <ClayLayout.ContainerFluid>
            <ClayLayout.Row justify="center">
                <ClayCard>
                  <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {questions[currentQuestion].question}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                    <ClayRadioGroup onSelectedValueChange={val => setValueAnswer(val)} selectedValue={valueAnswer}>

                      <ClayRadio label={questions[currentQuestion].optionA} value="A" />
			                <ClayRadio label={questions[currentQuestion].optionB} value="B" />
			                <ClayRadio label={questions[currentQuestion].optionC} value="C" />
                    
                    </ClayRadioGroup>
                    </ClayCard.Description>
                    {currentQuestion < questions.length - 1 && (
                      <ClayButton onClick={() => handleAnswerOptionClick(questions[currentQuestion].correctAnswer.name)}>{"Next"}</ClayButton>
                    )}
                    {currentQuestion === questions.length - 1 && (
                      <ClayButton>{"Finish"}</ClayButton>
                    )}
                    <ClayButton className='ml-2' displayType='secondary' onClick={handleHint}>{"Hint"}</ClayButton>
                    {showHint && (
                      <ClayCard.Caption>
                        <ClayLabel displayType="success">{questions[currentQuestion].hint}</ClayLabel>
                      </ClayCard.Caption>
                    )}
                    
                    
                  </ClayCard.Body>
                </ClayCard>
            </ClayLayout.Row>
          </ClayLayout.ContainerFluid>
        </div>
          )}
    </div>
  );
}

class DrivingLicense extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '<div id="drivingLicense"></div>';

    ReactDOM.render(
			<App />,
			document.querySelector('#drivingLicense')
		);
	}
}

if (customElements.get('driving-license')) {
	console.log(
		'Skipping registration for <driving-license> (already registered)'
	);
} else {
	customElements.define('driving-license', DrivingLicense);
}

export default App;
