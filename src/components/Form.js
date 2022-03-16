import ClayCard from "@clayui/card";
import ClayLayout from "@clayui/layout";
import ClayButton from '@clayui/button';
import './Form.css'
import { ClayRadioGroup, ClayRadio } from "@clayui/form";


function Form () {
    return (
        <ClayLayout.ContainerFluid>
            <ClayLayout.Row justify="center">
                <ClayCard>
                    <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {"Some quick example text to build on the card title and make up the bulk of the card content."}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                    <ClayRadioGroup>
                            <ClayRadio label="One" value="one" />
			                <ClayRadio label="Two" value="two" />
			                <ClayRadio label="Three" value="three" />
                        </ClayRadioGroup>
                    </ClayCard.Description>
                    <ClayButton>{"Go somewhere"}</ClayButton>
                    </ClayCard.Body>
                </ClayCard>
            </ClayLayout.Row>

            <ClayLayout.Row justify="center">
                <ClayCard>
                    <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {"Some quick example text to build on the card title and make up the bulk of the card content."}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                        <ClayRadioGroup>
                            <ClayRadio label="One" value="one" />
			                <ClayRadio label="Two" value="two" />
			                <ClayRadio label="Three" value="three" />
                        </ClayRadioGroup>
                    </ClayCard.Description>
                    <ClayButton>{"Go somewhere"}</ClayButton>
                    </ClayCard.Body>
                </ClayCard>
            </ClayLayout.Row>

            <ClayLayout.Row justify="center">
                <ClayCard>
                    <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {"Some quick example text to build on the card title and make up the bulk of the card content."}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                    <ClayRadioGroup>
                            <ClayRadio label="One" value="one" />
			                <ClayRadio label="Two" value="two" />
			                <ClayRadio label="Three" value="three" />
                        </ClayRadioGroup>
                    </ClayCard.Description>
                    <ClayButton>{"Go somewhere"}</ClayButton>
                    </ClayCard.Body>
                </ClayCard>
            </ClayLayout.Row>

            <ClayButton>
                FINISH YOUR TEST
            </ClayButton>
            
        </ClayLayout.ContainerFluid>
    )
}

export default Form;