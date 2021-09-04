package com.jefersonwvs.dscatalog.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.jefersonwvs.dscatalog.dto.ProductDTO;
import com.jefersonwvs.dscatalog.repositories.ProductRepository;
import com.jefersonwvs.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional // torna cada teste independente um do outro
public class ProductServiceIntegrationTests {
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private ProductRepository repository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}
	
	@Test
	public void findAllPagedShouldReturnPageWhenPageAndSizeAreValid() {
		int number = 0;
		int size = 10;
		PageRequest pageRequest = PageRequest.of(number, size);
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, "");
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(number, result.getNumber());
		Assertions.assertEquals(size, result.getSize());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExist() {
		int number = 50;
		int size = 10;
		PageRequest pageRequest = PageRequest.of(number, size);
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, "");
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByName() {
		int number = 0;
		int size = 10;
		Sort sort = Sort.by("name");
		PageRequest pageRequest = PageRequest.of(number, size, sort);
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, "");
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Macbook Pro", result.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", result.getContent().get(1).getName());
		Assertions.assertEquals("PC Gamer Alfa", result.getContent().get(2).getName());
	}

	@Test
	public void deleteShouldDeleteProductWhenIdExists() {
		service.delete(existingId);
		Assertions.assertEquals(countTotalProducts - 1, repository.count());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
	}
	
}
