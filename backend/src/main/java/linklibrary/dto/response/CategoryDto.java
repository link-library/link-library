package linklibrary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = " 카테고리 ID", description = "카테고리 작명 하기")
public class CategoryDto {
//@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.

    @Schema(title = " 카테고리 ID", example = "1")
    private Long categoryId;
    @Schema(title = " 카테고리 이름", example = "영화")
    @NotBlank(message = "카테고리명을 입력해주세요.")
    private String name;

}
