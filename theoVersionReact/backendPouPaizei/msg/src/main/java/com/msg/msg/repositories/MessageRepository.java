package com.msg.msg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.msg.msg.entities.Message;

@CrossOrigin("*")
@RepositoryRestResource
public interface MessageRepository extends JpaRepository<Message, Integer> {

	@Query(value="SELECT * FROM tseam_six_3.message where fk_sender_id=?1 order by time_sent desc limit ?2,?3", nativeQuery = true)
	List <Message> findSentMessages(int fk_sender_id, int index1, int index2);
	
	@Query(value="SELECT * FROM tseam_six_3.message where fk_receiver_id=?1 order by time_sent desc limit ?2,?3", nativeQuery = true)
	List <Message> findInboxMessages(int fk_receiver_id, int index1, int index2);
	
	@Query(value="SELECT * FROM tseam_six_3.message where fk_receiver_id=?1 and fk_sender_id=?2 or fk_receiver_id=?3 and fk_sender_id=?4 order by time_sent desc limit ?4,?5", nativeQuery = true)
	List <Message> findUserMessages(int fk_receiver_id,int fk_sender_id,int fk_sender_id1,int fk_receiver_id1, int index1, int index2);
	
	Message findById(int id);
}
