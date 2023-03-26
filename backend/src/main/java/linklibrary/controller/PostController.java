package linklibrary.controller;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostFormDto;
import linklibrary.dto.ResponseData;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    /**
     * 포스트 생성
     */
    @PostMapping("/post")
    public ResponseEntity<ResponseData> createPost(@Valid @RequestBody final PostFormDto postFormDto) throws IOException {
        Long savedPostId = postService.createPost(postFormDto);
        //보통 생성했을 때 id 값만 반환하더라구요
        return new ResponseEntity<>(new ResponseData("포스터 생성 완료. 전체 조회 화면으로 이동", savedPostId), HttpStatus.OK);
    }

    /**
     * 포스트 삭제하기
     */
    @DeleteMapping("post/{postId}")
    public ResponseEntity<ResponseData> deletePost(@PathVariable final long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(new ResponseData("포스트 삭제 완료", null), HttpStatus.OK);
    }

    /**
     * 포스트 수정
     */
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("post/{postId}")
    public ResponseEntity<ResponseData> updatePost(@PathVariable final long postId,
                                   @Valid @RequestBody final PostFormDto postFormDto) {
        Long updatedPostId = postService.change(postId, postFormDto);
        return new ResponseEntity<>(new ResponseData("포스트 수정 완료", updatedPostId), HttpStatus.OK);
    }
    /**
     * 로그인한 녀석의 포스트 전체 조회
     */
    //로그인이 필요한 엔드포인트인 경우, 로그인하지 않은 사용자에게 로그인하도록 요청하십시오.
    // 이렇게 하려면, @GetMapping("/posts") 애노테이션 위에 @PreAuthorize("isAuthenticated()")를 추가하십시오.
    // 이렇게 하려면 먼저 spring-security의 의존성을 프로젝트에 추가해야 합니다.
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/posts")
    public List<PostDto> getPostList(
            @RequestParam(required = false, defaultValue = "") final String keyword, //포스트에 들어가는 글자
            @RequestParam(required = false, defaultValue = "byDate") final String sort,
            @RequestParam(required = false) final Boolean bookmark,
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            HttpServletResponse response) {
        String token = response.getHeader("Authorization");
        System.out.println(token);
        List<PostDto> postDtos = postService.getPostList(principalDetails.getUser(),keyword, sort,bookmark);
        return postDtos;
    }
}
