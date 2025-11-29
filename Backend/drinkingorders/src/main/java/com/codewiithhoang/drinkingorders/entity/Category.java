package com.codewiithhoang.drinkingorders.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  // Quan hệ 1-N với Product
  // mappedBy="category" nghĩa là bên Product sẽ có thuộc tính tên là "category"
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Product> products;
}