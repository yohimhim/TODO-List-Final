package com.yohimhim.TODO_List.controller;

import com.yohimhim.TODO_List.model.Task;
import com.yohimhim.TODO_List.service.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Controller
public class PageController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/load")
    public String loadDummyData() {
        taskService.load();
        return "redirect:/";
    }

    @GetMapping("/")
    public String home(Model model) {
        List<Task> tasks = taskService.getAllTasks(); // should return List<Task>
        model.addAttribute("tasks", tasks);
        return "index";
    }

    @RequestMapping("/addTask")
    public String addTask() {

        return "addTask";
    }

    @RequestMapping("/submitTask")
    public String submitTask(HttpServletRequest req) {

        String title = req.getParameter("title");
        String description = req.getParameter("description");
        String rawDeadline = req.getParameter("deadline");
        LocalDate deadline = LocalDate.parse(rawDeadline);
        Date utilDate = java.sql.Date.valueOf(deadline);

        taskService.addOrUpdateTask(title, description, utilDate);

        return "redirect:/";
    }

    @RequestMapping("/deleteTask")
    public String deleteTask(@RequestParam("id") int id) {
        taskService.deleteTask(id);
        return "redirect:/";
    }

    @RequestMapping("/editTaskForm/{id}")
    public String editTaskForm(@PathVariable int id, Model model) {

        Task task = taskService.getTaskById(id);
        model.addAttribute("task", task);
        return "editTask";
    }

    @PostMapping("/editTaskForm/{id}")
    public String submitEditForm(@PathVariable int id, @RequestParam String title, @RequestParam String description, @RequestParam String deadline) {

        LocalDate parsed = LocalDate.parse(deadline);
        Date utilDate = java.sql.Date.valueOf(parsed);
        taskService.editTask(id, title, description, utilDate);
        return "redirect:/";
    }

    @RequestMapping("/completeTask")
    public String isCompleted(@RequestParam("id") int id) {

        Task task = taskService.getTaskById(id);
        task.setCompleted(!task.getCompleted());
        taskService.saveState(task);

        return "redirect:/";
    }


}
