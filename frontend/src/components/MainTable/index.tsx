import {useDispatch, useSelector} from "react-redux";
import {UpdateStudyGroupRequest, useAuthenticateMutation, useGetAllStudyGroupsQuery} from "../../store/types.generated";
import React, {useState} from "react";
import {CreateStudyGroupModal} from "../CreateStudyGroupModal";
import {CreateCoordinatesModal} from "../CreateCoordinatesModal";
import {GetInformationById} from "../GetInformationById";
import {RootState} from "../../store/store";
import toast from "react-hot-toast";
import {UpdateStudyGroupModal} from "../UpdateStudyGroupModal";


export function MainTable() {
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: string } | null>(null);
    const [isStudyGroupModalOpen, setIsStudyGroupModalOpen] = useState(false);
    const [isUpdateStudyGroupModalOpen, setIsUpdateStudyGroupModalOpen] = useState(false);
    const [isGetInformationModalOpen, setIsGetInformationModalOpen] = useState(false);
    const [isModal, setModal] = useState<boolean>(false);
    const userLogin = useSelector((state: RootState) => state.auth.login);
    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
    const {data, error, isLoading, isSuccess, isError, refetch: refetchCollection} = useGetAllStudyGroupsQuery({
        page
    });
    const [updateGroup, setUpdateGroup] = useState<UpdateStudyGroupRequest>({
        id: data?.content?.[0].id ?? 0,
        name: data?.content?.[0].name ?? "",
        coordinatesId: data?.content?.[0]?.coordinates?.id ?? 0,
        studentsCount: data?.content?.[0].studentsCount ?? 0,
        expelledStudents: data?.content?.[0].expelledStudents ?? 0,
        transferredStudents: data?.content?.[0].transferredStudents ?? 0,
        formOfEducation: data?.content?.[0].formOfEducation ?? "FULL_TIME_EDUCATION",
        semester: data?.content?.[0].semesterEnum ?? "FIRST",
        shouldBeExpelled: data?.content?.[0].shouldBeExpelled,
        groupAdminId: data?.content?.[0]?.groupAdmin?.id ?? 0,
    });
    if (isLoading) {
        return <div>Loading...</div>;

    }
    if (isError) {
        return <div>Error</div>;
    }


    if (isSuccess && data) {
        return (
            <div className="pl-10 p-4">
                <h1 className="text-3xl font-bold">Введение</h1>
                <ul className="list-disc">
                    <li>Основное назначение информационной системы - управление объектами, созданными на основе
                        заданного в варианте класса.
                    </li>
                    <li>Необходимо, чтобы с помощью системы можно было выполнить следующие операции с объектами:
                        <button onClick={() => setIsStudyGroupModalOpen(true)}
                                className="underline text-blue-800"> создание нового объекта</button>,
                        получение информации об объекте по ИД,
                        обновление объекта
                        (модификация его атрибутов), удаление
                        объекта. Операции должны осуществляться в отдельных окнах (интерфейсах) приложения.При получении
                        информации
                        об объекте класса должна также выводиться информация о связанных с ним объектах.
                    </li>
                    <li>На главном экране системы должен выводиться список текущих объетов в виде таблицы (каждый
                        атрибут объекта
                        - отдельная колонка в таблице). При отображении таблицы должна использоваться пагинация (если
                        все объекты не
                        помещаются на одном экране).
                    </li>
                    <li>Нужно обеспечить возможность фильтровать/сортировать строки таблицы, которые показывают объекты
                        (по
                        значениям любой из строковых колонок). Фильтрация элементов должна производиться по неполному
                        совпадению.
                    </li>
                    <li>Переход к обновлению (модификации) объекта должен быть возможен из таблицы с общим списком
                        объектов и из
                        области с визуализацией объекта (при ее реализации).
                    </li>
                </ul>
                <table className="table-auto border-collapse border-2 border-black m-2">
                    <thead className="text-center">
                    <tr>
                        <th className="border border-black p-2">Id</th>
                        <th className="border border-black p-2">Имя</th>
                        <th className="border border-black p-2">Координаты</th>
                        <th className="border border-black p-2">Дата</th>
                        <th className="border border-black p-2">Количество студентов</th>
                        <th className="border border-black p-2">Отчисленные</th>
                        <th className="border border-black p-2">Переведенные</th>
                        <th className="border border-black p-2">Форма обучения</th>
                        <th className="border border-black p-2">На отчисление</th>
                        <th className="border border-black p-2">Семестр</th>
                        <th className="border border-black p-2">Админ</th>
                        <th className="border border-black p-2">Владелец объекта</th>
                        <th className="border border-black p-2">Обновить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.content?.map((group, index) => (
                        <tr key={group.id}>
                            <td className="border border-black p-1 text-center">{group.id}</td>
                            <td className="border border-black p-1 text-center">{group.name}</td>
                            <td className="border border-black p-1 text-center">{
                                group.coordinates ? `(${group.coordinates.x}, ${group.coordinates.y})` : 'N/A'}</td>
                            <td className="border border-black p-1 text-center">{
                                group.creationDate ? new Date(group.creationDate).toDateString() : 'N/A'}</td>
                            <td className="border border-black p-1 text-center">{group.studentsCount}</td>
                            <td className="border border-black p-1 text-center">{group.expelledStudents}</td>
                            <td className="border border-black p-1 text-center">{group.transferredStudents}</td>
                            <td className="border border-black p-1 text-center">{group.formOfEducation}</td>
                            <td className="border border-black p-1 text-center">{group.shouldBeExpelled}</td>
                            <td className="border border-black p-1 text-center">{group.semesterEnum}</td>
                            <td className="border border-black p-1 text-center relative"
                                onMouseEnter={() => setHoveredCell({row: index, col: 'id'})}
                                onMouseLeave={() => setHoveredCell(null)}
                            >
                                {group.groupAdmin?.name}
                                {hoveredCell?.row === index && (
                                    <div
                                        className="absolute flex flex-col left-0 top-full w-40 mt-1 p-2 bg-white border border-black rounded shadow-lg z-10">
                                        <div> id: {group?.groupAdmin?.id} </div>
                                        <div> Имя: {group?.groupAdmin?.name} </div>
                                        <div> Цвет волос: {group?.groupAdmin?.hairColor} </div>
                                        <div> Цвет глаз: {group?.groupAdmin?.eyeColor}</div>
                                        <div> Локация: {group?.groupAdmin?.location
                                            ? `(${group.groupAdmin.location.x};${group.groupAdmin.location.y};${group.groupAdmin.location.z})`
                                            : 'N/A'} </div>
                                        <div> Национальность: {group?.groupAdmin?.nationality}</div>
                                        <div> Вес: {group?.groupAdmin?.weight}</div>
                                    </div>
                                )}
                            </td>
                            <td className="border border-black p-1 text-center">{group.user ? group.user.username : 'N/A'}</td>
                            <td className="border border-black p-1 text-center">{group.user?.username == userLogin ?
                                <button onClick={() => {
                                    setUpdateGroup({
                                        id: group.id!!,
                                        name: group.name ?? "",
                                        coordinatesId: group.coordinates?.id ?? 0,
                                        studentsCount: group.studentsCount ?? 0,
                                        expelledStudents: group.expelledStudents ?? 0,
                                        transferredStudents: group.transferredStudents ?? 0,
                                        formOfEducation: group.formOfEducation ?? "FULL_TIME_EDUCATION",
                                        semester: group.semesterEnum ?? "FIRST",
                                        shouldBeExpelled: group.shouldBeExpelled,
                                        groupAdminId: group.groupAdmin?.id,
                                    })
                                    setIsUpdateStudyGroupModalOpen(true)
                                }} className="underline text-blue-800">Обновить</button> :
                                ""} </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <button onClick={() => setPage(page - 1)}
                                disabled={page <= 0}
                                className="m-1 p-1 w-6 border-2 font-bold border-black rounded transition hover:bg-gray-200"
                        >{"<"}</button>
                        <button onClick={() => setPage(page + 1)}
                                disabled={page >= (data?.totalPages ? data?.totalPages : 0) - 1}
                                className="m-1 p-1 w-6 border-2 font-bold border-black rounded transition hover:bg-gray-200"
                        >{">"}</button>
                    </tr>
                    </tfoot>
                </table>
                <CreateStudyGroupModal
                    closeModal={() => {
                        setIsStudyGroupModalOpen(false);
                        refetchCollection();
                    }}
                    isModalOpen={isStudyGroupModalOpen}
                    isEditable={false}
                />
                {isUpdateStudyGroupModalOpen && <UpdateStudyGroupModal
                    group={updateGroup}
                    closeModal={() => {
                        setIsUpdateStudyGroupModalOpen(false);
                        refetchCollection();
                    }}
                    isModalOpen={isUpdateStudyGroupModalOpen}
                    isEditable={false}
                />}

                <GetInformationById
                    isModalOpen={isGetInformationModalOpen}
                    closeModal={() => {
                    }}
                />
            </div>
        );
    }

    return null;
}