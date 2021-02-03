import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import FontPicker from "font-picker-react";

const Container = styled.div`
    
`;

interface FontAttributes {
    activeFontFamily: any;
    setActiveFont: Dispatch<SetStateAction<any>>;
    apiKey: string
}



export default function FontsPicker({ activeFontFamily, setActiveFont, apiKey }: FontAttributes) {
    //Add This Line     
    //const [activeFont, setActiveFont] = useState("Open Sans");
    //Add class apply-font anywhere style needs to applied

    return (
        <Container>
            <FontPicker
                apiKey={apiKey}
                activeFontFamily={activeFontFamily}
                onChange={font => setActiveFont(font.family)}
            />
            <p className="apply-font">The font will be applied to this text.</p>
        </Container>
    );
}