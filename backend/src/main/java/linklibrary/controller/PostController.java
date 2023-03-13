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
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable final long postId) {
        postService.deletePost(postId);
    }////
}
