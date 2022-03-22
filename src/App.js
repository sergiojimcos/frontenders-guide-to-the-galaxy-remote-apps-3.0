import  ReactDOM  from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, {ClayInput} from '@clayui/form';
import ClayLabel from '@clayui/label';
import ClayLayout from "@clayui/layout";
import { ClayRadioGroup, ClayRadio } from "@clayui/form";

import './App.css';
import "@clayui/css/lib/css/atlas.css";

const spritemap = "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";

const {Liferay, themeDisplay} = window;

const CUSTOM_EVENT_RECORD_APP = 'customEventRecordApp';


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [valueAnswer, setValueAnswer] = useState('');
  const [showStartingForm, setShowStartingForm] = useState(true)  
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [showVisibleForm, setShowVisibleForm] = useState(false);
  const [namePlayer, setNamePlayer] = useState("");
  const [toastItems, setToastItems] = useState([]);

  const inputRef = useRef();

  const handleAnswerOptionClick = (correctAnswer) => {
    if (isCorrect(correctAnswer)){
			setScore(score + 10);
      Liferay.fire(CUSTOM_EVENT_RECORD_APP, {namePlayer, score: score + 10});
		
    } else {
      Liferay.fire(CUSTOM_EVENT_RECORD_APP, {namePlayer, score: score});
    
    }
    const nextQuestion = currentQuestion + 1;
    
    if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(nextQuestion);
		} else {
      setShowVisibleForm(false);
      setShowScoreForm(true);
    }

    setValueAnswer('');
    setShowHint(false);

	};

  function handleHint () {
    setShowHint(true);
    setScore(score - 5);
  }

  function isCorrect (correctAnswer) {
    if (correctAnswer ===  valueAnswer.slice(-1)) {
      return true;
    }

    return false;
  }
  
  
  useEffect(() => {
    Liferay.Util.fetch("/o/c/drivinglicenses")
    .then((response) => response.json())
    .then(({items}) => {
      if (questions.length === 0) {
        setQuestions(items);
        
      }
    });
  },[]);

  return (
    <div className="App">
      {showStartingForm &&(
        <div className='initial-state'>
          <div className="typewriter">
            <h1>WELCOME TO SPACESHIP DRIVING LESSON</h1>
          </div>

          <div className='input-form'>
            <ClayForm.Group small>
                
                <ClayInput
                  id="basicInputText"
                  placeholder="Insert your name here"
                  type="text"
                  ref={inputRef}
                />
            </ClayForm.Group>
          </div>
          
          <ClayButton
            className="starting-button"
            disabled={questions.length === 0}
            spritemap={spritemap}
            onClick={() => {
              if (inputRef.current.value === ""){
                setShowVisibleForm(false);
                setToastItems([...toastItems, Math.random() * 100])
              } else {
                setShowVisibleForm(true);
                setShowStartingForm(false)
                setNamePlayer(inputRef.current.value);
              }
                
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

      {showVisibleForm && (
        <div className='card-container'> 
          <ClayLayout.ContainerFluid>
            <ClayLayout.Row justify="center">
                <ClayCard>
                  <ClayCard.Body>
                    <ClayCard.Description displayType="title" style={{fontSize: 20, marginBottom:20}}>
                        {questions[currentQuestion].question}
                    </ClayCard.Description>
                    
                    <ClayCard.Description truncate={false} displayType="text" >
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
                      <ClayButton onClick={() => handleAnswerOptionClick(questions[currentQuestion].correctAnswer.name)}>{"Finish"}</ClayButton>
                    )}

                    <ClayButton className='ml-2' displayType='secondary' onClick={handleHint}>{"Hint"}</ClayButton>
                    
                    {showHint && (
                      <ClayCard.Caption>
                        <ClayLabel displayType="success" style={{fontSize:12, marginTop: 20}}>{questions[currentQuestion].hint}</ClayLabel>
                      </ClayCard.Caption>
                    )}
                    
                    
                  </ClayCard.Body>
                </ClayCard>
            </ClayLayout.Row>
          </ClayLayout.ContainerFluid>
        </div>
          )}

      {showScoreForm && (
       <div className='initial-state'>
        <div className="typewriter">
          <h1>CONGRATS! YOUR QUIZ HAS BEEN SENT</h1>
          
        </div>
        
        </div>
      )}

      <ClayAlert.ToastContainer>
        {toastItems.map(value => (
          <ClayAlert
            autoClose={5000}
            displayType="danger"
            key={value}
            onClose={() => {
              setToastItems(prevItems =>
                prevItems.filter(item => item !== value)
              );
            }}
            spritemap={spritemap}
            title={"Error:"}
          >Please, insert a valid name</ClayAlert>
        ))}
      </ClayAlert.ToastContainer>
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
