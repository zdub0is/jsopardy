"use client";

/**
 * This page is for creating a new game of Jeopardy. It will allow the user to select a set of categories and questions to use for the game. 
 * The user will be able to select the number of teams and the names of the teams.
 */

import { GameboardProvider, useGameboard } from "../providers";
import { Button, Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";


export default function Create() {
    const { categoriesArr, selectedCategories, setSelectedCategories, startGame } = useGameboard();
    return (
        <>
            <h1 className="text-4xl font-bold text-center pt-6">Create a New Game</h1>
            <section className="flex flex-row items-center justify-between gap-4 pt-6 md:pt-6">
                <Listbox
                    onChange={(value) => setSelectedCategories(value)}
                    selectionMode="multiple"
                    selectedKeys={selectedCategories}
                    onSelectionChange={setSelectedCategories}
                    className="w-1/2"
                >
                    <ListboxSection title="Categories">
                        {categoriesArr.map((category: string) => (
                            <ListboxItem key={category} value={category}>
                                {category}
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                </Listbox>
                <p className="text-2xl">Select the categories you would like to use for the game.</p>
                <p className="text-2xl">Selected Categories: {selectedCategories.join(', ')}</p>
                <Button className="text-2xl py-8 px-4" variant="shadow" color="success" onClick={startGame} disabled={categories.length === 6}>Start Game</Button>
            </section>
        </>
    );
}