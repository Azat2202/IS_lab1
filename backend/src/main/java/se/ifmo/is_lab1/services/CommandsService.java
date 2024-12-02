package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import se.ifmo.is_lab1.exceptions.PersonNotFoundException;
import se.ifmo.is_lab1.exceptions.StudyGroupNotFoundException;
import se.ifmo.is_lab1.messages.collection.StudyGroupResponse;
import se.ifmo.is_lab1.models.Person;
import se.ifmo.is_lab1.models.StudyGroup;
import se.ifmo.is_lab1.models.User;
import se.ifmo.is_lab1.repositories.PersonRepository;
import se.ifmo.is_lab1.repositories.StudyGroupRepository;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommandsService {
    private final StudyGroupRepository studyGroupRepository;
    private final StudyGroupService studyGroupService;
    private final ModelMapper modelMapper;
    private final PersonRepository personRepository;

    public StudyGroupResponse deleteByShouldBeExpelled(Integer shouldBeExpelled) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<StudyGroup> allObjects = studyGroupRepository.findAll();
        StudyGroup toDelete = allObjects.stream()
                .filter(s -> s.getUser().getId().equals(user.getId()))
                .filter(s -> s.getExpelledStudents().equals(shouldBeExpelled))
                .findFirst()
                .orElseThrow(StudyGroupNotFoundException::new);
        return studyGroupService.deleteStudyGroup(toDelete.getId());
    }

    public StudyGroupResponse getByMinGroupAdmin() {
        List<StudyGroup> allObjects = studyGroupRepository.findAll();
        allObjects.sort(Comparator.comparing(a -> a.getGroupAdmin().getName()));
        return modelMapper.map(
                allObjects.stream().findFirst().orElseThrow(StudyGroupNotFoundException::new),
                StudyGroupResponse.class);
    }

    public Long getCountByGroupAdmin(Long groupAdminId) {
        List<StudyGroup> allObjects = studyGroupRepository.findAll();
        Person groupAdminDb = personRepository.findById(groupAdminId)
                .orElseThrow(PersonNotFoundException::new);
        return allObjects.stream()
                .filter(s -> s.getGroupAdmin().equals(groupAdminDb))
                .count();
    }

    public StudyGroupResponse expelEverybody(Integer groupId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(StudyGroupNotFoundException::new);
        group.setExpelledStudents(
                group.getExpelledStudents() +
                        group.getStudentsCount()
        );
        group.setStudentsCount(0);
        studyGroupRepository.save(group);
        return modelMapper.map(group, StudyGroupResponse.class);
    }

    public Integer getAllExpelledCount() {
        List<StudyGroup> allObjects = studyGroupRepository.findAll();
        return allObjects.stream()
                .map(StudyGroup::getExpelledStudents)
                .reduce(0, Integer::sum);
    }

}