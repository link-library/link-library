package linklibrary.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class PostDto {
    Long postId;
    String title;
    String memo;

    String url;
    boolean bookmark;

    private Long categoryId;

    private String categoryName;

    private Long userId;
    private String nickname;

    LocalDateTime createdAt;

}
