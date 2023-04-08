package linklibrary.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * 프로필 이미지 업로드 시 받아오는 DTO
 */
@Data
@AllArgsConstructor
@Schema(title = "프로필 이미지 요청", description = "프로필 이미지 요청받기 ")
public class ProfileImgDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    private MultipartFile profileImg;
}
