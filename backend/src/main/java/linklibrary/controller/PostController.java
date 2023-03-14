package linklibrary.controller;

import linklibrary.dto.PostFormDto;
import linklibrary.dto.ResponseData;
import linklibrary.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

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
}
