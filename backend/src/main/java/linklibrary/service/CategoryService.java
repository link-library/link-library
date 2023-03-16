package linklibrary.service;

import linklibrary.dto.CategoryDto;
import linklibrary.entity.Category;
import linklibrary.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getCategoryList() {
        List<CategoryDto> result = categoryRepository.findAll().stream().map(CategoryDto::of).collect(Collectors.toList());
        return result;
    }

    //init 하기 위해 만든 임시 메소드
    public void initDb() {
        Category category1 = Category.builder().name("부모1").depth(1L).build();
        Category category2 = Category.builder().name("부모2").depth(1L).build();
        Category category3 = Category.builder().name("자식1").depth(2L).parent(category1).build();
        Category category4 = Category.builder().name("자식2").depth(2L).parent(category2).build();

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
    }

}
