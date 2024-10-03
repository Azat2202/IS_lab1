package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import se.ifmo.is_lab1.dto.collection.PersonRequest;
import se.ifmo.is_lab1.exceptions.LocationNotFoundException;
import se.ifmo.is_lab1.messages.collection.PersonResponse;
import se.ifmo.is_lab1.models.Person;
import se.ifmo.is_lab1.repositories.LocationRepository;
import se.ifmo.is_lab1.repositories.PersonRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final LocationRepository locationRepository;
    private final PersonRepository personRepository;
    private final ModelMapper modelMapper;

    public List<PersonResponse> getAllPersons() {
        List<Person> persons = personRepository.findAll();
        return modelMapper.map(persons, new TypeToken<List<PersonResponse>>(){}.getType());
    }

    public PersonResponse createPerson(PersonRequest personRequest) {
        Person person = modelMapper.map(personRequest, Person.class);
        person.setLocation(
                locationRepository.findById(personRequest.getLocationId())
                        .orElseThrow(LocationNotFoundException::new)
        );
        Person savedPerson = personRepository.save(person);
        return modelMapper.map(savedPerson, PersonResponse.class);
    }

}

