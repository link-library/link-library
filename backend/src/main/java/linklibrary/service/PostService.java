package linklibrary.service;

import linklibrary.dto.*;
import linklibrary.entity.Category;
import linklibrary.entity.Post;
import linklibrary.entity.User;
import linklibrary.mapper.PostMapper;
import linklibrary.repository.CategoryRepository;
import linklibrary.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public Integer findTotalPostNumberByUser(Long userId) {
        /**
         * //찜목록, 카테고리별 개수가 아닌 전체 개수만 가져와져서 수정해야됩니다.
         */
        Integer totalPostNumberByUser = postRepository.findTotalPostNumberByUser(userId);
        return totalPostNumberByUser;
    }

    public MainPageDto getPosts(Long userId, String bookmark, String sort, String keyword, Pageable pageable) {
        List<Category> categories = categoryRepository.findByUserId(userId);
        List<CategoryDto> categoryDtoList = categories.stream()
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .collect(Collectors.toList());

        Page<PostDto1> postDtos = postRepository.findPostDtos(userId, bookmark, sort, keyword, pageable);
        long totalPost = postDtos.getTotalElements();
        MainPageDto mainPageDto = MainPageDto.builder()
                .categoryDtoList(categoryDtoList)
                .postDtoList(postDtos)
                .total(totalPost)
                .currentCategory((bookmark.equals("true") ? "찜목록" : "전체 조회"))
                .build();
        return mainPageDto;
    }
}
