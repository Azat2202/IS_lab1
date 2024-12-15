package se.ifmo.is_lab1.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.ifmo.is_lab1.dto.collection.StudyGroupRequest;
import se.ifmo.is_lab1.dto.collection.UpdateStudyGroupRequest;
import se.ifmo.is_lab1.messages.collection.StudyGroupResponse;
import se.ifmo.is_lab1.models.enums.FormOfEducation;
import se.ifmo.is_lab1.models.enums.Semester;
import se.ifmo.is_lab1.services.StudyGroupService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/collection/studyGroup")
@Tag(name = "StudyGroup Manipulation Controller", description = "API для управления объектами StudyGroup в коллекции")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    @GetMapping("/{id}")
    public StudyGroupResponse getStudyGroups(@PathVariable Integer id) {
        return studyGroupService.getStudyGroup(id);
    }

    @GetMapping
    public Page<StudyGroupResponse> getAllStudyGroups(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String groupName,
            @RequestParam(required = false) String adminName,
            @RequestParam(required = false) Semester semester,
            @RequestParam(required = false) FormOfEducation formOfEducation
            ) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return studyGroupService.getAllStudyGroups(pageable, groupName, adminName, semester, formOfEducation);
    }

    @PostMapping
    public StudyGroupResponse createStudyGroup(@RequestBody @Valid StudyGroupRequest studyGroupRequest) {
        return studyGroupService.createStudyGroup(studyGroupRequest);
    }

    @DeleteMapping("/{id}")
    public StudyGroupResponse deleteStudyGroup(@PathVariable Integer id) {
        return studyGroupService.deleteStudyGroup(id);
    }

    @PutMapping
    public StudyGroupResponse updateStudyGroup(@RequestBody @Valid UpdateStudyGroupRequest studyGroupRequest) {
        return studyGroupService.updateStudyGroup(studyGroupRequest);
    }
}
