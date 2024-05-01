"use client";

import * as React from "react";
import { GameboardContext, useGameboard, GameboardProvider } from "../providers";

export default function Scoreboard() {
    const { teamAScore, teamBScore } = useGameboard();
    return (
        <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center gap-2 dark:bg-default-100/50 p-4 rounded-lg text-center">
                <h2 className="text-4xl font-bold">🍕</h2>
                <h3 className="text-2xl font-semibold">{teamAScore}</h3>
            </div>
            <div className="flex flex-col items-center gap-2 dark:bg-default-100/50 p-4 rounded-lg text-center">
                <h2 className="text-4xl font-bold">🍜</h2>
                <h3 className="text-2xl font-semibold">{teamBScore}</h3>
            </div>
        </div>
    )
}