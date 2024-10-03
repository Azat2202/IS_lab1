package se.ifmo.is_lab1.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.ifmo.is_lab1.dto.collection.StudyGroupRequest;
import se.ifmo.is_lab1.messages.collection.StudyGroupResponse;
import se.ifmo.is_lab1.services.StudyGroupService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/collection/studyGroup")
@Tag(name = "StudyGroup Manipulation Controller", description = "API для управления объектами StudyGroup в коллекции")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    @GetMapping("/{id}")
    public ResponseEntity<? extends StudyGroupResponse> getStudyGroups(@PathVariable Integer id) {
        return ResponseEntity.of(studyGroupService.getStudyGroup(id));
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
    public StudyGroupResponse updateStudyGroup(@RequestBody @Valid StudyGroupRequest studyGroupRequest) {
        return studyGroupService.updateStudyGroup(studyGroupRequest);
    }
}
