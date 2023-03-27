package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * 프로필 이미지 업로드 시 받아오는 DTO
 */
@Data
@AllArgsConstructor
public class ProfileImgDto {
    private MultipartFile profileImg;
}
