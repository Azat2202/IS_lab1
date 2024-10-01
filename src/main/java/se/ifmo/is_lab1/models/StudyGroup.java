package se.ifmo.is_lab1.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.ifmo.is_lab1.models.enums.FormOfEducation;
import se.ifmo.is_lab1.models.enums.Semester;

import java.time.Instant;
import java.time.ZoneId;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class StudyGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private int id; //Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически

    @Column(nullable = false)
    private String name; //Поле не может быть null, Строка не может быть пустой

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Coordinates coordinates; //Поле не может быть null

    @Column(nullable = false)
    private java.time.ZonedDateTime creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически

    @Column(nullable = false)
    private Integer studentsCount; //Значение поля должно быть больше 0, Поле не может быть null

    @Column(nullable = false)
    private Integer expelledStudents; //Значение поля должно быть больше 0, Поле не может быть null

    @Column
    private int transferredStudents; //Значение поля должно быть больше 0

    @Column(nullable = false)
    private FormOfEducation formOfEducation; //Поле не может быть null

    @Column
    private Integer shouldBeExpelled; //Значение поля должно быть больше 0, Поле может быть null

    @Column(nullable = false)
    private Semester semesterEnum; //Поле не может быть null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Person groupAdmin; //Поле может быть null

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        this.creationDate = now.atZone(ZoneId.systemDefault());
    }

}