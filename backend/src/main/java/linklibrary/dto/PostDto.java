package linklibrary.dto;

import linklibrary.entity.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostDto {

    private Long postId;
    private String title;
    private String memo;
    private String url;
    private Category category;
}
