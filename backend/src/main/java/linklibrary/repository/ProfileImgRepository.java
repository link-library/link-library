package linklibrary.repository;

import linklibrary.entity.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {

    @Modifying
    @Query("delete from ProfileImg p where p.id = :id")
    void deleteById(@Param("id") Long id);

}


