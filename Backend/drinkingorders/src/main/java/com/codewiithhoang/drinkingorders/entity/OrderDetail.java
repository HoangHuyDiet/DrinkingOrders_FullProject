package com.codewiithhoang.drinkingorders.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "order_details")
@Data
public class OrderDetail {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer quantity;

  private BigDecimal price; // Giá lúc mua (quan trọng)

  // Nối về Order
  @ManyToOne
  @JoinColumn(name = "order_id")
  private Order order;

  // Nối về Product
  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

}