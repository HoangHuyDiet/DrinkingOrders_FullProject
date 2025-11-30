package com.codewiithhoang.drinkingorders.controller;

import com.codewiithhoang.drinkingorders.entity.User;
import com.codewiithhoang.drinkingorders.repository.UserRepository;
import com.codewiithhoang.drinkingorders.service.UserService;
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
      // Giấu password
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

    if (userRepository.existsByEmail(user.getEmail())) {
      return ResponseEntity.badRequest().body("Email đã được sử dụng");
    }

    // Mặc định là khách hàng
    if (user.getRole() == null) user.setRole("USER");

    User savedUser = userRepository.save(user);
    savedUser.setPassword(null); //Giấu pass trước khi trả về
    return ResponseEntity.ok(userRepository.save(user));
  }

  @GetMapping
  public ResponseEntity<?> getAllUsers() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  @Autowired
  private UserService userService;

  //API Thêm User
  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody User user) {
    try {
      // Gọi Service để tạo
      return ResponseEntity.ok(userService.createUser(user));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
  //API Xóa User
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    try {
      userService.deleteUser(id);
      return ResponseEntity.ok("Xóa thành công!!");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
