using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Mvc_DeshBoard.Models;
using System.Data;
using System.Net.Mail;
using System.Net;
using System.Data.Entity.Validation;
using System.Drawing;
using Newtonsoft.Json;

namespace Mvc_DeshBoard.Controllers
{
    public class DataController : Controller
    {

        public JsonResult SupplierInfo_insert(new_Supplier_Name u)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {


                    var Supplier = dc.new_Supplier_Name.Where(a => a.SuppName.Equals(u.SuppName)).FirstOrDefault();

                    if (Supplier != null)
                    {
                        message = "Already Insert Data";

                    }
                    else
                    {
                        if (u != null)
                        {

                         
                            u.Sign = 0;                         
                            u.PCName = Request.UserHostName;
                            u.EntryDate = DateTime.Now;

                            dc.new_Supplier_Name.Add(u);

                            try
                            {
                                dc.SaveChanges();
                            }
                            catch (DbEntityValidationException ex)
                            {
                                string errorMessages = string.Join("; ", ex.EntityValidationErrors.SelectMany(x => x.ValidationErrors).Select(x => x.ErrorMessage));
                                throw new DbEntityValidationException(errorMessages);
                            }

                            message = "Success";

                        }
                        else
                        {
                            message = "Insertion Failed!";
                        }
                    }
                }
            }
            else
            {
                message = "Validation Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }



        [HttpPost]
        public JsonResult SupplierInfo_Update(new_Supplier_Name d)
        {
            string message = "";
            //d.EntryDate = DateTime.Now;

            //int RegId = int.Parse(Session["LoginID"].ToString());

            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {
                    //check username available
                    //var user = dc.tblUserRegistrations.FirstOrDefault();
                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var SupplierDetails = dc.new_Supplier_Name.Where(x => x.SuppID == d.SuppID).FirstOrDefault();

                        SupplierDetails.SuppName = d.SuppName;
                        SupplierDetails.Address = d.Address;
                        SupplierDetails.Contact = d.Contact;
                        SupplierDetails.Email = d.Email;
                        SupplierDetails.Remarks = d.Remarks;
                       
                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Supplier Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult SupplierInfo_Delete(new_Supplier_Name d)
        {
            string message = "";


            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {

                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var SupplierDetails = dc.new_Supplier_Name.Where(x => x.SuppID == d.SuppID).FirstOrDefault();

                        SupplierDetails.Sign = 1;


                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Category Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetSupplier()
        {
            List<prc_Supplier_Info_Result> empDetails = new List<prc_Supplier_Info_Result>();

            //// using DBContext (EF 4.1 and above)  
            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {
                empDetails = context.Database.SqlQuery<prc_Supplier_Info_Result>("exec prc_Supplier_Info", "").ToList();
            }

            return new JsonResult { Data = empDetails, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }


        public JsonResult CategoryInfo_insert(new_Category_Name u)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {


                    var Supplier = dc.new_Category_Name.Where(a => a.CategoryName.Equals(u.CategoryName)).FirstOrDefault();

                    if (Supplier != null)
                    {
                        message = "Already Insert Data";

                    }
                    else
                    {
                        if (u != null)
                        {


                            u.Sign = 0;


                            dc.new_Category_Name.Add(u);

                            try
                            {
                                dc.SaveChanges();
                            }
                            catch (DbEntityValidationException ex)
                            {
                                string errorMessages = string.Join("; ", ex.EntityValidationErrors.SelectMany(x => x.ValidationErrors).Select(x => x.ErrorMessage));
                                throw new DbEntityValidationException(errorMessages);
                            }

                            message = "Success";

                        }
                        else
                        {
                            message = "Insertion Failed!";
                        }
                    }
                }
            }
            else
            {
                message = "Validation Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        [HttpPost]
        public JsonResult CategoryInfo_Update(new_Category_Name d)
        {
            string message = "";
            //d.EntryDate = DateTime.Now;

            //int RegId = int.Parse(Session["LoginID"].ToString());

            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {
                    //check username available
                    //var user = dc.tblUserRegistrations.FirstOrDefault();
                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var CategoryDetails = dc.new_Category_Name.Where(x => x.CategoryID == d.CategoryID).FirstOrDefault();

                        CategoryDetails.CategoryName = d.CategoryName;
                      

                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Category Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult CategoryInfo_Delete(new_Category_Name d)
        {
            string message = "";


            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {

                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var CategoryDetails = dc.new_Category_Name.Where(x => x.CategoryID == d.CategoryID).FirstOrDefault();

                        CategoryDetails.Sign = 1;


                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Category Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        public JsonResult GetCategory()
        {
            List<prc_Category_Info_Result> empDetails = new List<prc_Category_Info_Result>();

            //// using DBContext (EF 4.1 and above)  
            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {
                empDetails = context.Database.SqlQuery<prc_Category_Info_Result>("exec prc_Category_Info", "").ToList();
            }

            return new JsonResult { Data = empDetails, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

        public JsonResult IteamInfo_insert(new_Item_Name u)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {


                    var Supplier = dc.new_Item_Name.Where(a => a.itemName.Equals(u.itemName)).FirstOrDefault();

                    if (Supplier != null)
                    {
                        message = "Already Insert Data";

                    }
                    else
                    {
                        if (u != null)
                        {


                            u.Sign = 0;
                            u.PCName = Request.UserHostName;
                            u.EntryDate = DateTime.Now;

                            dc.new_Item_Name.Add(u);

                            try
                            {
                                dc.SaveChanges();
                            }
                            catch (DbEntityValidationException ex)
                            {
                                string errorMessages = string.Join("; ", ex.EntityValidationErrors.SelectMany(x => x.ValidationErrors).Select(x => x.ErrorMessage));
                                throw new DbEntityValidationException(errorMessages);
                            }

                            message = "Success";

                        }
                        else
                        {
                            message = "Insertion Failed!";
                        }
                    }
                }
            }
            else
            {
                message = "Validation Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetItemName()
        {
            List<prc_IteamName_Info_Result> empDetails = new List<prc_IteamName_Info_Result>();

            //// using DBContext (EF 4.1 and above)  
            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {
                empDetails = context.Database.SqlQuery<prc_IteamName_Info_Result>("exec prc_IteamName_Info", "").ToList();
            }

            return new JsonResult { Data = empDetails, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }


        [HttpPost]
        public JsonResult ItemInfo_Update(new_Item_Name d)
        {
            string message = "";
            //d.EntryDate = DateTime.Now;

            //int RegId = int.Parse(Session["LoginID"].ToString());

            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {
                    //check username available
                    //var user = dc.tblUserRegistrations.FirstOrDefault();
                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var ItemDetails = dc.new_Item_Name.Where(x => x.itemID == d.itemID).FirstOrDefault();

                        ItemDetails.itemName = d.itemName;
                        ItemDetails.CategoryID = d.CategoryID;


                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Category Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult ItemInfo_Delete(new_Item_Name d)
        {
            string message = "";


            var errors = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();


            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {

                    if (d != null)
                    {
                        //  var employeeDetails = dc.tblUser_Registration.Where(x => x.EmployeeCode == u.EmployeeCode & x.ComID == u.ComID).FirstOrDefault();

                        var ItemDetails = dc.new_Item_Name.Where(x => x.itemID == d.itemID).FirstOrDefault();

                        ItemDetails.Sign = 1;


                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Category Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult Product_Model_Info_insert(new_ProductModel_Name u)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {


                    var Supplier = dc.new_ProductModel_Name.Where(a => a.ModelName.Equals(u.ModelName)).FirstOrDefault();

                    if (Supplier != null)
                    {
                        message = "Already Insert Data";

                    }
                    else
                    {
                        if (u != null)
                        {


                            u.Sign = 0;


                            dc.new_ProductModel_Name.Add(u);

                            try
                            {
                                dc.SaveChanges();
                            }
                            catch (DbEntityValidationException ex)
                            {
                                string errorMessages = string.Join("; ", ex.EntityValidationErrors.SelectMany(x => x.ValidationErrors).Select(x => x.ErrorMessage));
                                throw new DbEntityValidationException(errorMessages);
                            }

                            message = "Success";

                        }
                        else
                        {
                            message = "Insertion Failed!";
                        }
                    }
                }
            }
            else
            {
                message = "Validation Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetProductModelName()
        {
            List<prc_ProductModel_Info_Result> ModelDetails = new List<prc_ProductModel_Info_Result>();

            //// using DBContext (EF 4.1 and above)  
            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {
                ModelDetails = context.Database.SqlQuery<prc_ProductModel_Info_Result>("exec prc_ProductModel_Info", "").ToList();
            }

            return new JsonResult { Data = ModelDetails, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

      



    }
}
