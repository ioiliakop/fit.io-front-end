package com.msg.msg.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "area")
public class Area {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idarea")
	private int id;

	@Column(name = "city")
	private String city;

	@Column(name = "address")
	private String address;

	@OneToMany
	@JoinColumn(name = "fk_area_id", referencedColumnName = "idarea")
	@JsonIgnore
	private List<TrainingSession> areaSessions;

	public Area() {
	}

	public Area(int id, String city, String address) {
		this.id = id;
		this.city = city;
		this.address = address;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<TrainingSession> getAreaSessions() {
		return areaSessions;
	}

	public void setAreaSessions(List<TrainingSession> areaSessions) {
		this.areaSessions = areaSessions;
	}

	public static void validateArea(Area area) {
		if (area == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Area Not Found");
		}
	}

	@Override
	public String toString() {
		return "Area [id=" + id + ", city=" + city + ", address=" + address + ", areaSessions=" + areaSessions + "]";
	}

}
