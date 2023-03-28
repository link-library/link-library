package linklibrary.repository;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostDto1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {
    Page<PostDto1> findPostDtos(Long userId, String bookmark, String sort, String keyword, Pageable pageable);
}
