import React, {useContext, useEffect, useState} from 'react';
import {Map} from '../../components/Map';
import "./MainPage.css"
import {Progress} from "../../components/Progress";
import {Task} from "../../components/Task";
import {ResourcesDisplay} from "../../components/Resources";
import {Changers} from "../../components/Changers";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export const MainPage = () => {
    const auth = useContext(AuthContext);
    const [resourceDisplay, setResourceDisplay] = useState("");
    const [states, setStates] = useState([
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Вашингтон",
            state2: "Орегон",
            block: "block-1",
            task: "Локализовать производство акцизных товаров",
            resources: "Запасы леса"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Калифорния",
            state2: "Невада",
            block: "block-2",
            task: "Локализация производства процессоров",
            resources: "Современные технологии в области информационной безопасности"
        },
        {

            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Гаваи",
            state2: "Аляска",
            block: "block-3",
            task: "Улучшить сообщение с материковой частью",
            resources: "Полезные ископаемые"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Юта",
            state2: "Аризона",
            block: "block-4",
            task: "Проблемы с системой водоснабжения",
            resources: "Технологии крионики фирмы Alcor"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Айдахо",
            state2: "Монтана",
            block: "block-5",
            task: "Восстановить историю штата",
            resources: "Технологии сельского хозяйства и лесодобычи"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Вайоминг",
            state2: "Колорадо",
            block: "block-6",
            task: "Уменьшить загрязнение атмосферы",
            resources: "Залежи природного топлива"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Нью Мехико",
            state2: "Техас",
            block: "block-7",
            task: "Избавиться от мексиканских мигрантов",
            resources: "Хорошо вооруженное народное ополчение"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Канзас",
            state2: "Оклахома",
            block: "block-8",
            task: "Решить проблемы с электроэнергией",
            resources: "Меры по борьбе с климатическими бедствиям"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Северная Дакота",
            state2: "Южная Дакота",
            block: "block-9",
            task: "Увеличить размер национальных парков",
            resources: "Способы привлечения туристов"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Небраска",
            state2: "Айова",
            block: "block-10",
            task: "Решить проблему сообщения между населенными пунктами",
            resources: "Технологии альтернативных источников энергии"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Миннесота",
            state2: "Висконсин",
            block: "block-11",
            task: "Подавить погромы в Миннеаполисе",
            resources: "Технологии мореплавания"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Миссури",
            state2: "Иллиноис",
            block: "block-12",
            task: "Поднять экономику штата",
            resources: "Технологии ядерной энергетики"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Арканзас",
            state2: "Луизиана",
            block: "block-13",
            task: "Восстановление штата после наводнения",
            resources: "Технологии борьбы с наркокартелями"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Миссиссиппи",
            state2: "Алабама",
            block: "block-14",
            task: "Избавиться от угрозы выхода Миссисипи из ее берегов",
            resources: "Запасы пресной воды"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Кентукки",
            state2: "Теннесси",
            block: "block-15",
            task: "Восстановить систему образования",
            resources: "Часть золотого запаса США"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Мичиган",
            state2: "Индиана",
            block: "block-16",
            task: "Восстановить систему здравоохранения",
            resources: "Машиностроительные технологи"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Джорджия",
            state2: "Флорида",
            block: "block-17",
            task: "Уменьшить уровень не организованной преступности",
            resources: "Способы либерализации ВУЗов"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Южная Каролина",
            state2: "Северная Каролина",
            block: "block-18",
            task: "Облегчить морские перевозки с предприятий штат",
            resources: "Технологии производства хлопка"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Огайо",
            state2: "Западная Вирджиния",
            block: "block-19",
            task: "Локализовать сельское хозяйство",
            resources: "Знания о культуре индейцев"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Вирджиния",
            state2: "Мерилэнд",
            block: "block-20",
            task: "Улучшение кибер-защиты министерства обороны США",
            resources: "Технологии производства табака"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Делавер",
            state2: "Нью Джерси",
            block: "block-21",
            task: "Увеличить поток туристов",
            resources: "Технологии промышленного и военного мореходства"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Пенсильвания",
            state2: "Нью-Йорк",
            block: "block-22",
            task: "Перейти на “зеленую” энергетику",
            resources: "Законопроекты по организации жизни представителей различных этносов"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Мэн",
            state2: "Нью Хемпшир",
            block: "block-23",
            task: "Очистить часть территории штатов от лесов",
            resources: "Запасы леса"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Вермонт",
            state2: "Массачусец",
            block: "block-24",
            task: "Решить проблему с наплывом эмигрантов из Нью-Йорка",
            resources: "Законопроекты  о свободной продаже оружия"
        },
        {
            resourceOwner: "grey",
            voteOwner: "grey",
            state1: "Коннектикут",
            state2: "Род Айленд",
            block: "block-25",
            task: "Увеличить расовое разнообразие в системе образования",
            resources: "Технологии высшего образования"
        }
    ])
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        if (!auth.isAdmin) {
            const interval = setInterval(() => {
                const dataFromServer = async () => {
                    const {data} = await request(`api/states/${auth._id_session}`, 'GET')
                    setStates(data)
                }
                dataFromServer()
            }, 2000);
            return () => clearInterval(interval);
        } else {
            const dataFromServer = async () => {
                const {data} = await request(`api/states/${auth._id_session}`, 'GET')
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
    return (
        <div>
            <div className="map">
                <Map currentTap={resourceDisplay} votes={states.map((item) => {
                    return {voteOwner: item.voteOwner, block: item.block}
                })} eventReturn={eventHandler}/>
                <Progress votes={states.map((item) => {
                    return {voteOwner: item.voteOwner}
                })}/>
                {auth.isAdmin && <Changers voteChanger={eventHandler2} resourceChanger={eventHandler3}/>}
                <Task states={states} block={resourceDisplay}/>
            </div>
            <div className="resources">
                <ResourcesDisplay teamName="Республиканцы" teamColor="red"
                                  votes={states.map((item) => {
                                      return {resourceOwner: item.resourceOwner, resources: item.resources}
                                  })}/>
                <ResourcesDisplay teamName="Демократы" teamColor="blue"
                                  votes={states.map((item) => {
                                      return {resourceOwner: item.resourceOwner, resources: item.resources}
                                  })}/>
                <ResourcesDisplay teamName="Либертирианцы" teamColor="yellow"
                                  votes={states.map((item) => {
                                      return {resourceOwner: item.resourceOwner, resources: item.resources}
                                  })}/>
                <ResourcesDisplay teamName="Анархисты" teamColor="black"
                                  votes={states.map((item) => {
                                      return {resourceOwner: item.resourceOwner, resources: item.resources}
                                  })}/>
            </div>
        </div>
    );
}

