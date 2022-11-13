
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
        Subtotal: 0,
        VatPrice: 0,
        TotalVat: 0,
        DiscountPrice: 0,
        TotalDiscount: 0,
        FinalPrice: 0,
        Paid: 0,
        Due: 0
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
        Description: '',
        Subtotal: 0,
        VatPrice: 0,
        TotalVat: 0,
        DiscountPrice: 0,
        TotalDiscount: 0,
        FinalPrice: 0,
        Paid: 0,
        Due: 0

    }];


    $scope.First = false;
   
  

    $scope.Add = function () {


        if ($scope.First == false) {
            
            $scope.InvoiceUP.splice(0, 1);
            $scope.First = true;
        }
      

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
        //else if ($scope.Invoice.ItemID == $scope.InvoiceUP.ItemID) {
        //    return;
        //}
        else {
            //alert('dsd');
            //if (customer.ItemID == $scope.Invoice.ItemID) {
            //    return;
            //}
            customer.id = $scope.InvoiceUP.length + 1
            customer.Quantity = $scope.Invoice.Quantity;
            customer.ItemID = $scope.Invoice.ItemID;
            customer.ItemName = $scope.Invoice.ItemName;
            customer.UnitPrice = $scope.Invoice.UnitPrice;
            customer.TotalPrice = $scope.Invoice.TotalPrice;

            customer.Subtotal = $scope.Invoice.Subtotal + $scope.Invoice.TotalPrice;
            customer.TotalDiscount = $scope.Invoice.TotalDiscount;
            customer.TotalVat = $scope.Invoice.TotalVat;
            customer.FinalPrice = $scope.Invoice.FinalPrice;
            customer.Paid = $scope.Invoice.Paid;
            customer.Due = $scope.Invoice.Due;

            customer.CustomerName = $scope.Invoice.CustomerName;
            customer.ContactNo = $scope.Invoice.ContactNo;
            customer.Address = $scope.Invoice.Address;
            customer.InvoiceDate = $scope.Invoice.InvoiceDate;
          

            $scope.InvoiceUP.push(customer);
            //alert($scope.InvoiceUP.Subtotal);
            $scope.Invoice.Subtotal = $scope.Invoice.Subtotal + $scope.Invoice.TotalPrice;
            $scope.InvoiceUP.Subtotal = $scope.Invoice.Subtotal
            $scope.InvoiceUP.FinalPrice = $scope.InvoiceUP.Subtotal;

            //alert(angular.toJson($scope.InvoiceUP));
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
        //alert(TotalPrice);
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
            //alert(angular.toJson(data.FinalPrice));
            if ($scope.isFormValid) {

                //alert($scope.data);
                $scope.InvoiceUP.Subtotal = $scope.InvoiceUP.Subtotal;
                $scope.InvoiceUP[0].FinalPrice = data.FinalPrice;
                $scope.InvoiceUP[0].TotalDiscount = data.TotalDiscount;
                $scope.InvoiceUP[0].TotalVat = data.TotalVat;
                $scope.InvoiceUP[0].Paid = data.Paid;
                $scope.InvoiceUP[0].Due =  data.Due;
                $scope.InvoiceUP = data;
            
                //alert(angular.toJson($scope.InvoiceUP));
                //alert(angular.toJson($scope.SuppName.BuyPrice));
             
                InvoiceProfileService.SaveFormData($scope.InvoiceUP).then(function (d) {
                    if (d == 'Success') {
                        alert('You have Successfully Save Data');

                        //ClearForm();
                        //$scope.InvoiceUP[0] = "";
                        //GetItemNameInfo();
                        //$scope.Invoice = "";
                        $scope.Invoice.CustomerName = "";
                        $scope.Invoice.Address = "";
                        $scope.Invoice.ContactNo = "";
                        $scope.InvoiceUP = [];
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
       
        //$scope.Invoice.FinalPrice = $scope.InvoiceUP.FinalPrice;
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
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Invoice/InvoiceInfo_insert',
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



