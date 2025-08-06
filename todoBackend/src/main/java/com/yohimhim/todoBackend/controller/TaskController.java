package com.yohimhim.todoBackend.controller;

import com.yohimhim.todoBackend.model.Task;
import com.yohimhim.todoBackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public List<Task> greet() {
        return taskService.getAllTasks();
    }

    @PostMapping("/newTask")
    public ResponseEntity<?> newTask(@RequestBody Task task) {
        Task savedTask = taskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<Task> editTask(@PathVariable int id, @RequestBody Task task) {
        Task updatedTask = taskService.saveTask(task);
        return ResponseEntity.ok(updatedTask); // sends JSON with status 200
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete task: " + e.getMessage());
        }
    }


}
