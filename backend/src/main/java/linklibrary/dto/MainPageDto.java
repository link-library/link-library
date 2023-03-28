package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MainPageDto {

    private List<CategoryDto> categoryDtoList;
    private Page<PostDto1> postDtoList;
    private Long total;
    private String currentCategory;
}
