package se.ifmo.is_lab1.dto.authentication;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import se.ifmo.is_lab1.models.enums.Role;

@Data
@Builder
public class RegisterUserDto {

    @Schema(description = "Юзернейм", example = "azat222")
    private String username;

    @NotNull
    @NotBlank
    @Schema(description = "Пароль пользователя", example = "P@ssw0rd")
    private String password;

    @NotNull
    @Schema(description = "Роль пользователя", example = "DEFAULT")
    private Role role;
}


