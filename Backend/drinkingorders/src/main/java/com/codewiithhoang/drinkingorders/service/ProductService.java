package com.codewiithhoang.drinkingorders.service;

import com.codewiithhoang.drinkingorders.dto.ProductDTO;
import com.codewiithhoang.drinkingorders.entity.Category;
import com.codewiithhoang.drinkingorders.entity.Product;
import com.codewiithhoang.drinkingorders.repository.CategoryRepository;
import com.codewiithhoang.drinkingorders.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  // 1. Lấy danh sách tất cả các món
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  // 2. Thêm món mới (Logic: Phải tìm danh mục trước rồi mới thêm)
  public Product addProduct(ProductDTO dto) {
    Category category = categoryRepository.findById(dto.getCategory_id()).orElseThrow(() -> new RuntimeException("Danh mục ID " + dto.getCategory_id() + " không tồn tại!"));

    // Map từ DTO sang Entity
    Product newProduct = new Product();
    newProduct.setName(dto.getName());
    newProduct.setPrice(dto.getPrice());
    newProduct.setImage(dto.getImage());
    newProduct.setDescription(dto.getDescription());
    newProduct.setCategory(category);

    return productRepository.save(newProduct);
  }

  // 3. TÌm kiếm món theo tên
  public List<Product> searchProducts(String keyword) {
    return productRepository.findByNameContaining(keyword);
  }

  // 4. Xóa món theo ID
  public void deleteProduct(Long id) {
    if (productRepository.existsById(id)) {
      productRepository.deleteById(id);
    }
    else {
      throw new RuntimeException("Không tìm thấy món để xóa!");
    }
  }
}
