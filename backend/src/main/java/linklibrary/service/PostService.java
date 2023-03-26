package linklibrary.service;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostFormDto;
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
     * 포스트 저장
     */
<<<<<<< HEAD
    public Long createPost(PostFormDto postFormDto, User user) throws IOException {
        Category category = null;
        if (postFormDto.getCategoryId() != null) {
            category = categoryRepository.findById(postFormDto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("카테고리 엔티티가 없습니다"));
        }

        Post post = Post.builder()
                .title(postFormDto.getTitle())
                .memo(postFormDto.getMemo())
                .url(postFormDto.getUrl())
                .category(category)
                .user(user)
                .bookmark(postFormDto.getBookmark())
                .createdBy(user.getNickname())
                .build();

        this.postRepository.save(post);
        return post.getPostId();
=======
    public Long createPost(PostFormDto postFormDto) throws IOException {
        Post post = PostMapper.convertToModel(postFormDto);
        this.postRepository.save(post);
        return post.getId();

>>>>>>> parent of 0fe8305 (Merge pull request #50 from link-library/plan11plan)
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
//    public Long change(Long postId, PostFormDto postFormDto) {
//        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("포스트 엔티티가 없습니다"));
//
//        post.setTitle(postFormDto.getTitle());
//        post.setMemo(postFormDto.getMemo());
//        post.setUrl(postFormDto.getUrl());
//        post.setCategory(categoryRepository.findByName(postFormDto.getCategory()));
//        return post.getPostId();
//
//    }
    public Long change(Long postId, PostFormDto postFormDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("포스트 엔티티가 없습니다"));

        post.setTitle(postFormDto.getTitle());
        post.setMemo(postFormDto.getMemo());
        post.setUrl(postFormDto.getUrl());
<<<<<<< HEAD
=======
        post.setCategory(postFormDto.getCategory());
        return post.getId();
>>>>>>> parent of 0fe8305 (Merge pull request #50 from link-library/plan11plan)

        Category category = null;

        if (postFormDto.getCategoryId() != null) {
            category = categoryRepository.findById(postFormDto.getCategoryId()).orElse(null);
        }

        post.setCategory(category);
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
    public List<PostDto> getPostList(User user, String keyword, String sort, Boolean bookmark) {
        List<Post> posts;
        if (bookmark != null) { //북마크 해준 경우
            if (Objects.equals(sort, "byName")) {
                posts = postRepository.findByBookmarkAndTitleContainingOrderByTitleAsc(bookmark, keyword);
            } else if (Objects.equals(sort, "byDate")) {
                posts = postRepository.findByBookmarkAndTitleContainingOrderByCreatedAtDesc(bookmark, keyword);
            } else {
                throw new IllegalArgumentException("알 수 없는 정렬 기준입니다");
            }
        } else { //북마크 안 해준 경우
            if (Objects.equals(sort, "byName")) {
                posts = postRepository.findByTitleContainingOrderByTitleAsc(keyword);
            } else if (Objects.equals(sort, "byDate")) {
                posts = postRepository.findByTitleContainingOrderByCreatedAtDesc(keyword);
            } else {
                throw new IllegalArgumentException("알 수 없는 정렬 기준입니다");
            }
        }

        List<PostDto> postDtos = PostMapper.convertToDtoListAll(user, posts);
        return postDtos;
    }


<<<<<<< HEAD
=======

<<<<<<< HEAD



}
=======
>>>>>>> parent of 0fe8305 (Merge pull request #50 from link-library/plan11plan)
}

>>>>>>> 09c891e045012e848bcc570a28a7073c4cd5e621
