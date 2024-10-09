package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import se.ifmo.is_lab1.dto.collection.CoordinatesRequest;
import se.ifmo.is_lab1.messages.collection.CoordinatesResponse;
import se.ifmo.is_lab1.models.Coordinates;
import se.ifmo.is_lab1.repositories.CoordinatesRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoordinatesService {

    private final CoordinatesRepository coordinatesRepository;
    private final ModelMapper modelMapper;

    public List<CoordinatesResponse> getAllCoordinates() {
        List<Coordinates> coordinates = coordinatesRepository.findAll();
        return modelMapper.map(coordinates, new TypeToken<List<CoordinatesResponse>>(){}.getType());
    }

    public CoordinatesResponse createCoordinates(CoordinatesRequest coordinatesRequest) {
        Coordinates coordinates = modelMapper.map(coordinatesRequest, Coordinates.class);
        Coordinates savedCoordinates = coordinatesRepository.save(coordinates);
        return modelMapper.map(savedCoordinates, CoordinatesResponse.class);
    }

}

