package com.codewiithhoang.drinkingorders.controller;

import com.codewiithhoang.drinkingorders.dto.OrderDTO;
import com.codewiithhoang.drinkingorders.entity.Order;
import com.codewiithhoang.drinkingorders.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

  @Autowired
  private OrderService orderService;

  // API Đặt hàng: POST /api/orders
  @PostMapping
  public ResponseEntity<?> placeOrder(@RequestBody OrderDTO orderDTO) {
    try {
      Order newOrder = orderService.placeOrder(orderDTO);
      return ResponseEntity.ok(newOrder);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
  // API: Xem danh sách đơn hàng
  // GET http://localhost:8080/api/orders
  @GetMapping
  public ResponseEntity<?> getAllOrders() {
    return ResponseEntity.ok(orderService.getAllOrders());
  }

  // API: Cập nhật trạng thái
  // PUT http://localhost:8080/api/orders/{id}/status?status=SHIPPED
  @PutMapping("/{id}/status")
  public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
    try {
      return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
    catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  //API: Xem lịch sử đơn hàng
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Order>> getHistory(@PathVariable Long userId) {
    return ResponseEntity.ok(orderService.getOrdersByUser(userId));
  }
}