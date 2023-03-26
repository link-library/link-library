package linklibrary.dto;

import linklibrary.entity.Category;
import linklibrary.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ToString
public class PostDto {
   Long postId;
    String title;
    String memo;

    String url;
    boolean bookmark;

    Category category;
//    private User user;
  private Long userId;
  private String nickname;
}
