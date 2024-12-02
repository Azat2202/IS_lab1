import {useState} from "react";
import Modal from "../../containers/Modal";
import {useGetStudyGroupsQuery} from "../../store/types.generated";

interface GetInformationByIdInterface {
    isModalOpen: boolean,
    closeModal: () => void
}

export function GetInformationById({isModalOpen, closeModal} : GetInformationByIdInterface) {
    const [selectedId, changeId] = useState(0);
    const {data, error} = useGetStudyGroupsQuery({id: selectedId});

    return <Modal isOpen={isModalOpen} onOk={() => {}} onClose={closeModal}>
        <label>
            Enter ID:
            <input
                type="number"
                value={selectedId}
                onChange={(e) => changeId(Number(e.target.value))}
                placeholder="Введите ID объекта для отображения"
            />
        </label>
        {}
        <button type="submit">Fetch</button>

    </Modal>
}