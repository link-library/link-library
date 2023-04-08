
package linklibrary.controller.Test;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import linklibrary.dto.request.*;
import linklibrary.dto.response.ResponseData;
import linklibrary.dto.response.UserPageDto;
import linklibrary.dto.response.test.CommonResponseDto;
import linklibrary.entity.ProfileImg;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.security.dto.TokenDto;
import linklibrary.security.service.AuthService;
import linklibrary.security.service.test.AuthServiceTest;
import linklibrary.service.PostService;
import linklibrary.service.ProfileImgService;
import linklibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserControllerTest {

    private final UserService userService;
    private final ProfileImgService profileImgService;
    private final PostService postService;
    private final AuthServiceTest authService;


    /**
     * authService 와 userService 나중에 합쳐야 함
     */


    @Operation(summary = "회원가입 ", description = "전부 필수값 (없을 시 예외 메세지 전송)",
            responses = {
                    @ApiResponse(responseCode = "200", description = "회원 가입 성공"),
                    @ApiResponse(responseCode = "400", description = "회원 가입 실패")
            })
//    @ApiOperation(value = "유저 생성", notes = "전부 필수값 (없을 시 예외 메세지 전송)")
    @PostMapping("/join")
    @Pattern(regexp = "^[a-z]+[a-zA-Z1-9]{6,20}",message = "아이디는 영문 소문자로 시작하고 숫자를 포함하여 7~20자로 구성되어야 합니다.")
    public ResponseEntity<?> joinUser(@Valid @RequestBody JoinFormDto joinFormDto) {
        CommonResponseDto<Object> responseDto = authService.join2(joinFormDto);
        return ResponseEntity.ok()
                .body(responseDto);
    }


}


