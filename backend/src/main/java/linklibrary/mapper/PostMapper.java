package linklibrary.mapper;

import linklibrary.dto.PostDto;
import linklibrary.dto.PostFormDto;
import linklibrary.entity.Post;

import java.util.List;
import java.util.stream.Collectors;

public class PostMapper {
    /**
     * Mapper는 온전히 값을 매핑해주는 용도이기 때문에 객체를 만들 필요가 없으니 static 메서드로 만듬.
     */
    // Post -> PostDto
    public static PostFormDto convertToDto (Post post) {
        PostFormDto postFormDto = new PostFormDto();
//        postFormDto.setPostId(post.getId());
        postFormDto.setTitle(post.getTitle());
        postFormDto.setUrl(post.getUrl());
        postFormDto.setCategory(post.getCategory());
        return postFormDto;
    }

    // PostDto -> Post
    public static Post convertToModel(PostFormDto postFormDto) {
        Post post = new Post();
//        post.setId(postFormDto.getPostId());
        post.setTitle(postFormDto.getTitle());
        post.setUrl(postFormDto.getUrl());
        post.setCategory(postFormDto.getCategory());
        return post;
    }

    // post 리스트 -> postDto 리스트 변환 , 위에 만든 Post->PostDto 반복문으로 재활용.
    public static List<PostFormDto> convertToDtoList(List<Post> posts) {
        return posts.stream().map(PostMapper::convertToDto).collect(Collectors.toList());
        /** 요소들을 Dto로 가공하였다면 collect 를 이용하여 결과를 리턴받을 수 있음 */
    }

    /**조회용 DTO 만듬.
     * 데이터 생략없이 전부 보여주는 폼이 필요한 상태.
     * */
    public static PostDto convertToDtoAll(Post post){
        PostDto postDto = new PostDto();


        return postDto;
    }
    public static List<PostDto> convertToDtoListAll(List<Post> posts) {
        return posts.stream().map(PostMapper::convertToDtoAll).collect(Collectors.toList());
        /** 요소들을 Dto로 가공하였다면 collect 를 이용하여 결과를 리턴받을 수 있음 */
    }


}
