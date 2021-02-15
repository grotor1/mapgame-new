import React from "react";
import {ProgressBarLine} from "react-progressbar-line";

export const Progress = (props) => {
    let red = props.votes.filter((item) => {
        return item.voteOwner === "red"
    }).length * 2;
    let blue = props.votes.filter((item) => {
        return item.voteOwner === "blue"
    }).length * 2;
    let black = props.votes.filter((item) => {
        return item.voteOwner === "black"
    }).length * 2;
    let yellow = props.votes.filter((item) => {
        return item.voteOwner === "yellow"
    }).length * 2;
    return (
        <div className="progress-background">
            <div className="progress">
                <div className="progress_state-name">Республиканцы</div>
                <div className="progress_state-votes"> {red} </div>
                <ProgressBarLine text=" " max={50} value={red} styles={{
                    path: {
                        stroke: '#FF0000'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">Демократы</div>
                <div className="progress_state-votes"> {blue} </div>
                <ProgressBarLine text=" " max={50} value={blue} styles={{
                    path: {
                        stroke: '#0000CC'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">Либертирианцы</div>
                <div className="progress_state-votes"> {yellow} </div>
                <ProgressBarLine text=" " max={50} value={yellow} styles={{
                    path: {
                        stroke: '#FFFF66'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">Анархисты</div>
                <div className="progress_state-votes"> {black} </div>
                <ProgressBarLine text=" " max={50} value={black} styles={{
                    path: {
                        stroke: '#333333'
                    }
                }}/>
            </div>
        </div>
    );
}