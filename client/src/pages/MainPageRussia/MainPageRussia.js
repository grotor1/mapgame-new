import React, {useContext, useEffect, useState} from 'react';
import {MapRussia} from '../../componentsRussia/MapRussia';
import "./MainPageRussia.css"
import {ProgressRussia} from "../../componentsRussia/ProgressRussia";
import {TaskRussia} from "../../componentsRussia/TaskRussia";
import {ResourcesDisplay} from "../../componentsRussia/ResourcesRussia";
import {ChangersRussia} from "../../componentsRussia/ChangersRussia";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {SidebarRussia} from "../../componentsRussia/SidebarRussia";

export const MainPageRussia = () => {
    const auth = useContext(AuthContext);
    const [resourceDisplay, setResourceDisplay] = useState("");
    const [states, setStates] = useState([
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Вашингтон",
            block: "block-1",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Калифорния",
            block: "block-2",
            task: "",
            resources: ""
        },
        {

            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Гаваи",
            block: "block-3",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Юта",
            block: "block-4",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Айдахо",
            block: "block-5",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Вайоминг",
            block: "block-6",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Нью Мехико",
            block: "block-7",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Канзас",
            block: "block-8",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Северная Дакота",
            block: "block-9",
            task: "Ф",
            resources: "Ф"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Небраска",
            block: "block-10",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Миннесота",
            block: "block-11",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Миссури",
            block: "block-12",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Арканзас",
            block: "block-13",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Миссиссиппи",
            block: "block-14",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Кентукки",
            block: "block-15",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Мичиган",
            block: "block-16",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Джорджия",
            block: "block-17",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Южная Каролина",
            block: "block-18",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Огайо",
            block: "block-19",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Вирджиния",
            block: "block-20",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Делавер",
            block: "block-21",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Пенсильвания",
            block: "block-22",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Мэн",
            block: "block-23",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Вермонт",
            block: "block-24",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Коннектикут",
            block: "block-25",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Коннектикут",
            block: "block-26",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Коннектикут",
            block: "block-27",
            task: "",
            resources: ""
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state: "Коннектикут",
            block: "block-28",
            task: "",
            resources: ""
        }
    ])
    const {loading, request} = useHttp()
    useEffect(() => {
        if (!auth.isAdmin) {
            const interval = setInterval(() => {
                const dataFromServer = async () => {
                    const {data} = await request(`api/states/russia/${auth._id_session}`, 'GET')
                    setStates(data)
                }
                dataFromServer()
            }, 2000);
            return () => clearInterval(interval);
        } else {
            const dataFromServer = async () => {
                const {data} = await request(`api/states/russia/${auth._id_session}`, 'GET')
                setStates(data)
            }
            dataFromServer()
        }
    }, [request, auth]);
    const changingStatesOnServer = async (vOwner, rOwner, blockId) => {
        const data = await request(`api/states/${auth._id_session}/${blockId}`, 'PUT', {
            vOwner,
            rOwner
        })
    };
    const eventHandler = (event, eventTarget) => {
        let block = eventTarget.classList[0];
        let blockStates = states.find((item) => {
            return item.block === block
        });
        if (event.button === 0) {
            setResourceDisplay(block);
        }
        if (auth.isAdmin) {
            if (event.button === 1) {
                if (blockStates.voteOwner === "grey") {
                    blockStates.voteOwner = "red";
                    blockStates.resourceOwner = "red";
                } else if (blockStates.voteOwner === "red") {
                    blockStates.voteOwner = "blue";
                    blockStates.resourceOwner = "blue";
                } else if (blockStates.voteOwner === "blue") {
                    blockStates.voteOwner = "yellow";
                    blockStates.resourceOwner = "yellow";
                } else if (blockStates.voteOwner === "yellow") {
                    blockStates.voteOwner = "black";
                    blockStates.resourceOwner = "black";
                } else if (blockStates.voteOwner === "black") {
                    blockStates.voteOwner = "grey";
                    blockStates.resourceOwner = "grey";
                }
                let newState = states;
                let index = parseInt(blockStates.block.slice(6)) - 1;
                newState[index] = blockStates;
                setStates([...newState]);
                changingStatesOnServer(blockStates.voteOwner, blockStates.resourceOwner, block);
            } else if (event.button === 4) {
                if ("grey" === blockStates.resourceOwner) {
                    blockStates.resourceOwner = "red";
                } else if (blockStates.resourceOwner === "red") {
                    blockStates.resourceOwner = "blue";
                } else if (blockStates.resourceOwner === "blue") {
                    blockStates.resourceOwner = "yellow";
                } else if (blockStates.resourceOwner === "yellow") {
                    blockStates.resourceOwner = "black";
                } else if (blockStates.resourceOwner === "black") {
                    blockStates.resourceOwner = "grey";
                }
                let newState = states;
                let index = parseInt(blockStates.block.slice(6)) - 1;
                newState[index] = blockStates;
                setStates([...newState])
                changingStatesOnServer(blockStates.voteOwner, blockStates.resourceOwner, block);
            }
        }
    }
    const eventHandler2 = () => {
        console.log(2)
        let blockStates = states.find((item) => {
            return item.block === resourceDisplay;
        });
        if (blockStates !== undefined) {
            if (blockStates.voteOwner === "grey") {
                blockStates.voteOwner = "red";
                blockStates.resourceOwner = "red";
            } else if (blockStates.voteOwner === "red") {
                blockStates.voteOwner = "blue";
                blockStates.resourceOwner = "blue";
            } else if (blockStates.voteOwner === "blue") {
                blockStates.voteOwner = "yellow";
                blockStates.resourceOwner = "yellow";
            } else if (blockStates.voteOwner === "yellow") {
                blockStates.voteOwner = "black";
                blockStates.resourceOwner = "black";
            } else if (blockStates.voteOwner === "black") {
                blockStates.voteOwner = "grey";
                blockStates.resourceOwner = "grey";
            }
            let newState = states;
            let index = parseInt(blockStates.block.slice(6)) - 1;
            newState[index] = blockStates;
            setStates([...newState]);
            changingStatesOnServer(blockStates.voteOwner, blockStates.resourceOwner, resourceDisplay);
        }
    }
    const eventHandler3 = () => {
        console.log(3)
        let blockStates = states.find((item) => {
            return item.block === resourceDisplay;
        });
        if (blockStates !== undefined) {
            if ("grey" === blockStates.resourceOwner) {
                blockStates.resourceOwner = "red";
            } else if (blockStates.resourceOwner === "red") {
                blockStates.resourceOwner = "blue";
            } else if (blockStates.resourceOwner === "blue") {
                blockStates.resourceOwner = "yellow";
            } else if (blockStates.resourceOwner === "yellow") {
                blockStates.resourceOwner = "black";
            } else if (blockStates.resourceOwner === "black") {
                blockStates.resourceOwner = "grey";
            }
            let newState = states;
            let index = parseInt(blockStates.block.slice(6)) - 1;
            newState[index] = blockStates;
            setStates([...newState]);
            changingStatesOnServer(blockStates.voteOwner, blockStates.resourceOwner, resourceDisplay);

        }
    }
    const middleClick = (event, eventTarget, blockId) => {
        if (auth.isAdmin) {
            console.log("ok")
            let blockStates = states.find((item) => {
                return item.block === blockId;
            });
            blockStates.resourceOwner = "grey"
            let newState = states;
            let index = parseInt(blockStates.block.slice(6)) - 1;
            newState[index] = blockStates;
            setStates([...newState]);
            changingStatesOnServer(blockStates.voteOwner, blockStates.resourceOwner, resourceDisplay);
        }
    }
    return (
        <div>
            <div className="map">
                <MapRussia currentTap={resourceDisplay} votes={states.map((item) => {
                    return {voteOwner: item.voteOwner, block: item.block}
                })} eventReturn={eventHandler}/>
                <SidebarRussia eventHandler2={eventHandler2} eventHandler3={eventHandler3} states={states} resourceDisplay={resourceDisplay}/>
            </div>
            <div className="resources">
                <ResourcesDisplay teamName="Коммунисты" teamColor="red"
                                  votes={states.map((item) => {
                                      return {
                                          resourceOwner: item.resourceOwner,
                                          resources: item.resources,
                                          block: item.block
                                      }
                                  })}
                                  delete={middleClick}
                />
                <ResourcesDisplay teamName="Либералы" teamColor="blue"
                                  votes={states.map((item) => {
                                      return {
                                          resourceOwner: item.resourceOwner,
                                          resources: item.resources,
                                          block: item.block
                                      }
                                  })}
                                  delete={middleClick}
                />
                <ResourcesDisplay teamName="Частники" teamColor="yellow"
                                  votes={states.map((item) => {
                                      return {
                                          resourceOwner: item.resourceOwner,
                                          resources: item.resources,
                                          block: item.block
                                      }
                                  })}
                                  delete={middleClick}
                />
                <ResourcesDisplay teamName="Опг" teamColor="black"
                                  votes={states.map((item) => {
                                      return {
                                          resourceOwner: item.resourceOwner,
                                          resources: item.resources,
                                          block: item.block
                                      }
                                  })}
                                  delete={middleClick}
                />
            </div>
        </div>
    );
}

