package com.yohimhim.TODO_List.service;

import com.yohimhim.TODO_List.model.Task;
import com.yohimhim.TODO_List.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepo repo;

    public List<Task> getAllTasks() {

        return repo.findAll(Sort.by("id"));

    }

    public Task addOrUpdateTask(String title, String desc, Date deadline) {

        Task task = new Task();

        task.setTitle(title);
        task.setDescription(desc);
        task.setDeadline(deadline);

        return repo.save(task);

    }

    public void load() {
        List<Task> tasks = new ArrayList<>(List.of(
                new Task(0, "Buy groceries", "Milk, eggs, bread, and veggies", new Date(125, 5, 25), false), // 2025-06-25
                new Task(0, "Finish Spring Boot project", "Complete backend logic and connect to frontend", new Date(125, 5, 30), false), // 2025-06-30
                new Task(0, "Workout", "Leg day at the gym", new Date(125, 5, 24), false), // 2025-06-24
                new Task(0, "Call dentist", "Schedule appointment for teeth", new Date(125, 5, 26), false), // 2025-06-26
                new Task(0, "Read book", "Harry Potter'", new Date(125, 6, 1), false) // 2025-07-01
        ));

        repo.saveAll(tasks);
    }

    public void deleteTask(int id) {

        repo.deleteById(id);

    }

    public void editTask(int id, String title, String description, Date deadline) {

        Task task = repo.findById(id).orElse(null);

        task.setTitle(title);
        task.setDescription(description);
        task.setDeadline(deadline);

        repo.save(task);

    }

    public Task getTaskById(int id) {

        return repo.findById(id).orElse(null);

    }

    public void saveState(Task task) {

        repo.save(task);

    }
}
