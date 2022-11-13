
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

    $scope.InvoiceInsert = {

        ItemName: '',
        ItemID: '',
        UnitPrice: '',
        Quantity: '',
        TotalPrice: '',
        CustomerName: '',
        ContactNo: '',
        InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy'),
        Address: '',
        Description: '',
        Subtotal: 0,
        VatPrice: 0,
        TotalVat: 0,
        DiscountPrice: 0,
        TotalDiscount: 0,
        FinalPrice: 0,
        Paid: 0,
        Due: 0

    };




    $scope.InvoiceData = {

        ItemName: '',
        ItemID: '',
        UnitPrice: '',
        Quantity: '',
        TotalPrice: '',
        CustomerName: '',
        ContactNo: '',
        InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy'),
        Address: '',
        Description: '',
        Subtotal: 0,
        VatPrice: 0,
        TotalVat: 0,
        DiscountPrice: 0,
        TotalDiscount: 0,
        FinalPrice: 0,
        Paid: 0,
        Due: 0

    };


    //$scope.InvoiceUP = [{
        
    //    ItemName: '',
    //    ItemID: '',
    //    UnitPrice: '',
    //    Quantity: '',
    //    TotalPrice: '',
    //    CustomerName: '',
    //    ContactNo: '',
    //    InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy'),
    //    Address: '',
    //    Description: '',
    //    Subtotal: 0,
    //    VatPrice: 0,
    //    TotalVat: 0,
    //    DiscountPrice: 0,
    //    TotalDiscount: 0,
    //    FinalPrice: 0,
    //    Paid: 0,
    //    Due: 0

    //}];


    //$scope.First = false;
   
    $scope.InvoiceUP = [];


    $scope.Add = function () {


        //if ($scope.First == false) {
            
        //    $scope.InvoiceUP.splice(0, 1);
        //    $scope.First = true;
        //}
      
     

      


        var customer = {};
        if ($scope.Invoice.CustomerName == "") {
            return;
        }
        if ($scope.Invoice.ContactNo == "") {
            return;
        }
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
            $scope.InvoiceData.id = $scope.InvoiceUP.length + 1
            $scope.InvoiceData.Quantity = $scope.Invoice.Quantity;
            $scope.InvoiceData.ItemID = $scope.Invoice.ItemID;
            $scope.InvoiceData.ItemName = $scope.Invoice.ItemName;
            $scope.InvoiceData.UnitPrice = $scope.Invoice.UnitPrice;
            $scope.InvoiceData.TotalPrice = $scope.Invoice.TotalPrice;
            //alert(angular.toJson($scope.Invoice.ItemID));
            //customer.Country = $scope.Country;
            //alert(customer.Quantity);
           
            //alert($scope.InvoiceUP.Subtotal);
            $scope.Invoice.Subtotal = $scope.Invoice.Subtotal + $scope.Invoice.TotalPrice;
            $scope.InvoiceData.Subtotal = $scope.Invoice.Subtotal
            $scope.InvoiceData.FinalPrice = $scope.InvoiceUP.Subtotal;
            $scope.InvoiceData.CustomerName = $scope.Invoice.CustomerName;
            $scope.InvoiceData.ContactNo = $scope.Invoice.ContactNo;
            $scope.InvoiceData.Address = $scope.Invoice.Address;
            $scope.InvoiceData.InvoiceDate = $scope.Invoice.InvoiceDate;

             $scope.InvoiceUP.push($scope.InvoiceData);
            alert(angular.toJson($scope.InvoiceUP));
            //Clear the TextBoxes.
            $scope.Invoice.Quantity = "";
            $scope.Invoice.ItemID = "";
            $scope.Invoice.UnitPrice = "";
            $scope.Invoice.TotalPrice = "";
                
             
        }
    //}
        //$scope.Country = "";
    };
    $scope.Remove = function (index) {
        //alert(index);

        var name = $scope.InvoiceUP[index].ItemName;
        var TotalPrice = $scope.InvoiceUP[index].TotalPrice;
        alert(TotalPrice);
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.InvoiceUP.splice(index, 1);



            // for calculation after Delete
            $scope.InvoiceUP.Subtotal = $scope.InvoiceUP.Subtotal - TotalPrice;
            $scope.InvoiceUP.TotalDiscount = ((($scope.InvoiceUP.Subtotal) * ($scope.InvoiceUP.DiscountPrice)) / 100);

            if ($scope.InvoiceUP.VatPrice = '') {
                $scope.InvoiceUP.FinalPrice = ($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount) + ($scope.InvoiceUP.TotalVat);
            }
            else {
                $scope.InvoiceUP.TotalVat = (((($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount)) * ($scope.InvoiceUP.VatPrice)) / 100);
                $scope.InvoiceUP.FinalPrice = ($scope.InvoiceUP.Subtotal) - ($scope.InvoiceUP.TotalDiscount);
            }
            $scope.InvoiceUP.Paid = "";
            $scope.InvoiceUP.Due = "";
        }
    }

   
    //Save Data
    $scope.SaveData = function (data) {
        //alert('sas');
        
        if ($scope.submitText == 'Create Invoice') {
            
            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {

                $scope.InvoiceUP.CustomerName = $scope.Invoice.CustomerName;
                $scope.InvoiceUP.ContactNo = $scope.Invoice.ContactNo;
                $scope.InvoiceUP.InvoiceDate = $scope.Invoice.InvoiceDate;
                $scope.InvoiceUP.Address = $scope.Invoice.Address;
                $scope.InvoiceUP.Subtotal = $scope.InvoiceUP.Subtotal;
                $scope.InvoiceUP = data;
            
                alert(angular.toJson($scope.InvoiceUP.Subtotal));
                //alert(angular.toJson($scope.SuppName.BuyPrice));
             
                InvoiceProfileService.SaveFormData($scope.InvoiceUP).then(function (d) {
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

    fac.SaveFormData = function (data) {
        alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            //url: '/Invoice/ProductInfo_insert',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            // Success callback
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            alert('Error SaveFormData!');
            defer.reject(e);
        });
        return defer.promise;
    }

    return fac;

});



