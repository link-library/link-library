package linklibrary.dto;

import linklibrary.entity.Category;
import linklibrary.entity.User;

import javax.validation.constraints.NotEmpty;

public class PostDto {
   Long id;
    @NotEmpty
    String title;
    String memo;

    String url;
    boolean bookmark;
    Category category;
    private User user;

}
