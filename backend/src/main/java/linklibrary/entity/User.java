package linklibrary.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="Users")
public class User {

    @Id @GeneratedValue
    private Long id;
}
