import React from "react";
import {ProgressBarLine} from "react-progressbar-line";

export const ProgressRussia = (props) => {
    let red = props.votes.filter((item) => {
        return item.voteOwner === "red"
    }).length;
    let blue = props.votes.filter((item) => {
        return item.voteOwner === "blue"
    }).length;
    let black = props.votes.filter((item) => {
        return item.voteOwner === "black"
    }).length ;
    let yellow = props.votes.filter((item) => {
        return item.voteOwner === "yellow"
    }).length;
    return (
        <div className="progress-background">
            <div className="progress">
                <div className="progress_state-name">Коммунисты</div>
                <div className="progress_state-votes"> {red} </div>
                <ProgressBarLine text=" " max={28} value={red} styles={{
                    path: {
                        stroke: '#FF0000'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">Либералы</div>
                <div className="progress_state-votes"> {blue} </div>
                <ProgressBarLine text=" " max={28} value={blue} styles={{
                    path: {
                        stroke: '#0000CC'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">Частники</div>
                <div className="progress_state-votes"> {yellow} </div>
                <ProgressBarLine text=" " max={28} value={yellow} styles={{
                    path: {
                        stroke: '#FFFF66'
                    }
                }}/>
            </div>
            <div className="progress">
                <div className="progress_state-name">ОПГ</div>
                <div className="progress_state-votes"> {black} </div>
                <ProgressBarLine text=" " max={28} value={black} styles={{
                    path: {
                        stroke: '#333333'
                    }
                }}/>
            </div>
        </div>
    );
}