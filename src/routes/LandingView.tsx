import stylex from "@stylexjs/stylex";
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "@/types/Image";
import { useEffect, useState } from "react";

const styles = stylex.create({
    mainContainer:{
        backgroundImage: "url('http://localhost/api/images/intro/Trum1p yelling cropped.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100dvh",
        width: "100dvw",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "minmax(min-content, .1fr) auto minmax(min-content, .1fr)",
        gridTemplateColumns: ".1fr .8fr .1fr"
     },
    content:{
        gridColumnStart: "2",
        display: "grid",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: ".4fr .4fr .2fr",
        rowGap: "2rem",
        textAlign: "center",
        fontSize: "1.5em",
        color: "white"
    },
    rowFull: {
        gridColumnStart: "1",
        gridColumnEnd: "4",
    }
});

function LandingView()
{
    const navigator = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=intro").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`url('${axios.defaults.baseURL}${res.data.url}')`)
        );
    }, [])

    const onToMainView = ()=>
    {
        navigator("/view");
    }

    return(<div {...stylex.props(styles.mainContainer)} style={{backgroundImage}} onClick={onToMainView}>
        <div {...stylex.props(styles.rowFull)}>
            {/* <MobileNavHint><IconArrowBigUp>Swipe Up for Next Headline</IconArrowBigUp></MobileNavHint> */}
        </div>
        {/* <MobileNavHint><IconArrowBigLeft>Swipe Left for Loser and Lies</IconArrowBigLeft></MobileNavHint> */}
        <div {...stylex.props(styles.content)}>
            <p>Explore all the reasons why Donald Trump and his allies are the wrong choice for the USA and for you in 2024.</p>
            <p>Support a better canidate for 2024 and ask your ploiticians to get back to work</p>
            <p>Click or Tap to continue</p>
        </div>
        {/* <MobileNavHint><IconArrowBigRight>Swipe Right for rudeness & wrong</IconArrowBigRight></MobileNavHint> */}
        <div {...stylex.props(styles.rowFull)}>
        {/* <MobileNavHint><IconArrowBigDown>Swipe down to go back</IconArrowBigDown></MobileNavHint> */}
        </div>
    </div>);
}

export default LandingView;