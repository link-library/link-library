package linklibrary.service;

import linklibrary.entity.ProfileImg;
import linklibrary.entity.User;
import linklibrary.repository.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProfileImgService {
    private final ProfileImgRepository profileImgRepository;

    @Value("${file.dir}")
    String fileDir;

    public ProfileImg uploadImg(MultipartFile multipartFile, User user)throws IOException {
        if(multipartFile.isEmpty()) return null;

        String originalFileName = multipartFile.getOriginalFilename();
        log.info("originalFileName= " + originalFileName);
        String storeFileName = createStoreFileName(originalFileName);
        log.info("storeFileName= " + storeFileName);
        System.out.println(getFullPath(storeFileName));
        multipartFile.transferTo(new File(getFullPath(storeFileName))); //fileDir 경로 파일에 사진 저장
        log.info("사진 저장");
        ProfileImg profileImg = ProfileImg.builder().storeFileName(storeFileName).user(user).build();
        profileImgRepository.save(profileImg);
        return profileImg;
    }

    /**
     * ex) C:/Users/(storeFileName).jpg 반환
     */
    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    /**
     * 이름 중복을 피하기 위해 UUID.(파일타입) 로 storeFileName 생성
     */
    private String createStoreFileName(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String storeFileName = uuid + "." + extractExt(originalFilename); //qweqwewqe.png
        return storeFileName;
    }

    /**
     * 파일 타입 추출 메서드
     */
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(pos + 1);
        return ext;
    }
}
