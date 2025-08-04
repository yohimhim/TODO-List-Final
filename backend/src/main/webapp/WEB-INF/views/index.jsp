<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <title>TODO List</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">

    <style>
      .completed {
        text-decoration: line-through;
        color: gray;
        opacity: 0.6;
      }
    </style>

</head>
<body>

<h1 style="text-align:center; margin-top: 20px;">To-Do List</h1>

<div class="todo-container">
    <div class="todo-header">
        <h2>My Tasks</h2>
        <a href="${pageContext.request.contextPath}/addTask">
            <button class="add-btn">Add Task</button>
        </a>
    </div>

    <c:if test="${empty tasks}">
        <p style="margin-top: 20px;">No tasks found.</p>
    </c:if>

    <c:forEach var="task" items="${tasks}">
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-desc">${task.description}</div>
                <div class="task-date">Due <fmt:formatDate value="${task.deadline}" pattern="MM/dd/yy" /></div>
            </div>
        </div>
        <div class="task-actions">
            <form action="completeTask" style="display:inline;">
                <input type="hidden" name="id" value="${task.id}">
                <button type="submit">✔</button>
            </form>

            <form action="${pageContext.request.contextPath}/editTaskForm/${task.id}" style="display:inline;">
                <input type="hidden" name="id" value="${task.id}">
                <button type="submit" class="edit">edit</button>
            </form>

            <form action="deleteTask" style="display:inline;">
                <input type="hidden" name="id" value="${task.id}">
                <button type="submit" class="delete">delete</button>
            </form>
        </div>
    </c:forEach>

</div>

</body>
</html>
