package com.msg.msg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.msg.msg.entities.Review;

@CrossOrigin("*")
@RepositoryRestResource
public interface ReviewRepository extends JpaRepository<Review, Integer>{

	@Query(value = "Select review.id, review.fk_session_id, review.comment, review.date, review.rating from review,training_session "
			+ "where review.fk_session_id = ?1", nativeQuery = true)
	Review getSessionComment(int idtraining_session);
	
	@Query(value = "Select review.id, review.fk_session_id, review.comment, review.date, review.rating from review,training_session,user "
			+ "where review.fk_session_id = idtraining_session and training_session.fk_trainer_id = user.iduser and user.iduser = ?1 limit ?2,?3", nativeQuery = true)
	List<Review> getTrainerComments(int fk_trainer_id, int index1, int index2);
}
