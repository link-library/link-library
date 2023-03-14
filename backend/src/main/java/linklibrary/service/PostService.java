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
    public Long change(Long postId, PostFormDto postFormDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("엔티티가 없습니다"));
//        Optional<Post> post = postRepository.findById(postId);
//        if (post.isEmpty()) {
//            throw new NoSuchElementException(String.format("Post ID '%d'가 존재하지 않습니다", postId));
//        }
//        Post updatePost = post.get();
//        updatePost.setPostId(postFormDto.getPostId()); //아이디 안 바뀜
        post.setTitle(postFormDto.getTitle());
        post.setMemo(postFormDto.getMemo());
        post.setUrl(postFormDto.getUrl());
        post.setCategory(postFormDto.getCategory());
        return post.getId();

//        Post savedPost = postRepository.save(updatePost); // 변경감지로 save 안 해도 됨
    }

}
