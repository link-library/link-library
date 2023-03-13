package linklibrary.mapper;

import linklibrary.dto.PostDto;
import linklibrary.entity.Post;

import java.util.List;
import java.util.stream.Collectors;

public class PostMapper {
    /**
     * Mapper는 온전히 값을 매핑해주는 용도이기 때문에 객체를 만들 필요가 없으니 static 메서드로 만듬.
     */
    // Post -> PostDto
    public static PostDto convertToDto (Post post) {
        PostDto postDto = new PostDto();
        postDto.setPostId(post.getPostId());
        postDto.setTitle(post.getTitle());
        postDto.setUrl(post.getUrl());
        postDto.setCategory(post.getCategory());
        return postDto;
    }

    // PostDto -> Post
    public static Post convertToModel(PostDto postDto) {
        Post post = new Post();
        post.setPostId(postDto.getPostId());
        post.setTitle(postDto.getTitle());
        post.setUrl(postDto.getUrl());
        post.setCategory(postDto.getCategory());
        return post;
    }

    // post 리스트 -> postDto 리스트 변환 , 위에 만든 Post->PostDto 반복문으로 재활용.
    public static List<PostDto> convertToDtoList(List<Post> posts) {
        return posts.stream().map(PostMapper::convertToDto).collect(Collectors.toList());
        /** 요소들을 Dto로 가공하였다면 collect 를 이용하여 결과를 리턴받을 수 있음 */
    }
}
