package linklibrary.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="Users")
@Getter
@Setter
public class User {

    @Id @GeneratedValue
    private String id;
}
