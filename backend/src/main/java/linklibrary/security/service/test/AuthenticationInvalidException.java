package linklibrary.security.service.test;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AuthenticationInvalidException extends RuntimeException{
    public AuthenticationInvalidException(String message) {
        super(message);
    }
}
