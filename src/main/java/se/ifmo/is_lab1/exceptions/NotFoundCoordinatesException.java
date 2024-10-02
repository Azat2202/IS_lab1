package se.ifmo.is_lab1.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundCoordinatesException extends StudyGroupRuntimeException{

    public NotFoundCoordinatesException() {
        super("Coordinates not found!", HttpStatus.NOT_FOUND);
    }
}
