package se.ifmo.is_lab1.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundLocationException extends StudyGroupRuntimeException{
    public NotFoundLocationException() {
        super("Location not found!", HttpStatus.NOT_FOUND);
    }
}
