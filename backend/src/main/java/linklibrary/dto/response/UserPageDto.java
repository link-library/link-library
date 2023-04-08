package linklibrary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(title = "유저 마이페이지 응답", description = "유저 마이페이지 응답")
public class UserPageDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.


    @Schema(title = "유저 ID", description = "1")
    private Long userId;

    @Schema(title = "유저 닉네임",example ="nickname1")
    private String nickname; //닉네임
    @Schema(title = "유저의 포스트 개수", description = "2")
    private Integer totalPost; //총 post 수
    @Schema(title = "유저가 저장한 파일이름", description = "...")
    private String storeFileName; //저장된 파일 이름.
}
