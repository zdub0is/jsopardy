"use client";

import * as React from "react";
import { GameboardContext, useGameboard, GameboardProvider } from "../providers";
import { Button, Input } from "@nextui-org/react";

export default function Scoreboard() {
    const { teamAScore, teamBScore, setTeamAScore, setTeamBScore } = useGameboard();
    const [inputValue, setInputValue] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [editingTeam, setEditingTeam] = React.useState('A');

    return (
        <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-col items-center gap-2 dark:bg-default-100/50 p-8 rounded-xl text-center border-2 dark:border-default-100/50" onClick={() => { setEditMode(true); setEditingTeam('A') }}>
                <h2 className="text-8xl font-bold">🍕</h2>
                {editMode && editingTeam === 'A' ? <section className="pt-4"><Input
                    type="number"
                    value={inputValue.toString()}
                    onValueChange={(value) => setInputValue(parseInt(value))}
                    className="pb-2"
                />
                    <Button onClick={() => {

                        setTeamAScore(inputValue);
                        setInputValue(0);
                        setEditMode(false);
                    }}>Save</Button></section>
                    :
                    <h3 className="text-5xl font-semibold pt-4">{teamAScore}</h3>
                }
            </div>
            <div className="flex flex-col items-center gap-2 dark:bg-default-100/50 p-8 rounded-xl text-center border-2 dark:border-default-100/50" onClick={() => { setEditMode(true); setEditingTeam('B') }}>
                <h2 className="text-8xl font-bold">🍜</h2>
                {editMode && editingTeam === 'B' ? <section className="pt-4"><Input
                    type="number"
                    value={inputValue.toString()}
                    onValueChange={(value) => setInputValue(parseInt(value))}
                    className="pb-2"
                />
                    <Button onClick={() => {

                        setTeamBScore(inputValue);

                        setEditMode(false);
                        setInputValue(0);
                    }}>Save</Button>
                </section>
                    :
                    <h3 className="text-5xl font-semibold pt-4">{teamBScore}</h3>
                }
            </div>
        </div>
    )
}