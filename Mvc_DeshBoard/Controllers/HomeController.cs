using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc_DeshBoard.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Product()
        {
         

            return View();
        }
        public ActionResult Productname()
        {
         

            return View();
        }
        public ActionResult CategoryName()
        {


            return View();
        }
        public ActionResult Supplier()
        {


            return View();
        }
        public ActionResult Invoice_Create()
        {


            return View();
        }
        public ActionResult boxed()
        {
            
            return View();
        }
        public ActionResult boxed1()
        {

            return View();
        }
        public ActionResult boxed2()
        {

            return View();
        }
        public ActionResult boxed3()
        {

            return View();
        }
        public ActionResult boxed4()
        {

            return View();
        }

        public ActionResult invoice()
        {

            return View();
        }

        public ActionResult invoice_print()
        {

            return View();
        }
    }
}
