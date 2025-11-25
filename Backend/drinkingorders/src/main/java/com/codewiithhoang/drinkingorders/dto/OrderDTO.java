package com.codewiithhoang.drinkingorders.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderDTO {
  private Long userId;
  private String address;
  private String phone;
  private List<CartItem> items;

  @Data
  public static class CartItem {
    private Long productId;
    private Integer quantity;
  }
}
