package com.codewiithhoang.drinkingorders.controller;

import com.codewiithhoang.drinkingorders.dto.ProductDTO;
import com.codewiithhoang.drinkingorders.entity.Product;
import com.codewiithhoang.drinkingorders.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

  @Autowired
  private ProductService productService;

  // 1. Xem menu
  @GetMapping
  public ResponseEntity<List<Product>> getMenu() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

  // 2.Thêm món
  @PostMapping
  public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
    return ResponseEntity.ok(productService.addProduct(productDTO));
  }

  // 3.Tìm kiếm
  @GetMapping("/search")
  public ResponseEntity<List<Product>> search(@RequestParam String name) {
    return ResponseEntity.ok(productService.searchProducts(name));
  }

  @DeleteMapping("/{id}/")
  public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.ok("Xóa thành công!");
  }
}
