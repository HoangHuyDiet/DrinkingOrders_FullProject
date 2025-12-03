package com.codewiithhoang.drinkingorders.service;

import com.codewiithhoang.drinkingorders.dto.OrderDTO;
import com.codewiithhoang.drinkingorders.entity.*;
import com.codewiithhoang.drinkingorders.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private OrderDetailRepository orderDetailRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public Order placeOrder(OrderDTO dto) {
    //1. Kiểm tra user có tồn tại hay không
    User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User không tồn tại !"));
    //2. Tạo đơn hàng mới.
    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDateTime.now());
    order.setStatus("PENDING");
    order.setAddress(dto.getAddress());
    order.setPhone(dto.getPhone());
    order.setTotalPrice(BigDecimal.ZERO);

    //Lưu đơn hàng trước để lấy ID
    order = orderRepository.save(order);

    //3. Duyệt qua từng món trong giỏ hàng để tạo Chi tiết (OrderDetail)
    BigDecimal totalAmount = BigDecimal.ZERO;

    for (OrderDTO.CartItem item : dto.getItems()) {
      // Lấy sản phẩm để check giá
      Product product = productRepository.findById(item.getProductId())
          .orElseThrow(() -> new RuntimeException("Sản phẩm ID " + item.getProductId() + " không còn bán!"));

      //Kiểm tra trừ tồn kho
      int currentStock = product.getQuantity() == null ? 0 : product.getQuantity();
      int buyQuantity = item.getQuantity();

      // 1. Kiểm tra: Nếu mua nhiều hơn tồn kho -> Báo lỗi ngay
      if (currentStock < buyQuantity && currentStock > 0) {
        throw new RuntimeException("Món: '" + product.getName() + "' chỉ còn " + currentStock + " ly, không đủ bán!");
      }
      else if (currentStock == 0) {
        throw new RuntimeException("Món '" + product.getName() + "' đã hết, bạn hãy quay lại vào hôm sau nhé!" );
      }
      // 2. Trừ kho: Tồn mới = Tồn cũ - Mua
      product.setQuantity(currentStock - buyQuantity);

      // 3. Lưu số lượng mới vào Database
      productRepository.save(product);

      // Khởi tạo chi tiết đơn hàng
      OrderDetail detail = new OrderDetail();
      detail.setOrder(order);           // Gán vào đơn hàng cha
      detail.setProduct(product);       // Gán sản phẩm
      detail.setQuantity(item.getQuantity()); // Gán số lượng
      detail.setPrice(product.getPrice());    // Gán giá tại thời điểm mua

      orderDetailRepository.save(detail);

      // Tính tổng tiền
      BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
      totalAmount = totalAmount.add(lineTotal);
    }
    order.setTotalPrice(totalAmount);
    return orderRepository.save(order);
  }

  //1. Lấy tất cả đơn hàng cho (admin / nhân viên xem)
  public java.util.List<Order> getAllOrders() {
    //Sort theo ngày mới nhất lên đầu
    return orderRepository.findAll(org.springframework.data.domain.Sort.by(Direction.DESC, "orderDate"));
  }

  //2. Cập nhập trạng thái đơn
  public Order updateOrderStatus(Long orderId, String newStatus) {
    Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

    order.setStatus(newStatus);
    return orderRepository.save(order);
  }
}
