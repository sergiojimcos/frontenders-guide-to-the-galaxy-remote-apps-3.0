import  ReactDOM  from 'react-dom';
import { useState } from 'react';
import Form from './components/Form';
import './App.css';
import ClayButton from '@clayui/button';
import "@clayui/css/lib/css/atlas.css";


const spritemap = "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";

// const {Liferay, themeDisplay} = window;


function App() {
  
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleStart, setVisibleStart] = useState(true);
  // const [siteGroupId, setSiteGroupId] = useState();

  /* const getSiteGroupId = () => {
    setSiteGroupId(themeDisplay && themeDisplay.getSiteGroupId());
  }; */
  
  function setForm () {
    setVisibleStart(false);
    setVisibleForm(true);
  }

  /* useEffect(() => {
		getSiteGroupId(siteGroupId);
    
	}); */ 

  return (
    <div className="App">

      {visibleStart &&(
        <div className='initial-state'>
          

          <div className="typewriter">
            <h1>WELCOME TO SPACESHIP DRIVING LESSON</h1>
          </div>
          
          <ClayButton className='starting-button' spritemap={spritemap} onClick={setForm}>
            Let's Start
          </ClayButton>
            
          
          
        </div>
      )}
      

      {visibleForm && (
        
          <Form> </Form>
        
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
