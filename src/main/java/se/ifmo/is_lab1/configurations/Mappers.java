package se.ifmo.is_lab1.configurations;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Mappers {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
