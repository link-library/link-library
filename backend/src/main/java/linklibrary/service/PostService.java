package linklibrary.service;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostFormDto;
import linklibrary.entity.Category;
import linklibrary.entity.Post;
import linklibrary.entity.User;
import linklibrary.mapper.PostMapper;
import linklibrary.repository.CategoryRepository;
import linklibrary.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    /**
     * 포스트 생성
     */
    public Long createPost(PostFormDto postFormDto, User user) throws IOException {
        Post post = Post.builder().title(postFormDto.getTitle())
                .memo(postFormDto.getMemo())
                .url(postFormDto.getUrl())
                .category(postFormDto.getCategory())
                .user(user)
                .bookmark(postFormDto.getBookmark())
                .createdBy(user.getNickname())
                .build();
        this.postRepository.save(post);
        return post.getPostId();

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
        return post.getPostId();

    }
    /**
     * 포스트 목록 전체 조회
     */
    /**
     * <p>
     * posts에 있는 각 앨범을 하나씩 하나씩 `PostMapper.converToDto`로 변화시킨 이후 리스트형태로 다시 모읍니다
     * `collect(Collectors.toList())`.
     */

    public List<PostDto> getPostList(Long userId, String keyword, String sort, Boolean bookmark) {
        List<Post> posts;
        if (bookmark != null) { // 북마크 해준 경우
            if (Objects.equals(sort, "byName")) {
                posts = postRepository.findByUserIdAndBookmarkAndTitleContainingOrderByTitleAsc(userId, bookmark, keyword);
            } else { // "byDate"를 기본값으로 사용
                posts = postRepository.findByUserIdAndBookmarkAndTitleContainingOrderByCreatedAtDesc(userId, bookmark, keyword);
            }
        } else { // 북마크 안 해준 경우
            if (Objects.equals(sort, "byName")) {
                posts = postRepository.findByUserIdAndTitleContainingOrderByTitleAsc(userId, keyword);
            } else { // "byDate"를 기본값으로 사용
                posts = postRepository.findByUserIdAndTitleContainingOrderByCreatedAtDesc(userId, keyword);
            }
        }

        return PostMapper.convertToDtoListAll(posts);
    }


    public List<PostDto> getPostListByCategoryName(Long userId, String keyword, String sort, String categoryName) {
        List<Post> posts;

        if (Objects.equals(sort, "byName")) {
            posts = postRepository.findByUserIdAndCategoryNameAndTitleContainingOrderByTitleAsc(userId, categoryName, keyword);
        } else { // "byDate"를 기본값으로 사용
            posts = postRepository.findByUserIdAndCategoryNameAndTitleContainingOrderByCreatedAtDesc(userId, categoryName, keyword);
        }
        return PostMapper.convertToDtoListAll(posts);
    }
}
