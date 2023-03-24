package linklibrary.service;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostFormDto;
import linklibrary.entity.Post;
import linklibrary.mapper.PostMapper;
import linklibrary.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("포스트 엔티티가 없습니다"));
        postRepository.delete(post);
    }

    /**
     * 포스트 수정
     */
    public Long change(Long postId, PostFormDto postFormDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("포스트 엔티티가 없습니다"));

        post.setTitle(postFormDto.getTitle());
        post.setMemo(postFormDto.getMemo());
        post.setUrl(postFormDto.getUrl());
        post.setCategory(postFormDto.getCategory());
        return post.getId();

    }
    /**
     * 포스트 목록 전체 조회
     */
    /**
     * <p>
     * posts에 있는 각 앨범을 하나씩 하나씩 `PostMapper.converToDto`로 변화시킨 이후 리스트형태로 다시 모읍니다
     * `collect(Collectors.toList())`.
     */
    public List<PostDto> getPostList(String keyword, String sort) {
        List<Post> posts;
        if (Objects.equals(sort, "byName")) {
            posts = postRepository.findByTitleContainingOrderByTitleAsc(keyword);
        } else if (Objects.equals(sort, "byDate")) {
            posts = postRepository.findByTitleContainingOrderByCreatedAtDesc(keyword);
        } else {
            throw new IllegalArgumentException("알 수 없는 정렬 기준입니다");
        }
        //
        List<PostDto> postDtos = PostMapper.convertToDtoListAll(posts);
        return postDtos;
    }



}
