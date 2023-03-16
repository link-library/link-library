package linklibrary.repository;

import linklibrary.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 부모 카테고리들만 조회해서 하위카테고리 까지 다 불러오기 위해 where 문 걸어줌
    @Query("select c from Category c where c.parent is NULL")
    public List<Category> findAll();

}
