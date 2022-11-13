
angular.module('MyApp')
.controller('InvoiceController', function ($scope, InvoiceProfileService, $window, $filter, $http) {


    //alert(angular.toJson($scope.data));

    $scope.submitText = "Create Invoice";
    $scope.submitText2 = "Save";

    $scope.submitted = false;
    $scope.submitted2 = false;

    $scope.message = '';
    $scope.isFormValid = false;
    $scope.f2_isFormValid = false;

 
    $scope.Invoice = {

        ItemName: '',
        ItemID: '',
        ContactNo: '',
        UnitPrice: '',
        Quantity: '',
        CustomerName: '',
        InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy'),
        Address: '',
        TotalPrice: 0,
        Subtotal: 0
    };
    //$scope.InvoiceUP = false;
    $scope.Invoice.TotalPrice;
  

    //validates form on client side
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });
    //validates form on client side
    $scope.$watch('f2.$valid', function (newValue) {
        $scope.f2_isFormValid = newValue;
    });





    $scope.InvoiceUP = [{
        
        ItemName: '',
        ItemID: '',
        UnitPrice: '',
        Quantity: '',
        TotalPrice: '',
        CustomerName: '',
        ContactNo: '',
        InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy'),
        Address: '',
        Subtotal: 0,
        VatPrice: 0,
        TotalVat: 0,
        DiscountPrice: 0,
        TotalDiscount: 0,
        FinalPrice: 0,
        Paid: 0,
        Due: 0

    }];
    //$scope.InvoiceUP = false;
   
  

    $scope.Add = function () {
        //if ($scope.First == false) {

        //    $scope.InvoiceUP.splice(0, 1);
        //    $scope.First = true;
        //}
 
     
        var customer = {};
        if ($scope.Invoice.Quantity == "") {
            return;
        }
        else if ($scope.Invoice.ItemID == "") {
            return;
        }
        else if ($scope.Invoice.UnitPrice == "") {
            return;
        }
        else if ($scope.Invoice.TotalPrice == "") {
            return;
        }
        else {
            //alert('dsd');
            customer.id = $scope.InvoiceUP.length + 1
            customer.Quantity = $scope.Invoice.Quantity;
            customer.ItemID = $scope.Invoice.ItemID;
            customer.ItemName = $scope.Invoice.ItemName;
            customer.UnitPrice = $scope.Invoice.UnitPrice;
            customer.TotalPrice = $scope.Invoice.TotalPrice;
            //alert(angular.toJson($scope.Invoice.ItemID));
            //customer.Country = $scope.Country;
            //alert(customer.Quantity);
            $scope.InvoiceUP.push(customer);
            //alert($scope.InvoiceUP.Subtotal);
            $scope.Invoice.Subtotal = $scope.Invoice.Subtotal + $scope.Invoice.TotalPrice;
            $scope.InvoiceUP.Subtotal = $scope.Invoice.Subtotal
            $scope.InvoiceUP.FinalPrice = $scope.InvoiceUP.Subtotal;
            $scope.InvoiceUP.CustomerName = $scope.Invoice.CustomerName;
            $scope.InvoiceUP.ContactNo = $scope.Invoice.ContactNo;
            $scope.InvoiceUP.Address = $scope.Invoice.Address;
            $scope.InvoiceUP.InvoiceDate = $scope.Invoice.InvoiceDate;
            //alert(angular.toJson($scope.InvoiceUP.Address));
            //Clear the TextBoxes.
            $scope.Invoice.Quantity = "";
            $scope.Invoice.ItemID = "";
            $scope.Invoice.UnitPrice = "";
            $scope.Invoice.TotalPrice = "";
                
             
        }
    //}
        //$scope.Country = "";
    };


    //Save Data
    $scope.SaveData = function (data) {


        if ($scope.submitText == 'Save') {

            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {
                //alert(angular.toJson($scope.SuppName.BuyPrice));
                $scope.ProductInsert.CategoryID = $scope.CategoryName.CategoryID;
                $scope.ProductInsert.SupplierID = $scope.SuppName.SuppID;
                $scope.ProductInsert.ModelID = $scope.ModelName.ModelID;
                $scope.ProductInsert.ItemID = $scope.ItemName.itemID;


                //var stringDate = $scope.ProductInsert.InvoiceDate;

                //$scope.ddMMyyyy = $filter('date')(stringDate, 'dd/MM/yyyy');

                //alert(angular.toJson($scope.ddMMyyyy));
                //var stringDate = $scope.ProductInsert.InvoiceDate;

                //$scope.myDate = $filter('date')(stringDate, 'MM/dd/yyyy');

                //alert(angular.toJson($scope.myDate));
                //$scope.ProductInsert.InvoiceDate = $filter('date') ($scope.ProductInsert.InvoiceDate, 'dd-MMM-yyyy')
                //dateAsString = $filter('date')(item_date, "yyyy-MM-dd");
                //$scope.ProductInsert.InvoiceDate = new Date(parseInt($scope.ProductInsert.InvoiceDate.substr(6)));
                $scope.ProductInsert = data;
                //alert(angular.toJson($scope.ProductInsert.InvoiceDate));


                ProductInsertProfileService.SaveFormData($scope.ProductInsert).then(function (d) {
                    if (d == 'Success') {
                        alert('You have Successfully Save Data');

                        ClearForm();
                        //GetItemNameInfo();
                    }
                    else {
                        alert(d);
                    }
                    $scope.submitText = "Save";
                });

            }
            else {
                $scope.message = '';
            }
        }
    }
    $scope.Remove = function (index) {
        //alert(index);

        var name = $scope.InvoiceUP[index].ItemName;
        var TotalPrice = $scope.InvoiceUP[index].TotalPrice;
        alert(TotalPrice);
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.InvoiceUP.splice(index, 1);
            $scope.InvoiceUP.Subtotal = $scope.InvoiceUP.Subtotal - TotalPrice;
        }
    }



  

    $scope.GetProductInfo = function () {
 
        $scope.Invoice.ItemID = $scope.ItemName.itemID;

        InvoiceProfileService.GetProductDetailsContent($scope.Invoice.ItemID).then(function (d) {
            $scope.Invoice.UnitPrice = "";
            $scope.ProductDetails = d.data;
            //alert(angular.toJson($scope.ProductDetails));
           
            $scope.Invoice.UnitPrice = $scope.ProductDetails[0].SellPrice;
            $scope.Invoice.ItemName = $scope.ProductDetails[0].itemName;
            //alert(angular.toJson($scope.Invoice.UnitPrice));
        }, function (error) {
            alert('Error GetProductDetailsContent!');
        });
       
    }



    // Populate Category Content

    $scope.GetTotalprice= function () {
        $scope.Invoice.TotalPrice = ($scope.Invoice.UnitPrice) * ($scope.Invoice.Quantity);
        //alert(angular.toJson($scope.Invoice.TotalPrice));

    };

    $scope.GetDiscountprice = function () {
        $scope.InvoiceUP.TotalDiscount = ((($scope.InvoiceUP.Subtotal) * ($scope.InvoiceUP.DiscountPrice)) / 100);

        
        if ($scope.InvoiceUP.VatPrice = '') {
            
            $scope.InvoiceUP.FinalPrice = ($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount) + ($scope.InvoiceUP.TotalVat);
        }
        else {
            $scope.InvoiceUP.TotalVat = (((($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount)) * ($scope.InvoiceUP.VatPrice)) / 100);
            $scope.InvoiceUP.FinalPrice = ($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount);
        }


    };

    $scope.GetVatprice = function () {
        $scope.InvoiceUP.TotalVat =  (( (($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount)) * ($scope.InvoiceUP.VatPrice)) / 100);
        $scope.InvoiceUP.FinalPrice = (($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount)) + ($scope.InvoiceUP.TotalVat);
       

    };
   
    $scope.GetDueprice = function () {
        $scope.InvoiceUP.Due = ($scope.InvoiceUP.FinalPrice) - ($scope.InvoiceUP.Paid);
        if ($scope.InvoiceUP.Due < 0) {
            $scope.InvoiceUP.Due = 0;
        }
   


    };

   

    // Populate Item Name Content

    InvoiceProfileService.GetItemNameContent().then(function (d) {
        $scope.ItemList = d.data;
        //alert(angular.toJson($scope.ItemList));
    }, function (error) {
        alert('Error GetItemNameContent!');
    });



    //Clear Form 
    function ClearForm() {
        $scope.Model = {};
        $scope.f1.$setPristine();
        $scope.f2.$setPristine();

        $scope.submitted = false;
        $scope.submitted2 = false;

    }

})


.factory('InvoiceProfileService', function ($http, $q) {

    var fac = {};

    fac.GetProductDetailsContent = function (data) {

        return $http.get('/Invoice/GetProductDetails', {
            params: { ItemID: data }

        });
    }

    fac.GetItemNameContent = function () {
        return $http.get('/Data/GetItemName')
    }

 

    var getModelAsFormData = function (data) {
        var dataAsFormData = new FormData();
        angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    };


    return fac;

});



