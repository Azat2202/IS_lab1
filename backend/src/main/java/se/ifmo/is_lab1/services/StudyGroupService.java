package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.ifmo.is_lab1.dto.collection.StudyGroupRequest;
import se.ifmo.is_lab1.dto.collection.UpdateStudyGroupRequest;
import se.ifmo.is_lab1.exceptions.CoordinatesNotFoundException;
import se.ifmo.is_lab1.exceptions.ObjectDontBelongToUserException;
import se.ifmo.is_lab1.exceptions.PersonNotFoundException;
import se.ifmo.is_lab1.exceptions.StudyGroupNotFoundException;
import se.ifmo.is_lab1.messages.collection.StudyGroupResponse;
import se.ifmo.is_lab1.models.ObjectAudit;
import se.ifmo.is_lab1.models.StudyGroup;
import se.ifmo.is_lab1.models.User;
import se.ifmo.is_lab1.models.enums.FormOfEducation;
import se.ifmo.is_lab1.models.enums.Role;
import se.ifmo.is_lab1.models.enums.Semester;
import se.ifmo.is_lab1.repositories.*;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final CoordinatesRepository coordinatesRepository;
    private final PersonRepository personRepository;
    private final ModelMapper modelMapper;
    private final LocationRepository locationRepository;
    private final ObjectAuditRepository objectAuditRepository;

    private static Map<Semester, String> semesterMapping = new HashMap<>();
    private static Map<FormOfEducation, String > formOfEducationMapping = new HashMap();

    static {
        semesterMapping.put(Semester.FIRST, "0");
        semesterMapping.put(Semester.SECOND, "1");
        semesterMapping.put(Semester.SEVENTH, "2");
        semesterMapping.put(Semester.EIGHTH, "3");

        formOfEducationMapping.put(FormOfEducation.DISTANCE_EDUCATION, "0");
        formOfEducationMapping.put(FormOfEducation.FULL_TIME_EDUCATION, "1");
        formOfEducationMapping.put(FormOfEducation.EVENING_CLASSES, "2");
    }

    public StudyGroupResponse getStudyGroup(Integer id) {
        StudyGroup studyGroup = studyGroupRepository.findById(id)
                .orElseThrow(StudyGroupNotFoundException::new);
        return modelMapper.map(studyGroup, StudyGroupResponse.class);
    }

    public Page<StudyGroupResponse> getAllStudyGroups(Pageable pageable,
                                                      String groupName,
                                                      String adminName,
                                                      Semester semester,
                                                      FormOfEducation formOfEducation) {
        String semesterName;
        String formOfEducationName;
        if(semester == null)
            semesterName = null;
        else
            semesterName = semester.name();
        if (formOfEducation == null)
            formOfEducationName = null;
        else
            formOfEducationName = formOfEducation.name();
        Page<StudyGroup> studyGroups =
                studyGroupRepository.findByFilter(
                        groupName, adminName, semester, formOfEducation, pageable
                );
        return studyGroups.map(s -> modelMapper.map(s, StudyGroupResponse.class));
    }

    public StudyGroupResponse createStudyGroup(StudyGroupRequest studyGroupRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        StudyGroup requestObject = modelMapper.map(studyGroupRequest, StudyGroup.class);
        if (studyGroupRequest.getGroupAdminId() != null) {
            requestObject.setGroupAdmin(
                    personRepository.findById(studyGroupRequest.getGroupAdminId())
                            .orElseThrow(PersonNotFoundException::new)
            );
        }
        requestObject.setCoordinates(
                coordinatesRepository.findById(studyGroupRequest.getCoordinatesId())
                        .orElseThrow(CoordinatesNotFoundException::new)
        );
        requestObject.setUser(user);
        StudyGroup savedStudyGroup = studyGroupRepository.save(requestObject);
        ObjectAudit objectAudit = new ObjectAudit();
        objectAudit.setTableName("studyGroup");
        objectAudit.setUser(user);
        objectAuditRepository.save(objectAudit);
        return modelMapper.map(savedStudyGroup, StudyGroupResponse.class);
    }

    public StudyGroupResponse updateStudyGroup(UpdateStudyGroupRequest studyGroupRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        StudyGroup existingStudyGroup = studyGroupRepository.findById(studyGroupRequest.getId())
                .orElseThrow(StudyGroupNotFoundException::new);

        if (!existingStudyGroup.getIsEditable() ||
                (!user.getRole().equals(Role.ADMIN) &&
                        !existingStudyGroup
                                .getUser()
                                .getId()
                                .equals(user.getId()))) {
            throw new ObjectDontBelongToUserException();
        }
        existingStudyGroup.setCoordinates(
                coordinatesRepository.findById(studyGroupRequest.getCoordinatesId())
                        .orElseThrow(CoordinatesNotFoundException::new)
        );
        if (studyGroupRequest.getGroupAdminId() != null) {
            existingStudyGroup.setGroupAdmin(
                    personRepository.findById(studyGroupRequest.getGroupAdminId())
                            .orElseThrow(PersonNotFoundException::new)
            );
        }
        existingStudyGroup.setName(studyGroupRequest.getName());
        existingStudyGroup.setStudentsCount(studyGroupRequest.getStudentsCount());
        existingStudyGroup.setExpelledStudents(studyGroupRequest.getExpelledStudents());
        existingStudyGroup.setTransferredStudents(studyGroupRequest.getTransferredStudents());
        existingStudyGroup.setFormOfEducation(studyGroupRequest.getFormOfEducation());
        existingStudyGroup.setShouldBeExpelled(studyGroupRequest.getShouldBeExpelled());
        existingStudyGroup.setSemester(studyGroupRequest.getSemester());
        StudyGroup response = studyGroupRepository.save(existingStudyGroup);
        ObjectAudit objectAudit = new ObjectAudit();
        objectAudit.setTableName("studyGroup");
        objectAudit.setUser(user);
        objectAuditRepository.save(objectAudit);
        return modelMapper.map(response, StudyGroupResponse.class);
    }

    @Transactional
    public StudyGroupResponse deleteStudyGroup(Integer objectId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!user.getRole().equals(Role.ADMIN)  &&
                !studyGroupRepository.findById(objectId)
                .orElseThrow(StudyGroupNotFoundException::new)
                .getUser()
                .getId()
                .equals(user.getId())) {
            throw new ObjectDontBelongToUserException();
        }
        StudyGroup studyGroup = studyGroupRepository.findById(objectId)
                .orElseThrow(StudyGroupNotFoundException::new);
        studyGroupRepository.deleteById(objectId);
        if (studyGroup.getGroupAdmin() != null && studyGroup.getGroupAdmin().getStudyGroups().size() == 1) {
            personRepository.deleteById(studyGroup.getGroupAdmin().getId());
            if (studyGroup.getGroupAdmin().getLocation().getPersons().size() == 1) {
                locationRepository.deleteById(studyGroup.getGroupAdmin().getLocation().getId());
            }
        }
        if (studyGroup.getCoordinates().getStudyGroups().size() == 1) {
            coordinatesRepository.deleteById(studyGroup.getCoordinates().getId());
        }
        ObjectAudit objectAudit = new ObjectAudit();
        objectAudit.setTableName("studyGroup");
        objectAudit.setUser(user);
        objectAuditRepository.save(objectAudit);
        return modelMapper.map(studyGroup, StudyGroupResponse.class);
    }


}
