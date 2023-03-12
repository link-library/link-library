package linklibrary.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="Users")
@Data
public class User {

    @Id @GeneratedValue
    private Long id;
}
