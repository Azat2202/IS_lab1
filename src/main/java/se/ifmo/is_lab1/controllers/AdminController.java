package se.ifmo.is_lab1.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.ifmo.is_lab1.messages.adminPanel.AdminProposalResponse;
import se.ifmo.is_lab1.messages.authentication.UserResponse;
import se.ifmo.is_lab1.services.AdminProposalService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Controller", description = "Панель администратора")
public class AdminController {
    private final AdminProposalService adminProposalService;

    @GetMapping("/proposal")
    public List<AdminProposalResponse> getAdminProposals() {
        return adminProposalService.getAllAdminProposals();
    }

    @PutMapping("/proposal/{userId}")
    public UserResponse approveAdminProposal(@PathVariable("userId") Long userId) {
        return adminProposalService.approveAdmin(userId);
    }
}
