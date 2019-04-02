package com.msg.msg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.msg.msg.entities.TrainingType;

@CrossOrigin("*")
@RepositoryRestResource
public interface TrainingTypeRepository extends JpaRepository<TrainingType, Integer> {

	TrainingType findById(int id);

	@Modifying
	@Query(value = "insert into trainer_specialization (fk_trainer_id, fk_training_type) VALUES (:trainerId,:typeId)", nativeQuery = true)
	@Transactional
	void addType(@Param("trainerId") int fk_trainer_id, @Param("typeId") int fk_training_type);

	@Modifying
	@Query(value = "delete from trainer_specialization where fk_trainer_id =:trainerId and fk_training_type =:typeId", nativeQuery = true)
	@Transactional
	void removeType(@Param("trainerId") int fk_trainer_id, @Param("typeId") int fk_training_type);

	@Query(value = "select idtraining_type,specialization_title from training_type,trainer_specialization,user where idtraining_type = fk_training_type "
			+ "and fk_trainer_id = iduser and iduser = ?1", nativeQuery = true)
	List<TrainingType> findTrainersTypes(int iduser);
}