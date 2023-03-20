package linklibrary.controller;

import linklibrary.dto.JoinFormDto;
import linklibrary.dto.LoginFormDto;
import linklibrary.dto.ResponseData;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<ResponseData> joinUser(@Valid @RequestBody JoinFormDto joinFormDto) {
        Long savedUserId = userService.join(joinFormDto);
        return new ResponseEntity<>(new ResponseData("회원가입 완료", savedUserId), HttpStatus.OK);
    }

    @PostMapping("/validation-id")
    public ResponseEntity<?> validateUserId(@Valid @RequestBody ValidateIdForm validateIdForm) {
        Boolean useful = userService.validLoginId(validateIdForm.loginId);
        String msg = "";
        if(useful) {
            msg = "사용가능한 아이디 입니다.";
        } else {
            msg = "이미 사용중인 아이디 입니다.";
        }
        return ResponseEntity.ok(new ResponseData(msg, null));
    }

    @GetMapping("/joinCheck")
    public String test(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return principalDetails.getUsername();
    }

    @Data
    @AllArgsConstructor
    static class ValidateIdForm {
        @NotBlank(message = "아이디는 필수 입력 값입니다.")
        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
        private String loginId;
    }
}
