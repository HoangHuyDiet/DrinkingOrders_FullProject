package com.codewiithhoang.drinkingorders.controller;

import com.codewiithhoang.drinkingorders.entity.User;
import com.codewiithhoang.drinkingorders.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
    String username = loginData.get("username");
    String password = loginData.get("password");

    // 1. Tìm user trong DB
    User user = userRepository.findByUsername(username).orElse(null);
    // 2. Kiểm tra mật khẩu (So sánh chuỗi thô)
    if (user != null && user.getPassword().equals(password)) {
      // Xoá password trước khi trả về tạo hiệu ứng đã đăng nhập thành công
      user.setPassword(null);
      return ResponseEntity.ok(user); // Trả về user có vai trò gì
    } else {
      return ResponseEntity.status(401).body("Sai tài khoản hoặc mật khẩu");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      return ResponseEntity.badRequest().body("Tên đăng nhập đã tồn tại");
    }

    // Mặc định là khách hàng
    if (user.getRole() == null) user.setRole("USER");

    return  ResponseEntity.ok(userRepository.save(user));
  }

}
