CREATE TABLE employees.Ta_employe
(
  id                SERIAL PRIMARY KEY,
  num               int,
  firstName         varchar(20) ,
  lastName          varchar(60),
  gender CHAR(1) CHECK (gender IN ('M', 'F')),
  brithDate         date,
  hireDate          date,
  department_id     int REFERENCES public.Ta_departments(id) ON DELETE SET NULL,
  jobTitle          varchar(50),
  phone             varchar(20),
  addres            text,
  stat              varchar(20) DEFAULT 'Active' CHECK (stat IN ('Active', 'Inactive', 'Terminated'))
);

CREATE VIEW employees.Vi_employe AS
SELECT 
    e.num,
    e.firstName || ' ' || e.lastName AS full_name,
    d.nam AS department_name,
    e.jobTitle ,
    e.stat
FROM employees.Ta_employe e
LEFT JOIN public.Ta_departments d ON e.department_id = d.id;

-- جدول الحضور والانصراف
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) CHECK (status IN ('Present', 'Absent', 'Late', 'Leave')) DEFAULT 'Present',
    UNIQUE (employee_id, date)  -- يمنع تكرار اليوم لنفس الموظف
);

-- جدول الإجازات
CREATE TABLE leaves (
    leave_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    notes TEXT
);

-- عرض بسيط يدمج بيانات الموظف مع القسم
CREATE VIEW employee_info AS
SELECT 
    e.employee_id,
    e.first_name || ' ' || e.last_name AS full_name,
    d.name AS department_name,
    e.job_title,
    e.salary,
    e.status
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;