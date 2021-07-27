package com.jefersonwvs.dscatalog.tests;

import java.time.Instant;

import com.jefersonwvs.dscatalog.dto.ProductDTO;
import com.jefersonwvs.dscatalog.entities.Category;
import com.jefersonwvs.dscatalog.entities.Product;

public class Factory {
	
	public static Product createProduct() {
		
		Product product = new Product(1L, "Phone", "Good phone", 800.0, "https://img.com/img.png", Instant.now());
		product.getCategories().add(createCategory());
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}

	public static Category createCategory() {
		return new Category(2L, "Electronics");
	}

}
