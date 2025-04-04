package com.example.Raf_DB.Repository;
import com.example.Raf_DB.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}