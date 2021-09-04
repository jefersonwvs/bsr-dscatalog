package com.jefersonwvs.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jefersonwvs.dscatalog.entities.Category;
import com.jefersonwvs.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query(value = "SELECT DISTINCT obj "
					 + "FROM Product obj "
					 + "INNER JOIN obj.categories cats "
					 + "WHERE (COALESCE(:categories) IS NULL OR cats IN :categories) "
					 + "AND (LOWER(obj.name) LIKE LOWER(CONCAT('%', :name, '%')))")
	Page<Product> findAllByCategoryPaged(List<Category> categories, String name, Pageable pageable);

}