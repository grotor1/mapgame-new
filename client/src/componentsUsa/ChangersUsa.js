import React from "react";

export const ChangersUsa = (props) => {
    return (
        <div className="changers-background" >
            <div className="changers_change-button" onClick={props.voteChanger}>
                <div className="changers_button-text">
                    Смена голоса
                </div>
            </div>
            <div className="changers_change-button" onClick={props.resourceChanger}>
                <div className="changers_button-text">
                    Смена ресурса
                </div>
            </div>
        </div>
    )
}