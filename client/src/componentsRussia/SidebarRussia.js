import React, {useContext} from 'react'
import {ProgressRussia} from "./ProgressRussia";
import {ChangersRussia} from "./ChangersRussia";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import {TaskRussia} from "./TaskRussia";
import {AuthContext} from "../context/AuthContext";
import {TimerRussia} from "./TimerRussia";

const container = document.querySelector('container');
const ps = new PerfectScrollbar(container);

export const SidebarRussia = (props) => {
    const auth = useContext(AuthContext);
    return (
        <PerfectScrollbar options = {{suppressScrollX:true, wheelPropagation: false}}>
            <div>
                <ProgressRussia votes={props.states.map((item) => {
                    return {voteOwner: item.voteOwner}
                })}/>
                {auth.isAdmin && <ChangersRussia voteChanger={props.eventHandler2} resourceChanger={props.eventHandler3}/>}
                <TaskRussia states = {props.states} block={props.resourceDisplay}/>
                <TimerRussia/>
            </div>
        </PerfectScrollbar>
    );
}