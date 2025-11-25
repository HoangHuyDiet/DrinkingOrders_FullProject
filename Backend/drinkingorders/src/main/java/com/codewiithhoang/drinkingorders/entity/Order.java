package com.codewiithhoang.drinkingorders.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // Tên cột trong hình là total_price
  @Column(name = "total_price")
  private BigDecimal totalPrice;

  @Column(name = "order_date")
  private LocalDateTime orderDate; // Dùng LocalDateTime cho chuẩn Java 8+

  private String status; // PENDING, SHIPPING...

  private String address;
  private String phone;

  // Quan hệ N-1 với User
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  // Quan hệ 1-N với OrderDetail
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetails;
}