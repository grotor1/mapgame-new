import React, {useContext} from 'react'
import {ProgressUsa} from "./ProgressUsa";
import {ChangersUsa} from "./ChangersUsa";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import {TaskUsa} from "./TaskUsa";
import {AuthContext} from "../context/AuthContext";
import {TimerUsa} from "./TimerUsa";

const container = document.querySelector('container');
const ps = new PerfectScrollbar(container);

export const SidebarUsa = (props) => {
    const auth = useContext(AuthContext);
    return (
        <PerfectScrollbar option = {{suppressScrollX:true, wheelPropagation: false}}>
            <div>
                <ProgressUsa votes={props.states.map((item) => {
                    return {voteOwner: item.voteOwner}
                })}/>
                {auth.isAdmin && <ChangersUsa voteChanger={props.eventHandler2} resourceChanger={props.eventHandler3}/>}
                <TaskUsa states={props.states} block={props.resourceDisplay}/>
                <TimerUsa/>
            </div>
        </PerfectScrollbar>
    );
}