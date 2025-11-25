package com.codewiithhoang.drinkingorders;

import com.codewiithhoang.drinkingorders.entity.User;
import com.codewiithhoang.drinkingorders.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DrinkingordersApplication implements CommandLineRunner {
  @Autowired
  private UserRepository userRepository;

  public static void main(String[] args) {
    SpringApplication.run(DrinkingordersApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {

  }
}
