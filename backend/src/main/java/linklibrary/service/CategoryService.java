package linklibrary.service;

import linklibrary.dto.CategoryDto;
import linklibrary.entity.Category;
import linklibrary.entity.User;
import linklibrary.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Long createCategory(CategoryDto categoryDto, User user) {
        Category category = Category.builder().name(categoryDto.getName()).user(user).build();
        categoryRepository.save(category);
        return category.getId();
    }

    public Long editCategory(CategoryDto categoryDto, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("카테고리 엔티티가 없습니다"));
        category.setName(categoryDto.getName());
        return category.getId();
    }

    /**
     * 회원에 해당하는 카테고리 전부 반환
     */
    @Transactional(readOnly = true)
    public List<CategoryDto> findAll(Long userId) {
        List<Category> categoryList = categoryRepository.findByUserId(userId);//회원에 해당하는 카테고리들 반환
        List<CategoryDto> categoryDtoList =
                categoryList.stream()
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .collect(Collectors.toList());
        return categoryDtoList;
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
