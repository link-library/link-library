package linklibrary.service;

import linklibrary.dto.CategoryDto;
import linklibrary.entity.Category;
import linklibrary.entity.User;
import linklibrary.repository.CategoryRepository;
import linklibrary.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class CategoryServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    CategoryService categoryService;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserService userService;
    @Autowired
    private UserRepository userRepository;


    @Test
    public void 카테고리생성() {
        //gien
        User user = createUser();
        CategoryDto categoryDto = getCategoryDto();
        //when
        Long savedCategory = categoryService.createCategory(categoryDto, user);
        //then
        Category category = categoryRepository.findById(savedCategory).get();
        assertThat(category.getName()).isEqualTo("카테고리ex1");
    }



    @Test
    public void 카테고리수정() throws Exception {
        //given
        User user = createUser();
        Category category = createCategory(user); //name = 카테고리
        CategoryDto categoryDto = getCategoryDto(); //name = 카테고리ex1
        //when
        Long editCategoryId = categoryService.editCategory(categoryDto, category.getId());
        //then
        Category editCategory = categoryRepository.findById(editCategoryId).get();
        assertThat(editCategory.getName()).isEqualTo(categoryDto.getName());
    }

    @Test
    public void 카테고리삭제() throws Exception {
        //given
        User user = createUser();
        Category category = createCategory(user);
        //when
        categoryService.deleteCategory(category.getId());
        //then
        //없는 카테고리를 찾았을 때 NoSuchElementException 발생
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            categoryRepository.findById(category.getId()).get();
        });
    }

    @Test
    public void 카테고리조회() throws Exception {
        //given
        User user = createUser();
        createCategoryList(user); //카테고리 20개 생성
        //when
        System.out.println("user.getId() = " + user.getId());
        List<CategoryDto> categoryDtoList = categoryService.findAll(user.getId());
        //then
        for (CategoryDto categoryDto : categoryDtoList) {
            System.out.println(categoryDto.getName());
        }

    }

    public User createUser() {
        User user = User.builder().loginId("abcde").password("aaaaaaaa1!").nickname("nick").build();
        em.persist(user);
        return user;
    }

    public Category createCategory(User user) {
        Category category = Category.builder().name("카테고리").user(user).build();
        em.persist(category);
        return category;
    }

    public void createCategoryList(User user) {
        for(int i = 0; i<20; i++){
            Category category = Category.builder().name("카테고리"+i).user(user).build();
            em.persist(category);
        }
    }

    private CategoryDto getCategoryDto() {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName("카테고리ex1");
        return categoryDto;
    }

}