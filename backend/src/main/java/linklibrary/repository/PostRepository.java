package linklibrary.repository;

import linklibrary.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    //포스트검색 + 제목명 A-Z 정렬:
    List<Post> findByTitleContainingOrderByTitleAsc(String title);

    //포스트검색 + 생성날짜 최신순:
    List<Post> findByTitleContainingOrderByCreatedAtDesc(String title);
}
