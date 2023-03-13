package linklibrary.controller;

import linklibrary.dto.PostDto;
import linklibrary.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    /**
     * 포스트 생성
     */
    @PostMapping
    public ResponseEntity<PostDto> createAlbum(@RequestBody final PostDto postDto) throws IOException {
        PostDto savedPostDto = postService.createPost(postDto);
        return new ResponseEntity<>(savedPostDto, HttpStatus.OK);
    }

    /**
     * 포스트 삭제하기
     */
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable final long postId) {
        postService.deletePost(postId);
    }

    /**
     * 포스트 수정
     * 근데 리팩토링 필요함.
     * 영한이가 BindinResult인가? 원래 데이터 보여주는식 있었던것 같음. 나중에 고치겠음
     */
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    public PostDto updateAlbum(@PathVariable final long postId,
                               @RequestBody final PostDto postDto) {
        PostDto result = postService.change(postId, postDto);
        return result;
    }
}
