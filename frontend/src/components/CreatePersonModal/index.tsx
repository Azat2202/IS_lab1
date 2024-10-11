import { PersonRequest, useCreatePersonMutation, useGetAllCoordinatesQuery } from "../../store/types.generated";
import { useState } from "react";
import Modal from "../../containers/Modal";

export function CreatePersonModal({ isModalOpen, closeModal }: { isModalOpen: boolean; closeModal: () => void; }) {
    const [createPerson, { isLoading, isSuccess, isError, data, error }] = useCreatePersonMutation();

    const { data: coordinates, refetch: refetchCoordinates } = ();
    const [formData, setFormData] = useState<PersonRequest>({
        name: "darya",
        eyeColor: "BLACK",
        locationId: 0,
        weight: 0,
        hairColor: "BLACK",
        nationality: "FRANCE"
    });

    const handleOk = async () => {
        await createPerson({ personRequest: formData }).unwrap();
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "locationId" || name === "weight" ? Number(value) : value,
        });
    };

    return (
        <Modal isOpen={isModalOpen} onOk={handleOk} onClose={handleCancel}>
            <div className="space-y-2 bg-white m-2 p-4">
                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Eye Color</label>
                    <select
                        name="eyeColor"
                        value={formData.eyeColor}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    >
                        <option value="RED">Red</option>
                        <option value="BLACK">Black</option>
                        <option value="BLUE">Blue</option>
                        <option value="BROWN">Brown</option>
                    </select>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Hair Color</label>
                    <select
                        name="hairColor"
                        value={formData.hairColor || ""}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    >
                        <option value="RED">Red</option>
                        <option value="BLACK">Black</option>
                        <option value="BLUE">Blue</option>
                        <option value="BROWN">Brown</option>
                    </select>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Location ID</label>
                    <input
                        type="number"
                        name="locationId"
                        value={formData.locationId}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Weight</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label className="w-1/3 font-medium text-gray-700">Nationality</label>
                    <select
                        name="nationality"
                        value={formData.nationality || ""}
                        onChange={handleChange}
                        className="flex-grow p-2 border border-black"
                    >
                        <option value="FRANCE">France</option>
                        <option value="SPAIN">Spain</option>
                        <option value="SOUTH_KOREA">South Korea</option>
                        <option value="JAPAN">Japan</option>
                    </select>
                </div>
            </div>
        </Modal>
    );
}