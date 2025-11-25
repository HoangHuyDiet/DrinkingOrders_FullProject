package com.codewiithhoang.drinkingorders.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDTO {
  private String name;
  private BigDecimal price;
  private String image;
  private String description;
  private Long category_id;
}
