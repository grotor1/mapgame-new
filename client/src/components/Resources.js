import React from 'react';
import {teamsResources} from "./db";

export const ResourcesDisplay = (props) => {
    let teamName = props.teamName;
    let states = props.votes.filter((item) => {
        return item.resourceOwner === props.teamColor;
    })
    return (
        <div className="resourcesDisplay_background">
            <div className="resourcesDisplay_state-name">{teamName}</div>
            <div className="resourcesDisplay_graphsResources">
            </div>
            {teamsResources[props.teamColor].map((item) => (
                <div>
                    <div className="resourcesDisplay_resources resourcesDisplay_resources_infinite">
                        {item}
                    </div>
                </div>
            ))}
            {states.map((item) =>
                <div>
                    <div className="resourcesDisplay_resources">
                        {item.resources}
                    </div>
                </div>
            )}
        </div>
    );
}