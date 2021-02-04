import { Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import FontPicker from "font-picker-react";

const Container = styled.div`
    position: absolute;
    top: -50px;
`;

interface FontAttributes {
    activeFontFamily: any;
    setActiveFont: Dispatch<SetStateAction<any>>;
    apiKey: string
}



export default function FontsPicker({ activeFontFamily, setActiveFont, apiKey }: FontAttributes) {
    //Add This Lines   
    //const [activeFont, setActiveFont] = useState("Open Sans");
    //const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    //Add class apply-font anywhere style needs to applied

    return (
        <Container>
            <FontPicker
                apiKey={apiKey}
                activeFontFamily={activeFontFamily}
                onChange={font => setActiveFont(font.family)}
            />
        </Container>
    );
}