package se.ifmo.is_lab1.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundStudyGroupException extends StudyGroupRuntimeException{
    public NotFoundStudyGroupException() {
        super("StudyGroup not found!", HttpStatus.NOT_FOUND);
    }
}
