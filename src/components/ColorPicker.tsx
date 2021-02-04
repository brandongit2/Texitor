import { Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import { SketchPicker } from 'react-color';

const Container = styled.div`
    position: absolute;
    top: -215px; 
    right: 0px;
`;

interface ColorAttributes {
    color: any;
    setColor: Dispatch<SetStateAction<any>>;
}

export default function ColorPicker({color, setColor}: ColorAttributes) {
    //Add line const [color, setColor] = useState("#FFF");
    return (
        <Container>
            <SketchPicker
                color={color}
                onChangeComplete={newcolor => setColor(newcolor.hex)}
            />
        </Container>
    );
}