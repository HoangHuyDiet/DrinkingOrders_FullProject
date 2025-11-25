package com.codewiithhoang.drinkingorders.repository;

import com.codewiithhoang.drinkingorders.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {

}
