package com.yohimhim.todoBackend.controller;

import com.yohimhim.todoBackend.model.Task;
import com.yohimhim.todoBackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public List<Task> getTasks(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // the 'sub' field from Google oauth
        return taskService.getTasksByUserId(userId);
    }

    @PostMapping("/newTask")
    public ResponseEntity<?> newTask(@RequestBody Task task) {
        Task savedTask = taskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<Task> editTask(@PathVariable int id, @RequestBody Task task) {
        Task updatedTask = taskService.saveTask(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete task: " + e.getMessage());
        }
    }


}
