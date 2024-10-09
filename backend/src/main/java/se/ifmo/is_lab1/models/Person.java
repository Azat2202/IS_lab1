package se.ifmo.is_lab1.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.ifmo.is_lab1.models.enums.Color;
import se.ifmo.is_lab1.models.enums.Country;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name; //Поле не может быть null, Строка не может быть пустой
    //
    @Column(nullable = false)
    private Color eyeColor; //Поле не может быть null

    @Column
    private Color hairColor; //Поле может быть null


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private Location location; //Поле не может быть null

    @Column(nullable = false)
    private double weight; //Значение поля должно быть больше 0

    @Column
    private Country nationality; //Поле может быть null

    @OneToMany(mappedBy = "groupAdmin")
    @JsonIgnore
    private List<StudyGroup> studyGroups;
}
