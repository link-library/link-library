package linklibrary.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = "카테고리 작명 요청", description = "카테고리 작명 하기")
public class CategoryFormDto {
    @Schema(title = "제목", example = "카테고리1")
    private String name;
}
