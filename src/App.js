import  ReactDOM  from 'react-dom';
import { useState } from 'react';
import './App.css';
import ClayButton from '@clayui/button';
import ClayLayout from "@clayui/layout";
import { ClayRadioGroup, ClayRadio } from "@clayui/form";
import ClayCard from "@clayui/card";
import ClayLabel from '@clayui/label'

import "@clayui/css/lib/css/atlas.css";

const spritemap = "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";

const {Liferay, themeDisplay} = window;

const questionArray = []


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [valueAnswer, setValueAnswer] = useState('');
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const [visibleForm, setVisibleForm] = useState(false);

  const handleAnswerOptionClick = (correctAnswer) => {
    if (correctAnswer === valueAnswer.slice(-1)){
			setScore(score + 10);
		}

    setValueAnswer('');
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion <= questionArray[0].length) {
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
  
  function setQuestions () {
    Liferay.Util.fetch("/o/c/drivinglicenses")
      .then((response) => response.json())
      .then(({items}) => {
        if (questionArray.length === 0) questionArray.push(items);
        setVisibleForm(true);  
      });
  }

  return (
    <div className="App">
      {!visibleForm &&(
        <div className='initial-state'>
          <div className="typewriter">
            <h1>WELCOME TO SPACESHIP DRIVING LESSON</h1>
          </div>
          
          <ClayButton className='starting-button' spritemap={spritemap} onClick={setQuestions}>
            Let's Start
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
                        {questionArray[0][currentQuestion].question}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                    <ClayRadioGroup onSelectedValueChange={val => setValueAnswer(val)} selectedValue={valueAnswer}>

                      <ClayRadio label={questionArray[0][currentQuestion].optionA} value="A" />
			                <ClayRadio label={questionArray[0][currentQuestion].optionB} value="B" />
			                <ClayRadio label={questionArray[0][currentQuestion].optionC} value="C" />
                    
                    </ClayRadioGroup>
                    </ClayCard.Description>
                    {currentQuestion < questionArray[0].length - 1 && (
                      <ClayButton onClick={() => handleAnswerOptionClick(questionArray[0][currentQuestion].correctAnswer.name)}>{"Next"}</ClayButton>
                    )}
                    {currentQuestion === questionArray[0].length - 1 && (
                      <ClayButton>{"Finish"}</ClayButton>
                    )}
                    <ClayButton className='ml-2' displayType='secondary' onClick={handleHint}>{"Hint"}</ClayButton>
                    {showHint && (
                      <ClayCard.Caption>
                        <ClayLabel displayType="success">{questionArray[0][currentQuestion].hint}</ClayLabel>
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
