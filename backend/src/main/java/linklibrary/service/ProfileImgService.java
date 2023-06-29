package linklibrary.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import linklibrary.entity.ProfileImg;
import linklibrary.entity.User;
import linklibrary.repository.ProfileImgRepository;
import linklibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProfileImgService {
    private final ProfileImgRepository profileImgRepository;
    private final UserRepository userRepository;
    private final AmazonS3Client amazonS3Client;
    

    @Value("${file.dir}")
    String fileDir;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * s3 이미지 업로드
     */
    public String uploadImgS3(MultipartFile multipartFile, Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("엔티티를 찾을 수 없습니다.[ProfileImgService]"));

            //기존 이미지 있을 시 repo, s3 에서 제거
            if(user.getProfileImg() != null) {
                log.info("기존에 프로필 사진 있음");
                ProfileImg deleteImg = user.getProfileImg();
                log.info("wwwwwwwww");
                System.out.println(deleteImg.getId());
                profileImgRepository.deleteById(deleteImg.getId());
                log.info("wwwwwwwww");

                amazonS3Client.deleteObject(bucket, deleteImg.getStoreFileName());
            }
            
            String uuid = UUID.randomUUID().toString();
            //저장될 파일명
            String fileName = uuid + multipartFile.getOriginalFilename();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            metadata.setContentLength(multipartFile.getSize());
            amazonS3Client.putObject(bucket, fileName, multipartFile.getInputStream(), metadata);

            ProfileImg profileImg = ProfileImg.builder().user(user).storeFileName(fileName).build();
            profileImgRepository.save(profileImg);

            //삭제한 profileImg 가 연결되어 있으니 트랜잭션 커밋 시 delete 쿼리가 나가지 않음
            //따라서 새 프로필 이미지로 세팅 해줘야 함
            user.setProfileImg(profileImg);
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * s3 이미지 반환
     */
    public String getImgPath(String fileName) {
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }


    /**
     * 아래는 로컬에 사진 저장 로직입니다
     */
    public ProfileImg uploadImg(MultipartFile multipartFile, Long userId) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("업로드할 파일이 넘어오지 않았습니다.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("엔티티를 찾을 수 없습니다.[ProfileImgService]"));
        //기존에 프로필 사진이 있다면
        //로컬 저장소에서 삭제, db에서 삭제
        if (user.getProfileImg() != null) {
            log.info("기존 프로필 사진 있음");
            ProfileImg deleteImg = user.getProfileImg();
            profileImgRepository.deleteById(deleteImg.getId());

            File file = new File(getFullPath(deleteImg.getStoreFileName()));
            boolean delete = file.delete();
            if (delete) log.info("기존 파일 로컬에서 삭제 완료");
            else log.info("기존 파일 로컬에서 삭제 실패");
        }

        String originalFileName = multipartFile.getOriginalFilename();
        log.info("originalFileName= " + originalFileName);
        String storeFileName = createStoreFileName(originalFileName);
        log.info("storeFileName= " + storeFileName);
        multipartFile.transferTo(new File(getFullPath(storeFileName))); //fileDir 경로 파일에 사진 저장
        log.info("저장 경로= " + getFullPath(storeFileName) + " , 저장 완료");

        ProfileImg profileImg = ProfileImg.builder().user(user).storeFileName(storeFileName).build();
        profileImgRepository.save(profileImg);

        //삭제한 profileImg 가 연결되어 있으니 트랜잭션 커밋 시 delete 쿼리가 나가지 않음
        //따라서 새 프로필 이미지로 세팅 해줘야 함
        user.setProfileImg(profileImg);
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