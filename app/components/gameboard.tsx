import React, { useState } from "react";
import { Tile } from "./tile";
// add context to the gameboard
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Markdown from "react-markdown";
import { GameboardContext, useGameboard, GameboardProvider } from "../providers";



export default function Gameboard() {
    const { questions, teamAScore, teamBScore, setTeamAScore, setTeamBScore, selectedTiles, handleTilePress, selectedQuestion } = useGameboard();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [question, setQuestion] = useState(null);
    const [front, setFront] = useState(true);

    console.log(question)
    const handleTile = async (id: number) => {
        handleTilePress(id);
        let questionsArr = questions.reduce((accum, curr) => [...curr.questions, ...accum], [])
        console.log(questionsArr)
        setQuestion(questionsArr.find((q) => q.id === id));
        setFront(true);
        onOpen();
    }

    const handleScore = (teamA: boolean) => {
        if (teamA) {
            setTeamAScore(teamAScore + question.point);
        } else {
            setTeamBScore(teamBScore + question.point);
        }
        setFront(true);
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


    const ModalBodyCustom = () => {
        return (
            <>
                <ModalBody className="text-8xl font-bold text-center py-10 leading-relaxed">
                    <div  id="modal-text" className={front ? determineClass(question.text) : determineClass(question.answer)}>
                    {front ? <Markdown className="line-break">{question.text}</Markdown> : <Markdown className="line-break">{question.answer}</Markdown>}</div>
                </ModalBody>
                <ModalFooter className="flex justify-center text-4xl">
                    {front ? <Button className="text-2xl py-8 px-4" variant="flat" onClick={() => setFront(false)}>Show Answer</Button> :
                        <div className="flex gap-4">
                            <Button className="text-2xl py-8 px-4" color="primary" variant="shadow" onClick={() => handleScore(true)}>Team A</Button>
                            <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => { onClose(); setFront(true); }}>Close</Button>
                            <Button className="text-2xl py-8 px-4" color="secondary" variant="shadow" onClick={() => handleScore(false)}>Team B</Button>
                        </div>}
                </ModalFooter>
            </>
        )
    }

    const WriteGameboard = () => {
        const categories = questions.map((category: any) => category.category);
        const categoryQuestions = questions.map((category: any) => category.questions);
        // need to accomodate for longer category names
        return (
            <>
                <div className="grid grid-cols-6 gap-4 text-center items-center">
                    {categories.map((category: any) => (
                        <h2 key={category} className="text-3xl font-bold">{category}</h2>
                    ))}

                    {categoryQuestions.map((questions: any, index: number) => (
                        <div className="flex flex-col items-center gap-4" key={index}>
                            {questions.map((question: any) => (
                                <Tile key={question.id} point={question.point} id={question.id} active={!selectedTiles.includes(question.id)} handleTilePress={handleTile} />
                            ))}
                        </div>
                    ))}

                </div>

            </>
        )
    }
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-4 py-6 md:py-6">
                {<WriteGameboard />}
            </section>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
                <ModalContent>
                    {(onClose) => (<ModalBodyCustom />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


