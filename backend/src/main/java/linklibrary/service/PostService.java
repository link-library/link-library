package linklibrary.service;

import linklibrary.dto.PostDto;
import linklibrary.entity.Post;
import linklibrary.mapper.PostMapper;
import linklibrary.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository PostRepository;

    // 포스트 저장
    public PostDto createPost(PostDto postDto) throws IOException {
        Post post = PostMapper.convertToModel(postDto);
        this.PostRepository.save(post);
        return PostMapper.convertToDto(post);

    }


}
