import { Dispatch, SetStateAction } from "react";
import Picker from "font-picker-react";

interface FontAttributes {
    activeFontFamily: any;
    setActiveFont: Dispatch<SetStateAction<any>>;
    apiKey: string;
}

export default function FontPicker({
    activeFontFamily,
    setActiveFont,
    apiKey,
}: FontAttributes) {
    //Add This Lines
    //const [activeFont, setActiveFont] = useState("Open Sans");
    //const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    //Add class apply-font anywhere style needs to applied

    return (
        <Picker
            apiKey={apiKey}
            activeFontFamily={activeFontFamily}
            onChange={(font) => setActiveFont(font.family)}
        />
    );
}
