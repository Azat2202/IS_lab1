package se.ifmo.is_lab1.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.ifmo.is_lab1.dto.JwtDto;
import se.ifmo.is_lab1.dto.RegisterUserDto;
import se.ifmo.is_lab1.messages.authentication.JwtResponse;
import se.ifmo.is_lab1.messages.authentication.UserResponse;
import se.ifmo.is_lab1.models.User;
import se.ifmo.is_lab1.services.AuthenticationService;
import se.ifmo.is_lab1.services.JwtUserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "API для регистрации и аутентификации пользователей")
public class AuthenticationController {

    private final JwtUserService jwtUserService;
    private final AuthenticationService authenticationService;

    @Operation(summary = "Регистрация пользователя", description = "Регистрирует нового пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешная регистрация",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400", description = "Неверный запрос",
                    content = @Content)
    })
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(final @Validated @RequestBody RegisterUserDto registerUserDto) {
        UserResponse registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @Operation(summary = "Аутентификация пользователя", description = "Аутентифицирует пользователя и выдает JWT токен")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешная аутентификация",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = JwtResponse.class))),
            @ApiResponse(responseCode = "401", description = "Неверное имя пользователя или пароль",
                    content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticate(final @Validated @RequestBody JwtDto jwtDto) {
        User authenticatedUser = authenticationService.authenticate(jwtDto);
        String jwtToken = jwtUserService.generateToken(authenticatedUser);

        JwtResponse jwtResponseDto = JwtResponse.builder()
                .token(jwtToken)
                .expiresIn(jwtUserService.getExpirationTime())
                .build();

        return ResponseEntity.ok(jwtResponseDto);
    }
}


