"use client";
import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useGameboard } from "../providers";



export default function CardModal() {
    const { isOpen, onClose, selectedQuestion } = useGameboard();
    return (
        <Modal open={isOpen} onClose={onClose} >
            <ModalContent>
                {(onClose) => (<>
                <ModalBody>
                    <h1>{selectedQuestion ? selectedQuestion.text : ""}</h1>
                </ModalBody>
                </>
                )}
            </ModalContent>
        </Modal>
    );
};


