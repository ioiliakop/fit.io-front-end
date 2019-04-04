package com.msg.msg.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.msg.msg.encryption.CryptoConverter;
import com.msg.msg.entities.User;
import com.msg.msg.repositories.UserRepository;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class RegisterController {

	private UserRepository userRepository;

	@Autowired
	public RegisterController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@PostMapping("/save")
	public void registerUser(@RequestBody User user) {
		User user2 = userRepository.findByUsername(user.getUsername());
		if (user2 == null) {
			user.setPassword(CryptoConverter.encrypt(user.retrievePassword()));
			userRepository.save(user);
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username Already Exists");
		}
	}

}
