import React from 'react';

interface ModalProps {
    setModalShown: any;
}

const Modal = (props: ModalProps) => {
    const { setModalShown } = props;

    const onClose = () => {
        setModalShown(false);
    }
    return (
        <div className="bg-black absolute h-screen w-screen text-white">
            <button className="p-4 text-lg">
                X Close
            </button>
            
        </div>
    );
}

export default Modal;