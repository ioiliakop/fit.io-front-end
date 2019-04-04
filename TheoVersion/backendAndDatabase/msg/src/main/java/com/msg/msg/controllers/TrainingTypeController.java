package com.msg.msg.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msg.msg.repositories.TokenRepository;
import com.msg.msg.repositories.TrainingTypeRepository;
import com.msg.msg.entities.TrainingType;
import com.msg.msg.entities.Token;

@RestController
@RequestMapping("/trainingType")
@CrossOrigin(origins = "*")
public class TrainingTypeController {

	@Autowired
	public TrainingTypeRepository trainingTypeRepository;
	
	
	
	@GetMapping("/all")
	public List<TrainingType> getAll(){
		return trainingTypeRepository.findAll();
	}
}
