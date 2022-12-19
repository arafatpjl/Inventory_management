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
    public class ProductController : Controller
    {

        //[HttpPost]

        // for insert 
        public JsonResult ProductInfo_insert(Iteam_Information u)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {


                    var Supplier = dc.Iteam_Information.Where(a => a.ItemID.Equals(u.ItemID) && a.Invoice.Equals(u.Invoice) && a.SupplierID.Equals(u.SupplierID)).FirstOrDefault();

                    if (Supplier != null)
                    {
                        message = "Already Insert Data";

                    }
                    else
                    {
                        if (u != null)
                        {


                            //u.Sign = 0;
                            u.PCName = Request.UserHostName;
                            u.EntryDate = DateTime.Now;

                            u.TotalCostPrice = (decimal)(u.Quantity) * (decimal)(u.BuyPrice);
                   
                            u.TotalSellPrice = (decimal)(u.Quantity) * (decimal)(u.SellPrice);
                          


                            dc.Iteam_Information.Add(u);

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



        public JsonResult GetProductInfo()
        {
            List<prc_Iteam_Information_Result> ProductDetails = new List<prc_Iteam_Information_Result>();

            //// using DBContext (EF 4.1 and above)  
            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {
                ProductDetails = context.Database.SqlQuery<prc_Iteam_Information_Result>("exec prc_Iteam_Information", "").ToList();
            }

            return new JsonResult { Data = ProductDetails, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

        [HttpPost]
        public JsonResult ProductInfo_Delete(Iteam_Information d)
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

                        var ProductInfoDetails = dc.Iteam_Information.Where(x => x.ItemID == d.ItemID && x.SupplierID == d.SupplierID && x.Invoice == d.Invoice).FirstOrDefault();

                        ProductInfoDetails.Sign = 1;


                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Product Info not available!";
                    }
                }
            }
            else
            {
                message = "Failed!";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }




       
    }
}
