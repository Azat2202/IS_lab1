import React, { ReactNode } from 'react';

interface ModalInterface{
    isOpen: boolean,
    onClose: () => void,
    onOk: () => void
    children: ReactNode
}
const Modal = ({ isOpen, onClose, onOk, children }: ModalInterface) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                { children }
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 border border-black rounded hover:bg-gray-200"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className="px-4 py-2 border border-black bg-green-300 rounded hover:bg-green-500"
                        onClick={onOk}
                    >
                        Ок
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
