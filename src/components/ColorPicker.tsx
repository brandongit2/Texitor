import { useState } from "react";
import styled from "styled-components";
import { SketchPicker } from 'react-color';

const Container = styled.div`
    
`;

export default function ColorPicker() {
    const [colors, setColor] = useState("#fff");


    return (
        <Container>
            <SketchPicker
                color={colors}
                onChangeComplete={color => setColor(color.hex)}
            />
        </Container>
    );
}