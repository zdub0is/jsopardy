"use client";

import * as React from "react";
import { GameboardContext, useGameboard } from "../providers";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
// import fjJson from "@/data/fj-sample.json";

const fjJson = {
    category: "Sample Category",
    text: "This is the question",
    answer: "This is the answer"
}

type FinalJeopardyType = {
    category: string;
    text: string;
    answer: string;
}

export default function FinalJeopardy() {
    const { teamAScore, teamBScore, setWinner, finalJeopardy, finalJeopardies } = useGameboard();
    const [fj, setFj] = useState<FinalJeopardyType>(fjJson);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isWaiting, setIsWaiting] = useState(true);
    const [front, setFront] = React.useState(true);

    const handleWinner = (teamA: boolean) => {
        if (teamA) {
            setWinner(true);
        } else {
            setWinner(false);
        }
        setIsWaiting(true);
        onOpenChange();
    }
    
    useEffect(() => {
        // if finalJeopardy is null, then we need to set it to the first one
        if (finalJeopardy === null) {
            setFj(fjJson);
        } else {
            setFj(finalJeopardies[parseInt(finalJeopardy.anchorKey) - 1]);
        }
    }, [finalJeopardy])


    return (
        <>
        <Button className="text-2xl py-8 px-20 border-2 dark:border-default-100/50 dark:text-default-900/75" variant="ghost" onClick={onOpen} color="default">Open Final Jeopardy</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" className="text-4xl py-8 px-4">
            <ModalContent>
            {(onClose) => (
                <>
                {isWaiting ? <><ModalBody className="text-7xl font-thin text-center py-10 leading-relaxed"><h1 className="text-9xl mb-32">Final Jeopardy!</h1><p>The category is:</p><p><span className="font-black">{fj.category}</span></p></ModalBody>
            <ModalFooter>
                <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => setIsWaiting(false)}>Start</Button>
            </ModalFooter>
                </> :
            <>
            <ModalBody className="text-8xl font-bold text-center py-10 leading-relaxed">
                {front ? <h2>{fj.text}</h2> : <h2>{fj.answer}</h2>}
            </ModalBody>
            <ModalFooter>
                {front ? <>
                <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => setFront(!front)}>Show Answer</Button>
                </> : <>
                <Button className="text-2xl py-8 px-4" variant="shadow" color="primary" onClick={() => handleWinner(true)}>Team A</Button>
                <Button className="text-2xl py-8 px-4" variant="shadow" color="secondary" onClick={() => handleWinner(false)}>Team B</Button>
                </>}
            </ModalFooter>
            </>
}</>
            )}
            
            </ModalContent>
        </Modal>
        </>
    )
}