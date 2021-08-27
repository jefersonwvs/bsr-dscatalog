package com.jefersonwvs.dscatalog.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.jefersonwvs.dscatalog.dto.ProductDTO;
import com.jefersonwvs.dscatalog.entities.Category;
import com.jefersonwvs.dscatalog.entities.Product;
import com.jefersonwvs.dscatalog.repositories.CategoryRepository;
import com.jefersonwvs.dscatalog.repositories.ProductRepository;
import com.jefersonwvs.dscatalog.services.exceptions.DatabaseException;
import com.jefersonwvs.dscatalog.services.exceptions.ResourceNotFoundException;
import com.jefersonwvs.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;

	private long existingId;
	private long nonExistingId;
	private long dependentId;
	
	private PageImpl<Product> page;
	private Product product;
	private ProductDTO productDTO;
	private Category category;
	
	@BeforeEach
	public void setUp() throws Exception {
		
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 99L;
		
		product = Factory.createProduct();
		productDTO = Factory.createProductDTO();
		category = Factory.createCategory();
		page = new PageImpl<>(List.of(product));

		
		/************************************************
		 * CONFIGURAÇÕES DAS SIMULAÇÕES DE REPOSITORIES *
		 ************************************************/
		
		/* método:				repository.findAll() 
		 * para testar:		service.findAllPaged() */
		Mockito.when(repository.findAll((Pageable)ArgumentMatchers.any())).thenReturn(page);
		
		
		/* método:				repository.findById() 
		 * para testar:		service.findById() */
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product)); // cenário 1: id existente
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty()); // cenário 2: id inexistente
		
		
		/* método:				repository.save() 
		 * para testar:		service.insert() and service.update() */
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		
		/* método:				repository.getOne() 
		 * para testar:		service.update() e copyDtoToEntity() */
		Mockito.when(repository.getOne(existingId)).thenReturn(product); // cenário 1: id existente
		Mockito.when(repository.getOne(nonExistingId)).thenThrow(EntityNotFoundException.class); // cenário 2: id inexistente
		
		
		/* método:				categoryRepository.getOne() 
		 * para testar:		copyDtoToEntity() */
		Mockito.when(categoryRepository.getOne(existingId)).thenReturn(category); // cenário 1: id existente
		Mockito.when(categoryRepository.getOne(nonExistingId)).thenThrow(EntityNotFoundException.class); // cenário 2: id inexistente
		
				
		/* método:				repository.deleteById() 
		 * para testar:		service.delete() */
		Mockito.doNothing().when(repository).deleteById(existingId); // cenário 1 - id existente
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId); // cenário 2 - id inexistente
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId); // cenário 3 - id dependente
	
	}
	
	@Test
	public void findAllPagedShouldReturnPage() {
		Pageable pageable = PageRequest.of(0, 10);
		Page<ProductDTO> result = service.findAllPaged(pageable);
		
		Assertions.assertNotNull(result);
		Mockito.verify(repository, Mockito.times(1)).findAll(pageable);
	}
	
	@Test
	public void findByIdShouldReturnObjectWhenIdExists() {
		ProductDTO result = service.findById(existingId);
		Assertions.assertTrue(result != null);
		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);
	}
	
	@Test
	public void updateShouldReturnObjectWhenIdExists() {
		ProductDTO result = service.update(existingId, productDTO);
		Assertions.assertTrue(result != null);
		Mockito.verify(repository, Mockito.times(1)).getOne(existingId);
		Mockito.verify(repository, Mockito.times(1)).save(product);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, productDTO);
		});
		Mockito.verify(repository, Mockito.times(1)).getOne(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
}
