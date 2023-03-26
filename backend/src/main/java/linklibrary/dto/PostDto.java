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
   Long id;
    String title;
    String memo;

    String url;
    boolean bookmark;
<<<<<<< HEAD

    //Category category;
    String category;
//    private User user;
  private Long userId;
  private String nickname;

    LocalDateTime createdAt;
=======
    Category category;
    private User user;
>>>>>>> parent of 0fe8305 (Merge pull request #50 from link-library/plan11plan)

}
