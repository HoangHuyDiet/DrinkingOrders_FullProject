package com.codewiithhoang.drinkingorders.repository;

import com.codewiithhoang.drinkingorders.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  //Gọi tới tên của sản phẩm từ CSDL
  List<Product> findByNameContaining(String   name);
}
