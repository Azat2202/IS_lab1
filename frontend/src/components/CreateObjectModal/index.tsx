import Modal from "../../containers/Modal";
import React, { useState } from "react";
import {
    StudyGroupRequest,
    useGetAllCoordinatesQuery,
    useGetAllPersonsQuery
} from "../../store/types.generated";
import { CreateCoordinatesModal } from "../CreateCoordinatesModal";
import { CreatePersonModal } from "../CreatePersonModal";

interface CreateObjectModalInput {
    isModalOpen: boolean,
    closeModal: () => void
}

export function CreateObjectModal({ isModalOpen, closeModal }: CreateObjectModalInput) {
    const [ isCoordinatesModalOpen, setIsCoordinatesModalOpen ] = useState(false);
    const [ isPersonModalOpen, setIsPersonModalOpen ] = useState(false);
    const [ formData, setFormData ] = useState<StudyGroupRequest>({
        name: "P3316",
        coordinatesId: 0,
        studentsCount: 16,
        expelledStudents: 5,
        transferredStudents: 2,
        formOfEducation: "FULL_TIME_EDUCATION",
        semester: "FIRST",
        shouldBeExpelled: 5,
        groupAdminId: 0,
        isEditable: false,
    });
    const { data: persons, refetch: refetchPersons } = useGetAllPersonsQuery();
    const { data: coordinates, refetch: refetchCoordinates } = useGetAllCoordinatesQuery();
    const handleOk = () => {
        console.log("OK Clicked");
        closeModal();
    };

    const handleCancel = () => {
        console.log("Cancel Clicked");
        closeModal();
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "studentsCount"
            || name === "expelledStudents"
            || name === "transferredStudents"
            || name === "coordinatesId"
            || name === "groupAdminId"
            || name === "shouldBeExpelled"
                ? Number(value)
                : value,
        });
    };
    return <Modal isOpen={ isModalOpen } onOk={ handleOk } onClose={ handleCancel }>
        <div className="space-y-2 bg-white">
            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Имя группы</label>
                <input
                    type="text"
                    name="name"
                    value={ formData.name }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black"
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Координаты</label>
                <select
                    name="Координаты"
                    value={ formData.coordinatesId }
                    onChange={ (e) =>
                        setFormData({
                            ...formData,
                            coordinatesId: e.target.value ? Number(e.target.value) : 1,
                        })
                    }
                    className="flex-grow p-2 border border-black max-w-20"
                >
                    {
                        coordinates?.length ? (
                            coordinates.map((coordinate, index) => (
                                <option key={ index } value={ coordinate.id || "DEFAULT_VALUE" }>
                                    { `(${ coordinate.x };${ coordinate.y })` || "Unnamed" }
                                </option>
                            ))
                        ) : (
                            <option disabled>No persons available</option>
                        )
                    }
                </select>
                <button className="flex-grow p-1 border border-black bg-blue-300"
                        onClick={ () => setIsPersonModalOpen(true) }>
                    Создать
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Количество студентов</label>
                <input
                    type="number"
                    name="studentsCount"
                    value={ formData.studentsCount }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Отчисленные студенты</label>
                <input
                    type="number"
                    name="expelledStudents"
                    value={ formData.expelledStudents }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Переведенные студенты</label>
                <input
                    type="number"
                    name="transferredStudents"
                    value={ formData.transferredStudents }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Форма обучения</label>
                <select
                    name="formOfEducation"
                    value={ formData.formOfEducation }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                >
                    <option value="DISTANCE_EDUCATION">Заочное обучение</option>
                    <option value="FULL_TIME_EDUCATION">Дневное обучение</option>
                    <option value="EVENING_CLASSES">Вечернее обучение</option>
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">На отчисление</label>
                <input
                    type="number"
                    name="shouldBeExpelled"
                    value={ formData.shouldBeExpelled || "" }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Семестр</label>
                <select
                    name="semester"
                    value={ formData.semester }
                    onChange={ handleChange }
                    className="flex-grow p-2 border border-black "
                >
                    <option value="FIRST">Первый</option>
                    <option value="SECOND">Второй</option>
                    <option value="SEVENTH">Седьмой</option>
                    <option value="EIGHTH">Восьмой</option>
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/3 font-medium text-gray-700">Админ</label>
                <select
                    name="Админ"
                    value={ formData.groupAdminId }
                    onChange={ (e) =>
                        setFormData({
                            ...formData,
                            groupAdminId: e.target.value ? Number(e.target.value) : undefined,
                        })
                    }
                    className="flex-grow p-2 border border-black max-w-20"
                >
                    {
                        persons?.length ? (
                            persons.map((person, index) => (
                                <option key={ index } value={ person.id || "DEFAULT_VALUE" }>
                                    { person.name || "Unnamed" }
                                </option>
                            ))
                        ) : (
                            <option disabled>No persons available</option>
                        )
                    }
                </select>
                <button className="flex-grow p-1 border border-black bg-blue-300"
                        onClick={ () => setIsPersonModalOpen(true) }>
                    Создать
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    name="isEditable"
                    checked={ formData.isEditable }
                    onChange={ () =>
                        setFormData({ ...formData, isEditable: !formData.isEditable })
                    }
                    className="mr-2"
                />
                <label className="font-medium text-gray-700">Можно изменять?</label>
            </div>
        </div>
        <CreateCoordinatesModal isModalOpen={ isCoordinatesModalOpen } closeModal={
            () => {
                setIsCoordinatesModalOpen(false);
                refetchCoordinates();
            }
        }/>
        <CreatePersonModal isModalOpen={ isPersonModalOpen }
                           closeModal={ () => {
                               setIsPersonModalOpen(false);
                               refetchPersons()
                           } }/>
    </Modal>

}