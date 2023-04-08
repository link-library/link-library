package linklibrary.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Schema(title = "로그아웃 요청", description = "로그인된 토큰의 남은 유효 시간동안 블랙리스트에 올림 ")
public class LogoutDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    @NotEmpty(message = "잘못된 요청입니다")
    @Schema(title = "로그아웃 요청", example = "쫘르르.. 로그인된 토큰 가져옴. 직접 입력하지 않음. ")
    private String accessToken;
}
