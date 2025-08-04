package com.yohimhim.todoBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    
    @GetMapping("/hello")
    public String greet() {
        return "Welcome to TODO";
    }

}
