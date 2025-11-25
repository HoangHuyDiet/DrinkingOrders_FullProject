package  com.codewiithhoang.drinkingorders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RevenueDTO {
  private String date;
  private BigDecimal total;
}