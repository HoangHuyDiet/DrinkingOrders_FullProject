package com.codewiithhoang.drinkingorders.service;

import com.codewiithhoang.drinkingorders.dto.RevenueDTO;
import com.codewiithhoang.drinkingorders.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.math.BigDecimal;

@Service
public class StatisticsService {

  @Autowired
  private OrderRepository orderRepository;

  public List<RevenueDTO> getRevenueStats() {
    List<Object[]> results = orderRepository.getRevenueByDate();
    List<RevenueDTO> stats = new ArrayList<>();

    for (Object[] row : results) {
      String date = row[0].toString();
      BigDecimal total = (BigDecimal) row[1];
      stats.add(new RevenueDTO(date, total));
    }

    return stats;
  }
}