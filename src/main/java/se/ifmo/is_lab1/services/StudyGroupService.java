package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import se.ifmo.is_lab1.dto.collection.StudyGroupRequest;
import se.ifmo.is_lab1.exceptions.NotFoundCoordinatesException;
import se.ifmo.is_lab1.exceptions.NotFoundPersonException;
import se.ifmo.is_lab1.exceptions.NotFoundStudyGroupException;
import se.ifmo.is_lab1.messages.collection.StudyGroupResponse;
import se.ifmo.is_lab1.models.StudyGroup;
import se.ifmo.is_lab1.repositories.CoordinatesRepository;
import se.ifmo.is_lab1.repositories.PersonRepository;
import se.ifmo.is_lab1.repositories.StudyGroupRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final CoordinatesRepository coordinatesRepository;
    private final PersonRepository personRepository;
    private final ModelMapper modelMapper;

    public Optional<StudyGroupResponse> getStudyGroup(Integer id) {
        Optional<StudyGroup> studyGroup = studyGroupRepository.findById(id);
        return studyGroup.map(group -> modelMapper.map(group, StudyGroupResponse.class));
    }

    public StudyGroupResponse createStudyGroup(StudyGroupRequest studyGroupRequest) {
        StudyGroup requestObject = parseStudyGroupRequest(studyGroupRequest);
        StudyGroup savedStudyGroup = studyGroupRepository.save(requestObject);
        return modelMapper.map(savedStudyGroup, StudyGroupResponse.class);
    }

    public StudyGroupResponse updateStudyGroup(StudyGroupRequest studyGroupRequest) {
        StudyGroup requestObject = parseStudyGroupRequest(studyGroupRequest);
        StudyGroup response = studyGroupRepository.save(requestObject);
        return modelMapper.map(response, StudyGroupResponse.class);
    }

    private StudyGroup parseStudyGroupRequest(StudyGroupRequest studyGroupRequest) {
        StudyGroup requestObject = modelMapper.map(studyGroupRequest, StudyGroup.class);
        requestObject.setGroupAdmin(
                personRepository.findById(studyGroupRequest.getGroupAdminId())
                        .orElseThrow(NotFoundPersonException::new)
        );
        requestObject.setCoordinates(
                coordinatesRepository.findById(studyGroupRequest.getCoordinatesId())
                        .orElseThrow(NotFoundCoordinatesException::new)
        );
        return requestObject;
    }

    public StudyGroupResponse deleteStudyGroup(Integer id) {
        StudyGroup studyGroup = studyGroupRepository.findById(id)
                .orElseThrow(NotFoundStudyGroupException::new);
        studyGroupRepository.deleteById(id);
        return modelMapper.map(studyGroup, StudyGroupResponse.class);
    }


}
