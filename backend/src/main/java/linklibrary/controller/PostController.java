package linklibrary.controller;

import io.swagger.annotations.ApiOperation;
import linklibrary.dto.request.PostFormDto;
import linklibrary.dto.response.CategoryDto;
import linklibrary.dto.response.MainPageDto;
import linklibrary.dto.response.PostDto;
import linklibrary.dto.response.ResponseData;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.service.CategoryService;
import linklibrary.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    private final CategoryService categoryService;

    /**
     * 포스트 생성,
     */
    @ApiOperation(value = "포스트 생성", notes = "필수값: title, url, categoryId (없을 시 예외 메세지 전송)")
    @PostMapping("/post")
    public ResponseEntity<ResponseData> createPost(@Valid @RequestBody final PostFormDto postFormDto,
                                                   @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        Long savedPostId = postService.createPost(postFormDto, principalDetails.getUserDto().getUserId());

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
     * 로그인한 녀석의 포스트(찜목록) 전체 조회
     */
    //로그인이 필요한 엔드포인트인 경우, 로그인하지 않은 사용자에게 로그인하도록 요청하십시오.
    // 이렇게 하려면, @GetMapping("/posts") 애노테이션 위에 @PreAuthorize("isAuthenticated()")를 추가하십시오.
    // 이렇게 하려면 먼저 spring-security의 의존성을 프로젝트에 추가해야 합니다.

//    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/posts")
    public ResponseEntity<ResponseData> getPostList(
            @RequestParam(required = false, defaultValue = "") final String keyword, //포스트에 들어가는 글자
            @RequestParam(required = false, defaultValue = "byDate") final String sort,
            @RequestParam(required = false) final Boolean bookmark,
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestParam(required = false) int page) {
        PageRequest pageRequest = PageRequest.of(page, 16);
        // 포스트 정보
        List<PostDto> postDtos = postService.getPostList(principalDetails.getUserDto().getUserId(), keyword, sort, bookmark, pageRequest);
        // 카테고리 정보를 가져옴.
        List<CategoryDto> categories = categoryService.findAll(principalDetails.getUserDto().getUserId());

        // 결과 데이터를 생성해주기
        Map<String, Object> resultData = new HashMap<>();
        resultData.put("categories", categories);
        resultData.put("posts", postDtos);
        resultData.put("PostTotal", postDtos.size());
        return new ResponseEntity<>(new ResponseData("포스트 조회(찜목록)", resultData), HttpStatus.OK);
    }

    /**
     * 카테고리로 전체조회
     */
//    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/posts/{categoryId}")
    public ResponseEntity<ResponseData> getPostList2(
            @RequestParam(required = false, defaultValue = "") final String keyword, //포스트에 들어가는 글자
            @RequestParam(required = false, defaultValue = "byDate") final String sort,
            @PathVariable(required = true) final Long categoryId,
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestParam(defaultValue = "0") int page) {
        PageRequest pageRequest = PageRequest.of(page, 16);
        // 포스트 정보
        List<PostDto> postDtos = postService.getPostListByCategoryId(principalDetails.getUserDto().getUserId(), keyword, sort, categoryId, pageRequest);
        // 카테고리 정보를 가져옴.
        List<CategoryDto> categories = categoryService.findAll(principalDetails.getUserDto().getUserId());
        // 결과 데이터를 생성해주기
        Map<String, Object> resultData = new HashMap<>();
        resultData.put("categories", categories);
        resultData.put("posts", postDtos);
        resultData.put("PostTotal", postDtos.size());
        resultData.put("currentCategory", categoryId);
        return new ResponseEntity<>(new ResponseData("포스트 조회(찜목록)", resultData), HttpStatus.OK);
    }

    @ApiOperation(value = "포스트 전체 or 찜목록 조회", notes = "bookmark 값이 null이면 전체조회 null이 아니면 찜목록 조회  sort=\"byDate\"이면 시간순, sort=\"byTitle\"이면 제목순")
    @GetMapping("/posts")
    public ResponseEntity<?> getPosts(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestParam(required = false) String bookmark,
            @RequestParam(required = false, defaultValue = "byDate") String sort,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page) {
        PageRequest pageable = PageRequest.of(page, 16);
        Long userId = principalDetails.getUserDto().getUserId();
        MainPageDto mainPageDto = postService.getPosts(userId, bookmark, sort, keyword, null, pageable);
        return ResponseEntity.ok(new ResponseData("찜목록 or 전체페이지 조회 완료", mainPageDto));
    }

    @GetMapping("/posts/{categoryId}")
    public ResponseEntity<?> getPostsByCategory(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestParam(required = false, defaultValue = "byDate") String sort,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page) {
        PageRequest pageable = PageRequest.of(page, 16);
        Long userId = principalDetails.getUserDto().getUserId();
        MainPageDto mainPageDto = postService.getPosts(userId, null, sort, keyword, categoryId, pageable);
        return ResponseEntity.ok(new ResponseData("찜목록 or 전체페이지 조회 완료", mainPageDto));
    }


}
