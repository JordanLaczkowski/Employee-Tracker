SELECT 
role.title AS job_title,
role.id AS role_id,
department.dept_name,
role.salary FROM role JOIN department
ON department.id = role.department_id;