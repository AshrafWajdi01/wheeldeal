package com.wheeldeal_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import com.wheeldeal_backend.repository.CarRepository;

@SpringBootTest
@AutoConfigureMockMvc
class WheeldealBackendApplicationTests {

    @MockBean
    private CarRepository carRepository;

    @Test
    void contextLoads() {
    }

}
