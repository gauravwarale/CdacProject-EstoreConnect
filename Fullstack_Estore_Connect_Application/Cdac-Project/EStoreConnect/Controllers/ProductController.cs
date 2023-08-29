using EStoreConnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EStoreConnect.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        // GET: Product
        EstoreEntities e=new EstoreEntities();
        public ActionResult AddCategory()
        {
            return View(e.ProductCategories.ToList());
        }
        [HttpPost]
        public ActionResult AddCategory(ProductCategory p)
        {
            e.ProductCategories.Add(p);
            e.SaveChanges();
            return View(e.ProductCategories.ToList());
        }

        public ActionResult DeleteCategory(int id)
        {
            
            ProductCategory pp = e.ProductCategories.Find(id);
            e.ProductCategories.Remove(pp);
            foreach (var item in e.ProductDeteils)
            {
                if(id==item.pcatId)
                {
                    Product dp = e.Products.Find(item.productId);
                    e.Products.Remove(dp);
                }
            }
            e.SaveChanges();
            //return View(e.ProductCategories.ToList());
            return Redirect("/Product/AddCategory");
        }

        public ActionResult EditCategory(int id)
        {

            ProductCategory pp = e.ProductCategories.Find(id);
            //return View(e.ProductCategories.ToList());
            return View(pp);
        }

        [HttpPost]
        public ActionResult EditCategory(ProductCategory p,int id)
        {

            ProductCategory pp = e.ProductCategories.Find(id);
           
            pp.pcategory = p.pcategory;
            pp.cat_description = p.cat_description;

            e.SaveChanges();
            //return View(e.ProductCategories.ToList());
            return Redirect("/Product/AddCategory");
        }

        public ActionResult AddSubCategory()
        {
            return View(e.ProductSubcategories.ToList());
        }

        [HttpPost]
        public ActionResult AddSubCategory(ProductSubcategory p)
        {
            e.ProductSubcategories.Add(p);
            e.SaveChanges();
            return View(e.ProductSubcategories.ToList());
        }

        public ActionResult DeletesubCategory(int id)
        {

            ProductSubcategory pp = e.ProductSubcategories.Find(id);
            _ = e.ProductSubcategories.Remove(pp);
            foreach (var item in e.ProductDeteils)
            {
                if (id == item.psubcatId)
                {
                    Product dp = e.Products.Find(item.productId);
                    e.Products.Remove(dp);
                }
            }
            e.SaveChanges();
            //return View(e.ProductCategories.ToList());
            return Redirect("/Product/AddsubCategory");
        }


        public ActionResult EditsubCategory(int id)
        {

            ProductSubcategory pp = e.ProductSubcategories.Find(id);
            //return View(e.ProductCategories.ToList());
            return View(pp);
        }

        [HttpPost]
        public ActionResult EditsubCategory(ProductSubcategory p, int id)
        {

            ProductSubcategory pp = e.ProductSubcategories.Find(id);

            pp.psubcategory = p.psubcategory;
            pp.subcatdesciption = p.subcatdesciption;

            e.SaveChanges();
            //return View(e.ProductCategories.ToList());
            return Redirect("/Product/AddsubCategory");
        }

        public ActionResult Insert()
        {
            ListCategory list = new ListCategory();
            list.pCategories = e.ProductCategories.ToList();
            list.pSubcategories=e.ProductSubcategories.ToList();
            return View(list);
        }
        [HttpPost]
        public ActionResult Insert(AddProduct ad)
        {
            Product p = new Product();
            p.pname = ad.pname;
            p.pmanufacture = ad.pmanufacture;
            p.pweight_ = ad.pweight_;
            p.p_price_after = ad.p_price_after;
            p.p_price_before = ad.p_price_before;
            p.pimage = "~/Images/1.jpg";
            e.Products.Add(p);
            e.SaveChanges();
            ProductDeteil pd = new ProductDeteil();
            pd.productId = p.Id;
            foreach (var item in e.ProductCategories)
            {
                if(ad.Productcategory==item.pcategory)
                {
                    pd.pcatId = item.pcatId;
                    break;
                }
            }
            foreach (var item in e.ProductSubcategories)
            {
                if(ad.ProductSubCategory==item.psubcategory)
                {
                    pd.psubcatId = item.psubcatId; break;
                }
            }
            e.ProductDeteils.Add(pd);
            e.SaveChanges();
            return Redirect("/Product/ShowProduct");
        }

        public ActionResult ShowProduct()
        {
            ShowProduct show = new ShowProduct();
            show.plist = e.Products.ToList();
          
            return View(show);
        }

        public ActionResult EditProduct(int id)
        {
            return View(e.Products.Find(id));
        }

        [HttpPost]
        public ActionResult EditProduct(Product p)
        {
            Product pp = e.Products.Find(p.Id);
            pp.pname = p.pname;
            pp.pmanufacture = p.pmanufacture;
            pp.p_price_after = p.p_price_after;
            pp.p_price_before = p.p_price_before;
            pp.pweight_ = p.pweight_;
            e.SaveChanges();
            return Redirect("/Product/ShowProduct");
        }
        public ActionResult DeleteProduct(int id)
        {
            Product p = e.Products.Find(id);
            e.Products.Remove(p);
            e.SaveChanges();
            return Redirect("/Product/ShowProduct");

        }

    }
}