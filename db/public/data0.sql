-- Kine Docment
SELECT public.fn_kindoc_insert('01', 'أضافة مشتريات', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('02', 'أرتجاع من الورشة', 1, 1, true, 1);
SELECT public.fn_kindoc_insert('03', 'اضافة ارتجاع عميل', 1, 1, true, 1);
SELECT public.fn_kindoc_insert('04', 'اضافة تحويل من المركز الرئيسى', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('05', 'اضافة تحويل مخازن داخلية', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('06', 'تسويات اضافة', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('07', 'اضافة امانات', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('08', 'صرف للعميل', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('09', 'صرف للورشة', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('10','ارتجاع للمورد', 1, 2, true, 1);
SELECT public.fn_kindoc_insert('11','تحويل للمركز الرئيسى', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('12','صرف تحويل مخازن داخلية',1, 2, false, 1);
SELECT public.fn_kindoc_insert('13','عدم صلاحية', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('01','فاتورة مورد', 2, 2, false, 1);
SELECT public.fn_kindoc_insert('14','تحويل عهدة', 1, 0, false, 1);
SELECT public.fn_kindoc_insert('15','صرف عهدة', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('16','رد عهدة', 1, 1, false, 1);
SELECT public.fn_kindoc_insert('17','تسويات صرف', 1, 2, false, 1);
SELECT public.fn_kindoc_insert('18','فاتورة بيع', 1, 2, false, 1);
 