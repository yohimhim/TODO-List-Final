package com.yohimhim.todoBackend.service;

import com.yohimhim.todoBackend.model.Task;
import com.yohimhim.todoBackend.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }
}
