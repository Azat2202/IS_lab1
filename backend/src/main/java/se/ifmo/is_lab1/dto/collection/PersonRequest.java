package se.ifmo.is_lab1.dto.collection;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import se.ifmo.is_lab1.models.enums.Color;
import se.ifmo.is_lab1.models.enums.Country;

@Data
public class PersonRequest {
    @NotNull
    @NotBlank
    private String name; //Поле не может быть null, Строка не может быть пустой

    @NotNull
    private Color eyeColor; //Поле не может быть null

    private Color hairColor; //Поле может быть null

    @NotNull
    private Long locationId; //Поле не может быть null

    @NotNull
    @Positive
    private double weight; //Значение поля должно быть больше 0

    private Country nationality; //Поле может быть null
}
