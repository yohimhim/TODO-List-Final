package com.yohimhim.todoBackend.repo;

import com.yohimhim.todoBackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer> {
    List<Task> findByUserId(String userId); // finds all tasks for a given user
}
