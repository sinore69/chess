import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import TimeControl from './TimeControl';
import PiecesCaptures from './PiecesCaptures';
import GameButtons from './GameButtons';

function Essentials(props: {
    time: number;
    isGameOver: boolean;
    isRunning: boolean;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
    loserColor: MutableRefObject<"b" | "w" | "">;
    color: string;
    reason: MutableRefObject<string>;
    gameControl: boolean;
    resignedBy: "" | "w" | "b"
    confirmResignation: boolean
}) {
    return (
        <div className="w-full flex items-center justify-between relative px-1 h-10">
            {
                props.gameControl ? <GameButtons confirmResignation={props.confirmResignation}/> : <></>
            }
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <TimeControl
                    time={props.time}
                    isGameOver={props.isGameOver}
                    isRunning={props.isRunning}
                    setIsGameOver={props.setIsGameOver}
                    loserColor={props.loserColor}
                    color={props.color}
                    reason={props.reason}
                />
            </div>
            <div className="ml-auto h-10 w-30 sm:w-64">
                <PiecesCaptures />
            </div>
        </div>
    )
}

export default Essentials