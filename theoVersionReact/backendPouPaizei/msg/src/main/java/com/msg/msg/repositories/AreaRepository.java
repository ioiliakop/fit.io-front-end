package com.msg.msg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.msg.msg.entities.Area;

@CrossOrigin("*")
@RepositoryRestResource
public interface AreaRepository extends JpaRepository<Area, Integer>{

	Area findById(int id);
	
	@Modifying
    @Query(value = "insert into trainer_area (fk_trainer_id, fk_area_id) VALUES (:trainerId,:areaId)", nativeQuery = true)
    @Transactional
    void addArea(@Param("trainerId") int fk_trainer_id, @Param("areaId") int fk_area_id);
	
	@Modifying
    @Query(value = "delete from trainer_area where fk_trainer_id =:trainerId and fk_area_id =:areaId", nativeQuery = true)
    @Transactional
    void removeArea(@Param("trainerId") int fk_trainer_id, @Param("areaId") int fk_area_id);
	
	@Query(value = "select idarea,city,address from area,trainer_area,user "
			+ "where idarea = fk_area_id and fk_trainer_id = iduser and iduser = ?1",nativeQuery = true)
	List<Area> findTrainersAreas(int iduser);
}
