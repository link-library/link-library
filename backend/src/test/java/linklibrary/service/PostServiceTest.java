package linklibrary.service;

import linklibrary.dto.PostFormDto;
import linklibrary.entity.Category;
import linklibrary.entity.Post;
import linklibrary.entity.Role;
import linklibrary.entity.User;
import linklibrary.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    EntityManager em;

    @Autowired
    PostService postService;
    @Autowired
    PostRepository postRepository;

    @Test
    public void 포스트생성() throws Exception {
        //given
        User user = createUser();
        Category category = createCategory(user);
        PostFormDto postFormDto = createPostForm(category);
        //when
        Long savedPostId = postService.createPost(postFormDto, user);
        //then
        Post post = postRepository.findById(savedPostId).get();
        assertThat(post.getTitle()).isEqualTo(postFormDto.getTitle()); //title 비교
        assertThat(post.getMemo()).isEqualTo(postFormDto.getMemo()); //memo 비교
        assertThat(post.getUrl()).isEqualTo(postFormDto.getUrl()); //url 비교
        assertThat(post.getCategory().getId()).isEqualTo(postFormDto.getCategoryId()); //카테고리 id 비교
    }

    private PostFormDto createPostForm(Category category) {
        return PostFormDto.builder().title("제목1").memo("메모1").url("www.abc.com").bookmark(true).categoryId(category.getId()).build();
    }

    private User createUser() {
        User user = User.builder().loginId("abcde").password("abcdefg1!").nickname("nickname").role(Role.ROLE_USER).build();
        em.persist(user);
        return user;
    }

    private Category createCategory(User user) {
        Category category = Category.builder().name("카테고리1").user(user).build();
        em.persist(category);
        return category;
    }
}