package com.msg.msg.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.msg.msg.database.DatabaseHelper;
import com.msg.msg.entities.Message;
import com.msg.msg.entities.Result;
import com.msg.msg.entities.Token;
import com.msg.msg.entities.User;
import com.msg.msg.repositories.MessageRepository;
import com.msg.msg.repositories.TokenRepository;
import com.msg.msg.repositories.UserRepository;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
public class MsgController {

	@Autowired
	public MessageRepository messageRepository;

	@Autowired
	public UserRepository userRepository;

	@Autowired
	public TokenRepository tokenRepository;

	@GetMapping("/sent")
	public Result<Message> getSentMessages(@RequestHeader("X-MSG-AUTH") String tokenAlphanumeric,
			@RequestParam int index1, @RequestParam int index2) {
		Token.validateToken(tokenAlphanumeric, tokenRepository);
//		Result.validateIndexes(index1, index2);
		int senderId = tokenRepository.getUserIDFromTokenAlphaNumeric(tokenAlphanumeric);
		List<Message> msgs = messageRepository.findSentMessages(senderId, index1, index2);
		int count = DatabaseHelper.getSentMsgCount(senderId);
		return new Result<Message>(count, msgs);
	}

	@GetMapping("/inbox")
	public Result<Message> getInboxMessages(@RequestHeader("X-MSG-AUTH") String tokenAlphanumeric,
			@RequestParam int index1, @RequestParam int index2) {
		Token.validateToken(tokenAlphanumeric, tokenRepository);
//		Result.validateIndexes(index1, index2);
		int receiverId = tokenRepository.getUserIDFromTokenAlphaNumeric(tokenAlphanumeric);
		List<Message> msgs = messageRepository.findInboxMessages(receiverId, index1, index2);
		int count = DatabaseHelper.getInboxMsgCount(receiverId);
		return new Result<Message>(count, msgs);
	}

	@GetMapping("/UsersMsg/{trainerUsername}/{clientUsername}")
	public Result<Message> getUserMessages(@RequestHeader("X-MSG-AUTH") String tokenAlphanumeric,
			@PathVariable String trainerUsername, @PathVariable String clientUsername, @RequestParam int index1,
			@RequestParam int index2) {
		Token.validateToken(tokenAlphanumeric, tokenRepository);
//		Result.validateIndexes(index1, index2);
		User trainer = userRepository.findByUsername(trainerUsername);
		User.validateUser(trainer);
		User client = userRepository.findByUsername(clientUsername);
		User.validateUser(client);
		List<Message> msgs = messageRepository.findUserMessages(client.getId(), trainer.getId(), trainer.getId(),
				client.getId(), index1, index2);
		int count = DatabaseHelper.getUsersMsgCount(trainer.getId(), client.getId());
		return new Result<Message>(count, msgs);
	}

	@PostMapping("/save/{receiverUsername}")
	public void sendMessage(@RequestHeader("X-MSG-AUTH") String tokenAlphanumeric,
			@PathVariable String receiverUsername, @RequestBody String content) {
		Token.validateToken(tokenAlphanumeric, tokenRepository);
		int senderId = tokenRepository.getUserIDFromTokenAlphaNumeric(tokenAlphanumeric);
		User sender = userRepository.findById(senderId);
		User.validateUser(sender);
		User receiver = userRepository.findByUsername(receiverUsername);
		User.validateUser(receiver);
		Message message = new Message(sender, receiver, content);
		messageRepository.save(message);
	}

}
