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
    public class InvoiceController : Controller
    {

        //[HttpPost]

        public JsonResult GetProductDetails(string ItemID)
        {
          

            List<prc_Product_details_Info_Result> ProductDetails_Info = new List<prc_Product_details_Info_Result>();

            using (Web_InventoryEntities context = new Web_InventoryEntities())
            {

                ProductDetails_Info = context.Database.SqlQuery<prc_Product_details_Info_Result>("exec prc_Product_details_Info  {0}", ItemID).ToList();
              
            }

            return new JsonResult { Data = ProductDetails_Info, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }
        // for insert 
        
        public JsonResult InvoiceInfo_insert(List<Invoice_Item_Entry> Invoice_Item_Entry_data )
        {
            

            string message = "";
            if (ModelState.IsValid)
            {
                using (Web_InventoryEntities dc = new Web_InventoryEntities())
                {
                    var ProductDetails = dc.Database.SqlQuery<prc_Max_InvoiceID_Result>("exec prc_Max_InvoiceID", "").ToList();
                    int InvoiceID = ProductDetails[0].InvoiceID + 1;

                    Invoice_Item_Entry_data[0].InvoiceID = InvoiceID;
                    Invoice_Item_Entry_data[0].InvoiceNo = "INV" + InvoiceID.ToString() + '-' + DateTime.Now.Year.ToString();

                    var Invoice_Main_Details = dc.Sell_Iteam_Main.FirstOrDefault();
                    if (Invoice_Main_Details != null)
                    {
                        Invoice_Main_Details.InvoiceID = Invoice_Item_Entry_data[0].InvoiceID;
                        Invoice_Main_Details.InvoiceNo = Invoice_Item_Entry_data[0].InvoiceNo;
                        Invoice_Main_Details.InvoiceDate = Invoice_Item_Entry_data[0].InvoiceDate;
                        Invoice_Main_Details.TotalPrice = Invoice_Item_Entry_data[0].TotalPrice;
                        Invoice_Main_Details.FinalPrice = Invoice_Item_Entry_data[0].FinalPrice;
                        Invoice_Main_Details.TotalDiscount = Invoice_Item_Entry_data[0].TotalDiscount;
                        Invoice_Main_Details.TotalVat = Invoice_Item_Entry_data[0].TotalVat;
                        Invoice_Main_Details.Paid = Invoice_Item_Entry_data[0].Paid;
                        Invoice_Main_Details.Due = Invoice_Item_Entry_data[0].Due;

                        dc.Sell_Iteam_Main.Add(Invoice_Main_Details);
                        //dc.SaveChanges();
                        //message = "Success";
                    }

                    string CustomerName = Invoice_Item_Entry_data[0].CustomerName;
                    string ContactNo = Invoice_Item_Entry_data[0].ContactNo;

                    var Invoice_Customer_Details = dc.Sell_Iteam_Customer.FirstOrDefault();
                    if (Invoice_Customer_Details != null)
                    {
                        Invoice_Customer_Details.InvoiceID = Invoice_Item_Entry_data[0].InvoiceID;
                        Invoice_Customer_Details.CustomerName = Invoice_Item_Entry_data[0].CustomerName;
                        Invoice_Customer_Details.ContactNo = Invoice_Item_Entry_data[0].ContactNo;
                        Invoice_Customer_Details.Address = Invoice_Item_Entry_data[0].Address;

                        dc.Sell_Iteam_Customer.Add(Invoice_Customer_Details);
                        //dc.SaveChanges();
                        //message = "Success";
                    }



                    foreach (var Invoice_Item_data in Invoice_Item_Entry_data)
                    {

                        var Invoice_Sub_Details = dc.Sell_Iteam_Sub.FirstOrDefault();

                        Invoice_Sub_Details.InvoiceID = InvoiceID;
                        Invoice_Sub_Details.IteamID = Invoice_Item_data.ItemID;
                        Invoice_Sub_Details.Quantity = Invoice_Item_data.Quantity;
                        Invoice_Sub_Details.TotalUnitPrice = (Invoice_Item_data.Quantity * Invoice_Item_data.UnitPrice);
                        Invoice_Sub_Details.UnitPrice = Invoice_Item_data.UnitPrice;
                        dc.Sell_Iteam_Sub.Add(Invoice_Sub_Details);
                       
                    
                    }
                    dc.SaveChanges();
                    message = "Success";


                 
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
