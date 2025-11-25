package com.codewiithhoang.drinkingorders.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private BigDecimal price;

  @Column(columnDefinition = "TEXT")
  private String description;

  private String image; // Lưu URL ảnh

  // Quan hệ N-1 với Category
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false) // Tên cột trong DB
  @JsonIgnore // Để tránh vòng lặp vô tận khi chuyển sang JSON
  private Category category;

  // Quan hệ 1-N với OrderDetail (Một món nằm trong nhiều hóa đơn)
  @OneToMany(mappedBy = "product")
  @JsonIgnore
  private List<OrderDetail> orderDetails;
}