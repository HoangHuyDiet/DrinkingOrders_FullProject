package com.codewiithhoang.drinkingorders.repository;

import com.codewiithhoang.drinkingorders.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  //Thống kê doanh thu theo ngày (chỉ tính những đơn không bị HỦY)
  @org.springframework.data.jpa.repository.Query(
      value = "SELECT DATE(order_date) as date, SUM(total_price) as total " +
              "FROM orders " +
              "WHERE status != 'CANCELLED' " +
              "GROUP BY DATE(order_date) " +
              "ORDER BY date DESC",
      nativeQuery = true)
  List<Object[]> getRevenueByDate();

  List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
}
