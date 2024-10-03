package se.ifmo.is_lab1.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import se.ifmo.is_lab1.dto.collection.LocationRequest;
import se.ifmo.is_lab1.messages.collection.LocationResponse;
import se.ifmo.is_lab1.models.Location;
import se.ifmo.is_lab1.repositories.LocationRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final ModelMapper modelMapper;

    public List<LocationResponse> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return modelMapper.map(locations, new TypeToken<List<LocationResponse>>(){}.getType());
    }

    public LocationResponse createLocation(LocationRequest locationRequest) {
        Location location = modelMapper.map(locationRequest, Location.class);
        Location savedLocation = locationRepository.save(location);
        return modelMapper.map(savedLocation, LocationResponse.class);
    }

}
