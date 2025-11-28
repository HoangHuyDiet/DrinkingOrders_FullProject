package com.codewiithhoang.drinkingorders.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_name", unique = true, nullable = false) // Ánh xạ đúng tên cột user_name
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(name = "full_name")
  private String fullName;

  private String email;

  private String role; // ADMIN, STAFF, USER

  // Quan hệ 1-N với Order
  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Order> orders;
}