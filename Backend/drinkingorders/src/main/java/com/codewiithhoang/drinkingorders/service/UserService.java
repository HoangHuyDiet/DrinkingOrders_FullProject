package com.codewiithhoang.drinkingorders.service;

import com.codewiithhoang.drinkingorders.entity.User;
import com.codewiithhoang.drinkingorders.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  // 1. Lấy danh sách tất cả User
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // 2. Thêm User mới
  public User createUser(User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      throw new RuntimeException("Tên đăng nhập đã tồn tại!");
    }
    //Kiểm tra trùng email
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email đã được sử dụng!");
    }

    //Nếu không gửi role thì mặc định là STAFF
    if (user.getRole() == null || user.getRole().isEmpty()) {
      user.setRole("STAFF");
    }
    return userRepository.save(user);
  }

  // 3. Xóa User
  public void deleteUser(Long id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
    } else {
      throw new RuntimeException("Không tìm thấy người dùng!");
    }
  }
}
