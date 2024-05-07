import React, { useState } from "react";
import { Tile } from "./tile";
// add context to the gameboard
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Button, useDisclosure, Input, CheckboxGroup, select, Checkbox } from "@nextui-org/react";
import Markdown from "react-markdown";
import { GameboardContext, useGameboard, GameboardProvider } from "../providers";
import Scoreboard from "./scoreboard";
import { useRouter } from "next/navigation";

interface Question {
    id: number;
    text: string;
    answer: string;
    points: string;
}

const probabilities = {
    100: 0,
    200: 0,
    300: 0.35,
    400: 0.55,
    500: 0.25,
    600: 0.15
}

export default function Gameboard() {
    const { questions, teamAScore, teamBScore, setTeamAScore, setTeamBScore, selectedTiles, handleTilePress, selectedQuestion, selectedCategories, categoriesToLoad } = useGameboard();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [question, setQuestion] = useState<Question>({ id: 0, text: '', answer: '', points: '0' });
    const [front, setFront] = useState(true);
    const [isDJOpen, setIsDJOpen] = useState(false)
    const [teamAWager, setTeamAWager] = useState(0)
    const [teamBWager, setTeamBWager] = useState(0)
    const [doubleJeopardies, setDoubleJeopardies] = useState<string[]>([])
    const [doubleJCats, setDoubleJCats] = useState<string[]>([])
    const [isDoubleJeopardy, setIsDoubleJeopardy] = useState(false)
    const [selectedBoxes, setSelectedBoxes] = useState<string[]>([])
    const router = useRouter();
    const handleTile = async (id: number) => {
        console.log(id, doubleJeopardies, doubleJCats)
        handleTilePress(id);
        let questionsArr = questions.reduce((accum: any, curr: Question[]) => [...curr, ...accum], [])
        setQuestion(questionsArr.find((q: Question) => q.id === id));
        setFront(true);
        // check if the id is in doubleJeopardies
        if (doubleJeopardies.includes(id.toString())) {
            setIsDoubleJeopardy(true);
            setIsDJOpen(true);
        }
        onOpen();
    }

    const handleScore = (teamA: boolean, lose: boolean = false) => {
        console.log(teamA, lose, teamAWager, teamBWager, question.points)
        if (teamA) {
            setTeamAScore(teamAScore + (teamAWager !== 0 ? lose ? (teamAWager * -1) : teamAWager : parseInt(question.points)));
            setTeamAWager(0);
        } else {
            setTeamBScore(teamBScore + (teamBWager !== 0 ? lose ? (teamBWager * -1) : teamBWager : parseInt(question.points)));
            setTeamBWager(0);
        }
        setFront(true);
        setIsDoubleJeopardy(false);
        setIsDJOpen(false);
        onClose();
    }

    const determineClass = (text: string) => {
        if (text.startsWith('Regex:')) {
            return 'regex';
        } else if (text.startsWith('`')) {
            return 'code';
        } else {
            return '';
        }
    }

    const handleWager = (value: string, teamA: boolean) => {
        if (teamA) {
            setTeamAWager(parseInt(value));
        } else {
            setTeamBWager(parseInt(value));
        }
    }

    const handleWagerCompletion = () => {
        // if selectedBoxes is 2, then both teams have won
        console.log(selectedBoxes, teamAWager, teamBWager)
        if (selectedBoxes.length === 2) {
            console.log('both')
            handleScore(true);
            handleScore(false);
        }
        // if selectedBoxes is 1, then only one team has won
        else if (selectedBoxes.length === 1) {
            console.log('one', selectedBoxes)
            if (selectedBoxes.includes('Team A')) {
                handleScore(true);
                handleScore(false, true);
            } else {
                handleScore(false);
                handleScore(true, true);
            }
        }
        // if selectedBoxes is 0, then both teams have lost
        else {
            console.log('none')
            handleScore(true, true);
            handleScore(false, true);
        }
    }
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-1 py-6 md:py-6">
                <>

                    <div className="grid grid-cols-6 gap-4 text-center items-center">
                        {categoriesToLoad.map((category: any) => {
                            return (
                            <h2 key={category} className="text-3xl font-bold">{category}</h2>
                        )})}
                        {questions.map((questionSet: any, index: number) => {
                            return (
                                <div className="flex flex-col items-center gap-4" key={index}>
                                    {questionSet.map((question: any) => {
                                        // check if double jeopardy length is 2 and if the category index is in doubleJCats
                                        if (doubleJeopardies.length !== 2 && !doubleJCats.includes(index.toString())) {
                                            // get probability of double jeopardy based on point value
                                            //@ts-ignore
                                            let probability = probabilities[question.points];
                                            // generate a random number
                                            let random = Math.random();
                                            // if the random number is less than the probability, add to double jeopardy
                                            if (random < probability) {
                                                setDoubleJeopardies([...doubleJeopardies, question.id]);
                                                setDoubleJCats([...doubleJCats, index.toString()]);
                                            }
                                        }
                                        return (<Tile key={question.id} point={question.points} id={question.id} active={!selectedTiles.includes(question.id)} handleTilePress={handleTile} />)
                                    })}
                                </div>
                            )
                        })}

                    </div>

                </>
            </section>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={isDJOpen ? "5xl" : "full"}>
                <ModalContent>
                    {(onClose) => (<>{
                        isDJOpen ? <ModalContent>
                            <ModalBody className="text-8xl font-bold text-center py-10 leading-relaxed">
                            <h1 className="text-7xl mb-32">Daily Double!</h1>
                            <Scoreboard />
                            <div className="flex flex-row gap-4">
                                <Input
                                    type="number"
                                    label="Team A Wager"
                                    value={teamAWager.toString()}
                                    onValueChange={(value) => handleWager(value, true)}
                                    labelPlacement="inside"
                                    className="w-1/2"
                                />
                                <Input
                                    type="number"
                                    label="Team B Wager"
                                    value={teamBWager.toString()}
                                    onValueChange={(value) => handleWager(value, false)}
                                    labelPlacement="inside"
                                    className="w-1/2"
                                />
                            </div>
                        </ModalBody>
                            <ModalFooter className="flex justify-center text-4xl">
                                <Button className="text-2xl py-8 px-4" color="primary" variant="shadow" onClick={() => setIsDJOpen(false)}>Show Text</Button>
                            </ModalFooter></ModalContent> : <>
                            <ModalBody className="text-8xl font-bold text-center py-10 leading-relaxed">

                                <div id="modal-text" className={front ? determineClass(question.text) : determineClass(question.answer)}>
                                    {front ? <Markdown className="line-break">{question.text}</Markdown> : <Markdown className="line-break">{question.answer}</Markdown>}</div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center text-4xl">
                                {front ? <Button className="text-2xl py-8 px-4" variant="flat" onClick={() => setFront(false)}>Show Answer</Button> :
                                    isDoubleJeopardy ? <div className="flex gap-4">
                                        {/* need to get a way to say which team bet and if they won or lost */}
                                        <CheckboxGroup label="Select Winners" value={selectedBoxes} onChange={(value) => setSelectedBoxes(value)} orientation="horizontal" className="flex gap-4">
                                            <Checkbox value="Team A">Team A</Checkbox>
                                            <Checkbox value="Team B">Team B</Checkbox>
                                        </CheckboxGroup>
                                        <Button className="text-2xl py-8 px-4" color="primary" variant="shadow" onClick={() => handleWagerCompletion()}>Close</Button>

                                    </div> :
                                        <div className="flex gap-4">
                                            <Button className="text-2xl py-8 px-4" color="primary" variant="shadow" onClick={() => handleScore(true)}>Team A</Button>
                                            <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => { onClose(); setFront(true); }}>Close</Button>
                                            <Button className="text-2xl py-8 px-4" color="secondary" variant="shadow" onClick={() => handleScore(false)}>Team B</Button>
                                        </div>}
                            </ModalFooter>
                        </>
                    }</>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


