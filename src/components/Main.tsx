import { useState } from "react";

import { Article } from "@/types/Article";
import { FetchData } from "@/types/FetchData";

import Header from "./Header";
import ArticlePreview from "./ArticlePreview";

import axios from 'axios';
import { BackgroundImage } from "@/types/Image";

import UpArrow from "../assets/uparrow.svg";
import DownArrow from "../assets/downarrow.svg";
import LeftArrow from "../assets/leftarrow.svg";
import RightArrow from "../assets/rightarrow.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { GlobalHotKeys } from "react-hotkeys";

import "./Main.css"
import ImageContainer from "./ImageContainer";

export enum SwipeDirection
{
    LEFT = "left",
    LEFT_UP = "left up",
    UP = "up",
    RIGHT_UP = "right up",
    RIGHT = "right",
    RIGHT_DOWN = "right down",
    DOWN = "down",
    LEFT_DOWN = "left down",
    UNKNOWN = "error"
}

const keyMap = {
    [SwipeDirection.LEFT]: "ArrowLeft",
    [SwipeDirection.RIGHT]: "ArrowRight",
    [SwipeDirection.DOWN]: "ArrowDown",
    [SwipeDirection.UP]: "ArrowUp"
};

interface Props
{
    articleData:FetchData<Article>,
    onSetAutoscroll: (scroll:boolean) => void,
    autoScroll: boolean,
    addToHistory: (id:number) => void,
    onSwipe: (dir:SwipeDirection) => void,
    setupTimer: () => void,
    backgroundImageData: FetchData<BackgroundImage>
}

function Main({articleData, autoScroll, backgroundImageData, onSetAutoscroll, addToHistory, onSwipe, setupTimer}:Props)
{
    const navigation = useNavigate();
    const [audioOn, setAudioOn] = useState<Boolean>(true);
    const backgroundImage:string = `${axios.defaults.baseURL}${backgroundImageData.read().url}`;
    const article:Article = articleData.read();

    console.log(backgroundImage);

    if(article === null || !article.category) {
        onSwipe(SwipeDirection.UP);
        navigation("/view");
        return;
    }

    addToHistory(article.id);
    
    const onSetAudio = (on:boolean)=>
    {
        setAudioOn(on);
    }

    const goToDetail = ()=>
    {
        navigation({pathname: "/details", search: createSearchParams({id: article.id.toString()}).toString()});
    }

    const keyHandler = {
        [SwipeDirection.LEFT]: () => onSwipe(SwipeDirection.LEFT),
        [SwipeDirection.RIGHT]: () => onSwipe(SwipeDirection.RIGHT),
        [SwipeDirection.DOWN]: () => onSwipe(SwipeDirection.DOWN),
        [SwipeDirection.UP]: () => onSwipe(SwipeDirection.UP),
    };

    return (
        <GlobalHotKeys handlers={keyHandler} keyMap={keyMap} allowChanges={true}>
            <ImageContainer style={{ display: "flex", flexDirection: "column" }} backgroundImage={backgroundImage} onClick={goToDetail} >
                <Header toggleAudio={onSetAudio} audio={audioOn} toggleAutoScroll={onSetAutoscroll} autoScroll={autoScroll} article={article} setupTimer={setupTimer}/>
                <div className="arrow-box">
                    <img src={UpArrow} onClick={e => { onSwipe(SwipeDirection.UP); e.stopPropagation(); } }/>
                </div>
                <div className="arrow-box content">
                    <img src={LeftArrow} onClick={e => { onSwipe(SwipeDirection.LEFT); e.stopPropagation(); }}/>
                    <div style={{ width: "100%" }}>
                        <ArticlePreview article={article} />
                    </div>
                    <img src={RightArrow} onClick={e => { onSwipe(SwipeDirection.RIGHT); e.stopPropagation(); }}/>
                </div>
                <div className="arrow-box">
                    <img src={DownArrow} onClick={e => { onSwipe(SwipeDirection.DOWN); e.stopPropagation(); }}/>
                </div>
            </ImageContainer>
        </GlobalHotKeys>
    );
}

export default Main;