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
import se.ifmo.is_lab1.models.StudyGroup;
import se.ifmo.is_lab1.models.User;
import se.ifmo.is_lab1.models.enums.Role;
import se.ifmo.is_lab1.repositories.CoordinatesRepository;
import se.ifmo.is_lab1.repositories.LocationRepository;
import se.ifmo.is_lab1.repositories.PersonRepository;
import se.ifmo.is_lab1.repositories.StudyGroupRepository;

@Service
@RequiredArgsConstructor
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final CoordinatesRepository coordinatesRepository;
    private final PersonRepository personRepository;
    private final ModelMapper modelMapper;
    private final LocationRepository locationRepository;

    public StudyGroupResponse getStudyGroup(Integer id) {
        StudyGroup studyGroup = studyGroupRepository.findById(id)
                .orElseThrow(StudyGroupNotFoundException::new);
        return modelMapper.map(studyGroup, StudyGroupResponse.class);
    }

    public Page<StudyGroupResponse> getAllStudyGroups(Pageable pageable,
                                                      String groupName,
                                                      String adminName) {
        Page<StudyGroup> studyGroups =
                studyGroupRepository.findByFilter(
                        groupName, adminName, pageable
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
        return modelMapper.map(savedStudyGroup, StudyGroupResponse.class);
    }

    public StudyGroupResponse updateStudyGroup(UpdateStudyGroupRequest studyGroupRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        StudyGroup existingStudyGroup = studyGroupRepository.findById(studyGroupRequest.getId())
                .orElseThrow(StudyGroupNotFoundException::new);

        if (!(existingStudyGroup.getIsEditable() && user.getRole().equals(Role.ADMIN)) ||
                !existingStudyGroup
                        .getUser()
                        .getId()
                        .equals(user.getId())) {
            throw new ObjectDontBelongToUserException();
        }
        modelMapper.map(studyGroupRequest, existingStudyGroup);
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
        StudyGroup response = studyGroupRepository.save(existingStudyGroup);
        return modelMapper.map(response, StudyGroupResponse.class);
    }

    @Transactional
    public StudyGroupResponse deleteStudyGroup(Integer objectId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!studyGroupRepository.findById(objectId)
                .orElseThrow(StudyGroupNotFoundException::new)
                .getUser()
                .getId()
                .equals(user.getId())) {
            throw new ObjectDontBelongToUserException();
        }
        StudyGroup studyGroup = studyGroupRepository.findById(objectId)
                .orElseThrow(StudyGroupNotFoundException::new);
        studyGroupRepository.deleteById(objectId);
        if (studyGroup.getGroupAdmin().getStudyGroups().size() == 1) {
            personRepository.deleteById(studyGroup.getGroupAdmin().getId());
            if (studyGroup.getGroupAdmin().getLocation().getPersons().size() == 1) {
                locationRepository.deleteById(studyGroup.getGroupAdmin().getLocation().getId());
            }
        }
        if (studyGroup.getCoordinates().getStudyGroups().size() == 1) {
            coordinatesRepository.deleteById(studyGroup.getCoordinates().getId());
        }
        return modelMapper.map(studyGroup, StudyGroupResponse.class);
    }


}
