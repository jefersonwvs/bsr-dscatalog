package com.jefersonwvs.dscatalog.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jefersonwvs.dscatalog.dto.ProductDTO;
import com.jefersonwvs.dscatalog.services.ProductService;
import com.jefersonwvs.dscatalog.services.exceptions.DatabaseException;
import com.jefersonwvs.dscatalog.services.exceptions.ResourceNotFoundException;
import com.jefersonwvs.dscatalog.tests.Factory;
import com.jefersonwvs.dscatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private TokenUtil tokenUtil;
	
	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page; // usa-se PageImpl em testes em vez de Page
	
	private String username;
	private String password;
	
	@BeforeEach
	public void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 5L;
		dependentId = 36L;
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		username = "maria@gmail.com";
		password = "123456";
		
		Mockito.when(service.findAllPaged((Pageable)ArgumentMatchers.any(), (Long)any(), (String)any())).thenReturn(page);
		
		Mockito.when(service.findById(existingId)).thenReturn(productDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.insert((ProductDTO)ArgumentMatchers.any())).thenReturn(productDTO);
		
		Mockito.when(service.update(eq(existingId), (ProductDTO)ArgumentMatchers.any()))
				 .thenReturn(productDTO);
		Mockito.when(service.update(eq(nonExistingId), (ProductDTO)any()))
				 .thenThrow(ResourceNotFoundException.class);
		
		Mockito.doNothing().when(service).delete(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		Mockito.doThrow(DatabaseException.class).when(service).delete(dependentId);
	}
	
	@Test
	public void findAllShouldReturnPage() throws Exception {
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/products")
																.accept(MediaType.APPLICATION_JSON));
		result.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception {
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", existingId)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isOk());
		/* Conferindo o corpo da requisição por garantia */
		result.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", nonExistingId)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void insertShouldReturnProductDTO() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = 
				mockMvc.perform(post("/products")
						 .header("Authorization", "Bearer " + accessToken)
						 .content(jsonBody)
						 .contentType(MediaType.APPLICATION_JSON)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = 
				mockMvc.perform(put("/products/{id}", existingId)
						 .header("Authorization", "Bearer " + accessToken)
						 .content(jsonBody)
						 .contentType(MediaType.APPLICATION_JSON)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = 
				mockMvc.perform(put("/products/{id}", nonExistingId)
						 .header("Authorization", "Bearer " + accessToken)
						 .content(jsonBody)
						 .contentType(MediaType.APPLICATION_JSON)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		ResultActions result = 
				mockMvc.perform(delete("/products/{id}", existingId)
						 .header("Authorization", "Bearer " + accessToken)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isNoContent());
	}
	
	 
	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", nonExistingId)
						 .accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isNotFound());
	}	
	
}