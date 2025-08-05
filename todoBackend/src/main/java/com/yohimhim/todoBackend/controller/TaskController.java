package com.yohimhim.todoBackend.controller;

import com.yohimhim.todoBackend.model.Task;
import com.yohimhim.todoBackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public List<Task> greet() {
        return taskService.getAllTasks();
    }

}
