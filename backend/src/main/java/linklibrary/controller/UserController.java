package linklibrary.controller;

import linklibrary.dto.*;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.service.ProfileImgService;
import linklibrary.service.UserService;
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
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final ProfileImgService profileImgService;

    @PostMapping("/join")
    public ResponseEntity<ResponseData> joinUser(@Valid @RequestBody JoinFormDto joinFormDto) {
        Long savedUserId = userService.join(joinFormDto);
        return new ResponseEntity<>(new ResponseData("회원가입 완료", savedUserId), HttpStatus.OK);
    }

    /**
     * 회원가입시 같은 아이디가 있는지 중복체크
     */
    @PostMapping("/validation-id")
    public ResponseEntity<?> validateUserId(@Valid @RequestBody ValidateIdForm validateIdForm) {
        Boolean useful = userService.validLoginId(validateIdForm.getLoginId());
        String msg = "";
        if(useful) {
            msg = "사용 가능한 아이디 입니다.";
        } else {
            msg = "이미 사용중인 아이디 입니다.";
        }
        return ResponseEntity.ok(new ResponseData(msg, null));
    }

    /**
     * 회원가입시 같은 닉네임이 있는지 중복체크
     */
    @PostMapping("/validation-nickname")
    public ResponseEntity<?> validateNickname(@Valid @RequestBody ValidateNicknameForm validateNicknameForm) {
        Boolean useful = userService.validNickname(validateNicknameForm.getNickname());
        String msg ="";
        if(useful) msg = "사용 가능한 닉네임 입니다.";
        else msg = "이미 사용중인 닉네임 입니다.";
        return ResponseEntity.ok(new ResponseData(msg, null));
    }

    /**
     * 회원 프로필 이미지 업로드
     */
    @PostMapping("/profileImg")
    public ResponseEntity<?> uploadImg(@AuthenticationPrincipal PrincipalDetails principalDetails, ProfileImgDto profileImgDto) throws IOException {
        profileImgService.uploadImg(profileImgDto.getProfileImg());
        userService.

    }

    @GetMapping("/joinCheck")
    public String test(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return principalDetails.getUsername();
    }
}
