package se.ifmo.is_lab1.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundPersonException extends StudyGroupRuntimeException{
    public NotFoundPersonException() {
        super("Person not found!", HttpStatus.NOT_FOUND);
    }
}
