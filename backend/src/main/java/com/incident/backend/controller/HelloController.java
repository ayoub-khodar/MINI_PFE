package com.incident.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {
	@GetMapping(value = "/")
	String hello() {
		return " Backend Deployed By Groupe2:Rami Rachid,Ali Soualy,Zakaria Khalil,Khodar Ayoub";
	}
}
