package linklibrary.service;

import linklibrary.dto.PostFormDto;
import linklibrary.entity.Post;
import linklibrary.mapper.PostMapper;
import linklibrary.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    /**
     * 포스트 저장
     */
    public Long createPost(PostFormDto postFormDto) throws IOException {
        Post post = PostMapper.convertToModel(postFormDto);
        this.postRepository.save(post);
        return post.getId();

    }
    /**
     * 포스트 삭제
     */
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("포스트 엔티티가 없습니다"));
        postRepository.delete(post);
    }

    public Long change(Long postId, PostFormDto postFormDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("포스트 엔티티가 없습니다"));

        post.setTitle(postFormDto.getTitle());
        post.setMemo(postFormDto.getMemo());
        post.setUrl(postFormDto.getUrl());
        post.setCategory(postFormDto.getCategory());
        return post.getId();

    }

}
