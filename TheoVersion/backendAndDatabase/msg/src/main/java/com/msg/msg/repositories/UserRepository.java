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
import com.msg.msg.entities.TrainingType;
import com.msg.msg.entities.User;

@CrossOrigin("*")
@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {

//	@Query(value = "SELECT user.iduser,user.username,user.password,user.role,user.first_name,user.last_name,user.email,user.price,user.description FROM user,training_type,trainer_specialization,trainer_area,area"
//			+ " where user.iduser=trainer_specialization.fk_trainer_id and trainer_specialization.fk_training_type = training_type.idtraining_type and "
//			+ "user.iduser=trainer_area.fk_trainer_id and trainer_area.fk_area_id=area.idarea and specialization_title = ?1 and"
//			+ " city= ?2 ", nativeQuery = true)
//	List<User> findTrainerByAreaAndType(String specialization_title, String city);

//	@Query(value = "select user.iduser, user.username,user.password, user.first_name,user.last_name,user.email,user.price,user.description, user.fk_role_id,\r\n"
//			+ " user.photo_link, user.is_active from user, trainer_area,  trainer_specialization, area ,training_type\r\n"
//			+ "where user.iduser=trainer_specialization.fk_trainer_id and user.iduser=trainer_area.fk_trainer_id and \r\n"
//			+ "training_type.idtraining_type=trainer_specialization.fk_training_type and area.idarea=trainer_area.fk_area_id\r\n"
//			+ "and training_type.specialization_title= ?1 and area.city= ?2", nativeQuery = true)
//	List<User> findTrainerByAreaAndType(String specialization_title, String city);
	
//	@Query(value = "SELECT user.iduser,user.username,user.password,user.fk_role_id,user.first_name,user.last_name,user.email,user.price,user.description,user.photolink,user.is_active FROM user,training_type,trainer_specialization,trainer_area,area"
//			+ " where user.iduser=trainer_specialization.fk_trainer_id and trainer_specialization.fk_training_type = training_type.idtraining_type and "
//			+ "user.iduser=trainer_area.fk_trainer_id and trainer_area.fk_area_id=area.idarea and specialization_title = ?1 and"
//			+ " city= ?2 and price <=?3", nativeQuery = true)
//	List<User> findTrainerByAreaAndTypeAndPrice(String specialization_title, String city, double price);

	
	
//	@Query(value = "Select user.iduser,user.username,user.password,user.fk_role_id,user.first_name,user.last_name,user.email,user.price,user.description,user.photolink,user.is_active from user,trainer_area,area where iduser=fk_trainer_id and fk_area_id=idarea and idarea=?1", nativeQuery = true)
//	List<User> findTrainerByArea(int idarea);

//	@Query(value = "Select user.iduser,user.username,user.password,user.fk_role_id,user.first_name,user.last_name,user.email,user.price,user.description,user.photolink,user.is_active from user,trainer_area,area where iduser=fk_trainer_id and fk_area_id=idarea and idarea=?1 and price <=?2", nativeQuery = true)
//	List<User> findTrainerByAreaAndPrice(int idarea, double price);

//	@Query(value = "Select user.iduser,user.username,user.password,user.fk_role_id,user.first_name,user.last_name,user.email,user.price,user.description,user.photolink,user.is_active from user,trainer_specialization,training_type where iduser=fk_trainer_id and fk_training_type=idtraining_type and idtraining_type =?1", nativeQuery = true)
//	List<User> findTrainerByType(int idtraining_type);

//	@Query(value = "Select user.iduser,user.username,user.password,user.fk_role_id,user.first_name,user.last_name,user.email,user.price,user.description,user.photolink,user.is_active from user,trainer_specialization,training_type where iduser=fk_trainer_id and fk_training_type=idtraining_type and idtraining_type =?1 and price <=?2", nativeQuery = true)
//	List<User> findTrainerByTypeAndPrice(int idtraining_type, double price);
	
//	@Query(value = "Select * from user where price > 0.0 and price <= ?1", nativeQuery = true)
//	List<User> findTrainerByPrice(double price);
	
//	@Modifying
//  @Query(value = "UPDATE tseam_six_3.user SET is_active = 0 where iduser =:userId", nativeQuery = true)
//  @Transactional
//  void bannUser(@Param("userId") int iduser);
//	
//	@Modifying
//  @Query(value = "UPDATE tseam_six_3.user SET is_active = 1 where iduser =:userId", nativeQuery = true)
//  @Transactional
//  void unBannUser(@Param("userId") int iduser);
	
	
	List<User> findByAreasAndPrice(Area area, double price);

	List <User> findByPriceGreaterThanAndPriceLessThanEqual(double minPrice, double maxPrice);
	
	List<User> findByTrainingTypesAndPrice(TrainingType trainingType, double price);
	
	List<User> findByAreasAndTrainingTypesAndPrice(Area area, TrainingType trainingType, double price);
	
	List <User> findByAreasAndTrainingTypes(Area area,TrainingType trainingType);
	
	List<User> findByTrainingTypes(TrainingType trainingType);
	
	List <User> findByAreas(Area area);
	
	List <User> findDistinctUsersByAreasInAndTrainingTypesIn(List<Area> areas,List <TrainingType> trainingTypes);
	
	List <User> findByAreasIn(List<Area> areas);
	
	List <User> findByTrainingTypesIn(List <TrainingType> trainingTypes);

	User findById(int id);

	User findByUsername(String username);

	User findByUsernameAndPassword(String username, String password);

}
