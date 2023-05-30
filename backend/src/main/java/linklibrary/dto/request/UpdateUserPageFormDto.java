package linklibrary.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(title = "유저 수정 마이페이지 응답", description = "유저 수정 마이페이지 응답")
public class UpdateUserPageFormDto {


    @Schema(title = "유저 닉네임", example = "nickname1")
    private String nickname; //닉네임

    //    @Schema(title = "유저가 저장한 파일이름", description = "...")
//    private String storeFileName; //저장된 파일 이름.
    @Schema(title = "유저 패스워드", description = "abcdefg1!")
    private String password;
}