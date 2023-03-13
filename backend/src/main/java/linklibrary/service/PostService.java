package linklibrary.service;

import linklibrary.dto.PostDto;
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
    public PostDto createPost(PostDto postDto) throws IOException {
        Post post = PostMapper.convertToModel(postDto);
        this.postRepository.save(post);
        return PostMapper.convertToDto(post);

    }
    /**
     * 포스트 삭제
     */
    public void deletePost(Long postId) {
        Optional<Post> post =postRepository.findById(postId);
        // post가 빈값이라면? 에러 !
        if (post.isEmpty()) {
            throw new NoSuchElementException(String.format("Post ID '%d'가 존재하지 않습니다.", postId));
        }
        // post 꺼내오기
        Post findPost = post.get();
        postRepository.delete(findPost);
    }
    /**
     * 포스트 수정
     * 리팩토링 필요
     */
    public PostDto change(Long postId, PostDto postDto) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new NoSuchElementException(String.format("Post ID '%d'가 존재하지 않습니다", postId));
        }
        Post updatePost = post.get();
        updatePost.setPostId(postDto.getPostId());
        updatePost.setTitle(postDto.getTitle());
        updatePost.setMemo(postDto.getMemo());
        updatePost.setUrl(postDto.getUrl());
        updatePost.setCategory(postDto.getCategory());


        Post savedPost = postRepository.save(updatePost);
        return PostMapper.convertToDto(savedPost);
    }

}
