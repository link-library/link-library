package linklibrary.controller;

import linklibrary.dto.*;
import linklibrary.entity.ProfileImg;
import linklibrary.entity.User;
import linklibrary.security.auth.PrincipalDetails;
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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final ProfileImgService profileImgService;
    private final PostService postService;

    /**
     * 회원가입
     */
    @PostMapping("/join")
    public ResponseEntity<ResponseData> joinUser(@Valid @RequestBody JoinFormDto joinFormDto) {
        Long savedUserId = userService.join(joinFormDto);
        return new ResponseEntity<>(new ResponseData("회원가입 완료", savedUserId), HttpStatus.OK);
    }

    /**
     * 회원가입시 같은 아이디가 있는지 중복체크
     */
    @PostMapping("/validation-id")
    public ResponseEntity<ResponseData> validateUserId(@Valid @RequestBody ValidateIdForm validateIdForm) {
        Boolean useful = userService.validLoginId(validateIdForm.getLoginId());
        String msg = "";
        if (useful) {
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
        String msg = "";
        if (useful) msg = "사용 가능한 닉네임 입니다.";
        else msg = "이미 사용중인 닉네임 입니다.";
        return ResponseEntity.ok(new ResponseData(msg, null));
    }

    /**
     * 회원 프로필 이미지 업로드
     */
    @PostMapping("/profileImg")
    public ResponseEntity<?> uploadImg(@AuthenticationPrincipal PrincipalDetails principalDetails, ProfileImgDto profileImgDto) throws IOException {
        Long userId = principalDetails.getUserDto().getUserId();
        ProfileImg profileImg = profileImgService.uploadImg(profileImgDto.getProfileImg(), userId);
        return ResponseEntity.ok(new ResponseData("이미지 업로드 완료", null));
    }

    /**
     * 마이페이지 조회
     */
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserPage(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        //여기서 마이페이지 정보들과 사진이 저장된 이름(UUID.png) 를 넘김
        //프론트단에서 src="images/{imgName} 하면 getImage() 에서 넘겨줌
        //따라서 여기선 저장된 이미지 이름만 넘기면 됨
        Long userId = principalDetails.getUserDto().getUserId();
        UserPageDto userPageDto = userService.getUserPage(userId);
        return ResponseEntity.ok(new ResponseData("마이페이지 조회 완료", userPageDto));
    }

    /**
     * 로컬 경로에 해당하는 이미지 불러오기
     */
    @GetMapping("/images/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) throws IOException {
        // 로컬 경로에 있는 이미지 파일을 읽어와서 byte 배열로 변환합니다.
        String fullPath = profileImgService.getFullPath(fileName);
        File imageFile = new File(fullPath); //파일경로에 해당하는걸 File 로 만듦
        byte[] imageBytes = new byte[(int) imageFile.length()]; //File 크기만큼의 byte 배열 생성
        FileInputStream inputStream = new FileInputStream(imageFile); //File 로 FileInputStream 생성
        inputStream.read(imageBytes); //byte 배열 크기만큼 inputStream 에서 읽어 배열에 담음
        inputStream.close();

        // HTTP 응답으로 byte 배열과 MIME 타입을 전송
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) //메서드는 응답 바디의 타입을 image/jpeg 로 설정
                .body(imageBytes);
    }

    @GetMapping("/joinCheck")
    public String test(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return principalDetails.getUsername();
    }
}
