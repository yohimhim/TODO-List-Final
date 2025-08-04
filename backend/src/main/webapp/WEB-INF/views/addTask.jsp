<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <title>TODO List</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">
    </head>
<body>
    <h1 style="text-align:center; margin-top: 20px;">Add New Task</h1>

    <div class="todo-container">
        <div class="form-container">
            <form action="submitTask" method="post">
                <label for="title">Title:</label><br>
                <input type="text" id="title" name="title" required><br><br>

                <label for="description">Description (Optional):</label><br>
                <input type="text" id="description" name="description"><br><br>

                <label for="deadline">Deadline:</label><br>
                <input type="date" id="deadline" name="deadline" required><br>

                <div style="text-align:center; margin-top: 20px;">
                        <a href="${pageContext.request.contextPath}/">
                            <input type="submit" value="Submit">
                        </a>

                </div>
            </form>
        </div>
    </div>

    <div style="text-align:center; margin-top: 20px;">
        <a href="${pageContext.request.contextPath}/">
            <button class="back-btn">← Back to List</button>
        </a>
    </div>

</body>
</html>