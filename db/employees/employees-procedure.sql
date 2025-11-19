
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

-- ===============
--  employe
-- ===============
    -- FUNCTION: employees.fn_employe_insert(num_employ,employename,passwd)
  CREATE OR REPLACE FUNCTION employees.fn_employe_Insert  (
  num_employ_   int, 
  employename_     VARCHAR(20), 
  passwd_       VARCHAR(255)
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    INSERT INTO employees.ta_employe(num_employ,employename, passwd)
	  VALUES (num_employ_, employename_, passwd_);
  end; 
  $$;

    -- FUNCTION: employees.fn_employe_update(id_employe,num_employ,employename,passwd)
  CREATE OR REPLACE FUNCTION employees.fn_employe_update(
  id_employe_      int,
  num_employ_   int, 
  employename_     VARCHAR(20), 
  passwd_       VARCHAR(255)
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    UPDATE employees.ta_employe SET
      employees.ta_employe.num_employ=num_employ_,  
      employees.ta_employe.employename=employename_, 
      employees.ta_employe.passwd=passwd_ 
    WHERE employees.ta_employe.id_employe=id_employe_;
  end; 
  $$;

    -- FUNCTION: employees.fn_employe_update_active(id_employe,active)
  CREATE OR REPLACE FUNCTION employees.fn_employe_update_active(
  id_employe_      int,
  active_       BOOLEAN
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    UPDATE employees.ta_employe SET
      employees.ta_employe.active=active_
    WHERE employees.ta_employe.id_employe=id_employe_;
  end; 
  $$;

     -- FUNCTION: employees.fn_employe_update_passwd(id_employe,passwd)
  CREATE OR REPLACE FUNCTION employees.fn_employe_update_passwd(
    id_employe_      int,
    passwd_       varchar(255)
    )
    RETURNS VOID 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE employees.ta_employe SET
        employees.ta_employe.passwd=passwd_
      WHERE employees.ta_employe.id_employe=id_employe_;
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_delete(id_employe)
  CREATE OR REPLACE FUNCTION employees.fn_employe_delete(id_ int)
    RETURNS VOID  
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM employees.ta_employe WHERE employees.ta_employe.id_employe=id_;
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_selectall()
  CREATE OR REPLACE FUNCTION employees.fn_employe_selectall()
    RETURNS TABLE(
      
      num               int,
      fullName         varchar(80) ,
      department_name  varchar(20) ,
      jobTitle         varchar(50),
      stat             varchar(20) 
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM employees.Vi_employe ORDER BY num);
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_selectone(id)
  CREATE OR REPLACE FUNCTION employees.fn_employe_selectone(id_ int)
    RETURNS TABLE(
      id                int ,
      num               int,
      firstName         varchar(20) ,
      lastName          varchar(60),
      gender            CHAR(1) ,
      brithDate         date,
      hireDate          date,
      department_id     int ,
      jobTitle          varchar(50),
      phone             varchar(20),
      addres            text,
      stat              varchar(20) 
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin    
      RETURN QUERY ( SELECT * FROM employees.ta_employe WHERE employees.ta_employe.id=id_);
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_selectFname(firstName)
  CREATE OR REPLACE FUNCTION employees.fn_employe_selectFname(firstName_ text)
    RETURNS TABLE(
      id                int ,
      num               int,
      firstName         varchar(20) ,
      lastName          varchar(60),
      gender            CHAR(1) ,
      brithDate         date,
      hireDate          date,
      department_id     int ,
      jobTitle          varchar(50),
      phone             varchar(20),
      addres            text,
      stat              varchar(20) 
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin    
      RETURN QUERY ( SELECT * FROM employees.ta_employe WHERE employees.ta_employe.firstName=firstName_);
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_selectLname(firstName)
  CREATE OR REPLACE FUNCTION employees.fn_employe_selectLname(lastName_ text)
    RETURNS TABLE(
      id                int ,
      num               int,
      firstName         varchar(20) ,
      lastName          varchar(60),
      gender            CHAR(1) ,
      brithDate         date,
      hireDate          date,
      department_id     int ,
      jobTitle          varchar(50),
      phone             varchar(20),
      addres            text,
      stat              varchar(20) 
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin    
      RETURN QUERY ( SELECT * FROM employees.ta_employe WHERE employees.ta_employe.lastName=lastName_);
    end; 
  $$;

    -- FUNCTION: employees.fn_employe_selectnum(num)
  CREATE OR REPLACE FUNCTION employees.fn_employe_selectnum(num_ int)
    RETURNS TABLE(
      id                int ,
      num               int,
      firstName         varchar(20) ,
      lastName          varchar(60),
      gender            CHAR(1) ,
      brithDate         date,
      hireDate          date,
      department_id     int ,
      jobTitle          varchar(50),
      phone             varchar(20),
      addres            text,
      stat              varchar(20) 
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin    
      RETURN QUERY ( SELECT * FROM employees.ta_employe WHERE employees.ta_employe.num=num_);
    end; 
  $$;