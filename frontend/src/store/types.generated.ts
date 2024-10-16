import { api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    expelEverybody: build.mutation<
      ExpelEverybodyApiResponse,
      ExpelEverybodyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/command/expel_everybody`,
        method: "PUT",
        params: { groupId: queryArg.groupId },
      }),
    }),
    getAllStudyGroups: build.query<
      GetAllStudyGroupsApiResponse,
      GetAllStudyGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/studyGroup`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sortBy: queryArg.sortBy,
          sortDirection: queryArg.sortDirection,
          groupName: queryArg.groupName,
          adminName: queryArg.adminName,
        },
      }),
    }),
    updateStudyGroup: build.mutation<
      UpdateStudyGroupApiResponse,
      UpdateStudyGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/studyGroup`,
        method: "PUT",
        body: queryArg.updateStudyGroupRequest,
      }),
    }),
    createStudyGroup: build.mutation<
      CreateStudyGroupApiResponse,
      CreateStudyGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/studyGroup`,
        method: "POST",
        body: queryArg.studyGroupRequest,
      }),
    }),
    approveAdminProposal: build.mutation<
      ApproveAdminProposalApiResponse,
      ApproveAdminProposalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/proposal/${queryArg.userId}`,
        method: "PUT",
      }),
    }),
    becomeAdmin: build.mutation<BecomeAdminApiResponse, BecomeAdminApiArg>({
      query: () => ({ url: `/api/user/proposal`, method: "POST" }),
    }),
    getAllPersons: build.query<GetAllPersonsApiResponse, GetAllPersonsApiArg>({
      query: () => ({ url: `/api/collection/person` }),
    }),
    createPerson: build.mutation<CreatePersonApiResponse, CreatePersonApiArg>({
      query: (queryArg) => ({
        url: `/api/collection/person`,
        method: "POST",
        body: queryArg.personRequest,
      }),
    }),
    getAllPersons1: build.query<
      GetAllPersons1ApiResponse,
      GetAllPersons1ApiArg
    >({
      query: () => ({ url: `/api/collection/location` }),
    }),
    createPerson1: build.mutation<
      CreatePerson1ApiResponse,
      CreatePerson1ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/location`,
        method: "POST",
        body: queryArg.locationRequest,
      }),
    }),
    getAllCoordinates: build.query<
      GetAllCoordinatesApiResponse,
      GetAllCoordinatesApiArg
    >({
      query: () => ({ url: `/api/collection/coordinates` }),
    }),
    createCoordinates: build.mutation<
      CreateCoordinatesApiResponse,
      CreateCoordinatesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/coordinates`,
        method: "POST",
        body: queryArg.coordinatesRequest,
      }),
    }),
    register: build.mutation<RegisterApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: queryArg.registerUserDto,
      }),
    }),
    authenticate: build.mutation<AuthenticateApiResponse, AuthenticateApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: queryArg.jwtDto,
      }),
    }),
    me: build.query<MeApiResponse, MeApiArg>({
      query: () => ({ url: `/api/user/me` }),
    }),
    minGroupAdmin: build.query<MinGroupAdminApiResponse, MinGroupAdminApiArg>({
      query: () => ({ url: `/api/command/min_group_admin` }),
    }),
    minGroupAdmin1: build.query<
      MinGroupAdmin1ApiResponse,
      MinGroupAdmin1ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/command/count_group_admin`,
        params: { groupAdminId: queryArg.groupAdminId },
      }),
    }),
    getExpelledCount: build.query<
      GetExpelledCountApiResponse,
      GetExpelledCountApiArg
    >({
      query: () => ({ url: `/api/command/count_expelled` }),
    }),
    getStudyGroups: build.query<
      GetStudyGroupsApiResponse,
      GetStudyGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/studyGroup/${queryArg.id}`,
      }),
    }),
    deleteStudyGroup: build.mutation<
      DeleteStudyGroupApiResponse,
      DeleteStudyGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/collection/studyGroup/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getAdminProposals: build.query<
      GetAdminProposalsApiResponse,
      GetAdminProposalsApiArg
    >({
      query: () => ({ url: `/api/admin/proposal` }),
    }),
    deleteByExpelled: build.mutation<
      DeleteByExpelledApiResponse,
      DeleteByExpelledApiArg
    >({
      query: (queryArg) => ({
        url: `/api/command/delete_by_expelled`,
        method: "DELETE",
        params: { expelled: queryArg.expelled },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as studyGroupApi };
export type ExpelEverybodyApiResponse = /** status 200 OK */ StudyGroupResponse;
export type ExpelEverybodyApiArg = {
  groupId: number;
};
export type GetAllStudyGroupsApiResponse =
  /** status 200 OK */ PageStudyGroupResponse;
export type GetAllStudyGroupsApiArg = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  groupName?: string;
  adminName?: string;
};
export type UpdateStudyGroupApiResponse =
  /** status 200 OK */ StudyGroupResponse;
export type UpdateStudyGroupApiArg = {
  updateStudyGroupRequest: UpdateStudyGroupRequest;
};
export type CreateStudyGroupApiResponse =
  /** status 200 OK */ StudyGroupResponse;
export type CreateStudyGroupApiArg = {
  studyGroupRequest: StudyGroupRequest;
};
export type ApproveAdminProposalApiResponse = /** status 200 OK */ UserResponse;
export type ApproveAdminProposalApiArg = {
  userId: number;
};
export type BecomeAdminApiResponse = /** status 200 OK */ AdminProposalResponse;
export type BecomeAdminApiArg = void;
export type GetAllPersonsApiResponse = /** status 200 OK */ PersonResponse[];
export type GetAllPersonsApiArg = void;
export type CreatePersonApiResponse = /** status 200 OK */ PersonResponse;
export type CreatePersonApiArg = {
  personRequest: PersonRequest;
};
export type GetAllPersons1ApiResponse = /** status 200 OK */ LocationResponse[];
export type GetAllPersons1ApiArg = void;
export type CreatePerson1ApiResponse = /** status 200 OK */ LocationResponse;
export type CreatePerson1ApiArg = {
  locationRequest: LocationRequest;
};
export type GetAllCoordinatesApiResponse =
  /** status 200 OK */ CoordinatesResponse[];
export type GetAllCoordinatesApiArg = void;
export type CreateCoordinatesApiResponse =
  /** status 200 OK */ CoordinatesResponse;
export type CreateCoordinatesApiArg = {
  coordinatesRequest: CoordinatesRequest;
};
export type RegisterApiResponse = /** status 200 OK */ UserResponse;
export type RegisterApiArg = {
  registerUserDto: RegisterUserDto;
};
export type AuthenticateApiResponse = /** status 200 OK */ JwtResponse;
export type AuthenticateApiArg = {
  jwtDto: JwtDto;
};
export type MeApiResponse = /** status 200 OK */ UserResponse;
export type MeApiArg = void;
export type MinGroupAdminApiResponse = /** status 200 OK */ StudyGroupResponse;
export type MinGroupAdminApiArg = void;
export type MinGroupAdmin1ApiResponse = /** status 200 OK */ number;
export type MinGroupAdmin1ApiArg = {
  groupAdminId: number;
};
export type GetExpelledCountApiResponse = /** status 200 OK */ number;
export type GetExpelledCountApiArg = void;
export type GetStudyGroupsApiResponse = /** status 200 OK */ StudyGroupResponse;
export type GetStudyGroupsApiArg = {
  id: number;
};
export type DeleteStudyGroupApiResponse =
  /** status 200 OK */ StudyGroupResponse;
export type DeleteStudyGroupApiArg = {
  id: number;
};
export type GetAdminProposalsApiResponse =
  /** status 200 OK */ AdminProposalResponse[];
export type GetAdminProposalsApiArg = void;
export type DeleteByExpelledApiResponse =
  /** status 200 OK */ StudyGroupResponse;
export type DeleteByExpelledApiArg = {
  expelled: number;
};
export type Coordinates = {
  id?: number;
  x?: number;
  y?: number;
};
export type Location = {
  id?: number;
  x?: number;
  y?: number;
  z?: number;
  name: string;
};
export type Person = {
  id?: number;
  name?: string;
  eyeColor?: "RED" | "BLACK" | "BLUE" | "BROWN";
  hairColor?: "RED" | "BLACK" | "BLUE" | "BROWN";
  location?: Location;
  weight?: number;
  nationality?: "FRANCE" | "SPAIN" | "SOUTH_KOREA" | "JAPAN";
};
export type UserResponse = {
  username?: string;
  role?: "ADMIN" | "DEFAULT";
};
export type StudyGroupResponse = {
  id?: number;
  name?: string;
  coordinates?: Coordinates;
  creationDate?: string;
  studentsCount?: number;
  expelledStudents?: number;
  transferredStudents?: number;
  formOfEducation?:
    | "DISTANCE_EDUCATION"
    | "FULL_TIME_EDUCATION"
    | "EVENING_CLASSES";
  shouldBeExpelled?: number;
  semesterEnum?: "FIRST" | "SECOND" | "SEVENTH" | "EIGHTH";
  groupAdmin?: Person;
  user?: UserResponse;
};
export type SortObject = {
  sorted?: boolean;
  empty?: boolean;
  unsorted?: boolean;
};
export type PageableObject = {
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  offset?: number;
  sort?: SortObject;
  unpaged?: boolean;
};
export type PageStudyGroupResponse = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: StudyGroupResponse[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
};
export type UpdateStudyGroupRequest = {
  id: number;
  name: string;
  coordinatesId: number;
  studentsCount: number;
  expelledStudents: number;
  transferredStudents: number;
  formOfEducation:
    | "DISTANCE_EDUCATION"
    | "FULL_TIME_EDUCATION"
    | "EVENING_CLASSES";
  shouldBeExpelled?: number;
  semester: "FIRST" | "SECOND" | "SEVENTH" | "EIGHTH";
  groupAdminId?: number;
};
export type StudyGroupRequest = {
  name: string;
  coordinatesId: number;
  studentsCount: number;
  expelledStudents: number;
  transferredStudents: number;
  formOfEducation:
    | "DISTANCE_EDUCATION"
    | "FULL_TIME_EDUCATION"
    | "EVENING_CLASSES";
  shouldBeExpelled?: number;
  semester: "FIRST" | "SECOND" | "SEVENTH" | "EIGHTH";
  groupAdminId?: number;
  isEditable?: boolean;
};
export type AdminProposalResponse = {
  id?: number;
  user?: UserResponse;
};
export type PersonResponse = {
  id?: number;
  name?: string;
  eyeColor?: "RED" | "BLACK" | "BLUE" | "BROWN";
  hairColor?: "RED" | "BLACK" | "BLUE" | "BROWN";
  location?: Location;
  weight?: number;
  nationality?: "FRANCE" | "SPAIN" | "SOUTH_KOREA" | "JAPAN";
};
export type PersonRequest = {
  name: string;
  eyeColor: "RED" | "BLACK" | "BLUE" | "BROWN";
  hairColor?: "RED" | "BLACK" | "BLUE" | "BROWN";
  locationId: number;
  weight: number;
  nationality?: "FRANCE" | "SPAIN" | "SOUTH_KOREA" | "JAPAN";
};
export type LocationResponse = {
  id?: number;
  x?: number;
  y?: number;
  z?: number;
  name?: string;
};
export type LocationRequest = {
  x: number;
  y: number;
  z: number;
  name: string;
};
export type CoordinatesResponse = {
  id?: number;
  x?: number;
  y?: number;
};
export type CoordinatesRequest = {
  x: number;
  y: number;
};
export type RegisterUserDto = {
  /** Юзернейм */
  username?: string;
  /** Пароль пользователя */
  password: string;
};
export type JwtResponse = {
  token?: string;
  expiresIn?: number;
};
export type JwtDto = {
  username: string;
  /** Пароль пользователя */
  password: string;
};
export const {
  useExpelEverybodyMutation,
  useGetAllStudyGroupsQuery,
  useUpdateStudyGroupMutation,
  useCreateStudyGroupMutation,
  useApproveAdminProposalMutation,
  useBecomeAdminMutation,
  useGetAllPersonsQuery,
  useCreatePersonMutation,
  useGetAllPersons1Query,
  useCreatePerson1Mutation,
  useGetAllCoordinatesQuery,
  useCreateCoordinatesMutation,
  useRegisterMutation,
  useAuthenticateMutation,
  useMeQuery,
  useMinGroupAdminQuery,
  useMinGroupAdmin1Query,
  useGetExpelledCountQuery,
  useGetStudyGroupsQuery,
  useDeleteStudyGroupMutation,
  useGetAdminProposalsQuery,
  useDeleteByExpelledMutation,
} = injectedRtkApi;
