package se.ifmo.is_lab1.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false)
    private float x;

    @Column(nullable = false)
    private Double y; //Поле не может быть null

    @Column(nullable = false)
    private Float z; //Поле не может быть null

    @Column(nullable = false)
    @NotBlank
    private String name; //Строка не может быть пустой, Поле может быть null
}