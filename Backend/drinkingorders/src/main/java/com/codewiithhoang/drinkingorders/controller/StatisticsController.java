package com.codewiithhoang.drinkingorders.controller;

import com.codewiithhoang.drinkingorders.dto.RevenueDTO;
import com.codewiithhoang.drinkingorders.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatisticsController {

  @Autowired
  private StatisticsService statisticsService;

  @GetMapping("/revenue")
  public ResponseEntity<List<RevenueDTO>> getRevenue() {
    return ResponseEntity.ok(statisticsService.getRevenueStats());
  }
}