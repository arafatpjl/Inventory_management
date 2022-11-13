
angular.module('MyApp')
.controller('ProductDetailsInsertController', function ($scope, ProductInsertProfileService, $window, $filter, $http) {


    //alert(angular.toJson($scope.data));

    $scope.submitText = "Save";
    $scope.submitText2 = "Save";

    $scope.submitted = false;
    $scope.submitted2 = false;

    $scope.message = '';
    $scope.isFormValid = false;
    $scope.f2_isFormValid = false;


    $scope.Product = {

        itemName: '',
        CategoryName: '',
        SuppName: ''
    };

    $scope.Model = {

        ModelName: 'N/A',
        ItemID: '',
        M_CategoryName: '',
        M_ItemName: '',
        ModelID: ''
    };

    $scope.ProductUp = {
        ItemID: '',
        itemName: '',
        CategoryID: '',
        CategoryName: '',
        SuppID: '',
        EntryDate: new Date("2015-03-25T12:00:00-06:00")
    };

    $scope.ProductInsert = {
        ItemID: '',
        SupplierID: '',
        CategoryID: '',
        Quantity: '0.0',
        BuyPrice: '0.0',
        SellPrice: '0.0',
        Description: '',
        ModelID: '',
        Image: '',
        Invoice: '',
        InvoiceDate: $filter('date')(new Date(), 'dd-MMM-yyyy')
        //$scope.Currdate = $filter('date')(new Date(), 'dd-MM-yyyy');
    };

    $scope.page = 1;

    //validates form on client side
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });
    //validates form on client side
    $scope.$watch('f2.$valid', function (newValue) {
        $scope.f2_isFormValid = newValue;
    });


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
    //Save Model Name
    $scope.SaveModel = function (data) {


        if ($scope.submitText2 == 'Save') {

            $scope.submitted2 = true;
            $scope.message = '';

            if ($scope.f2_isFormValid) {


             
                //$scope.Model.ItemID = $scope.Product.ItemID;
                //$scope.Model.M_ItemName = $scope.Product.ItemID;
                $scope.Model = data;
                //alert(angular.toJson($scope.Model));


                ProductInsertProfileService.SaveModelData($scope.Model).then(function (d) {
                    if (d == 'Success') {
                        alert('You have successfully Save Data');
                        angular.element('#ModelProductContent').modal('hide');
                        ClearForm();
                        $scope.f2.$setPristine();
                        //GetItemNameInfo();
                    }
                    else {
                        alert(d);
                    }
                    $scope.submitText2 = "Save";
                });

            }
            else {
                $scope.message = '';
            }
        }
    }



    $scope.editProductStatus = function (r) {

        //alert('sdsd');
        $scope.ProductUp = angular.copy(r);
        //alert(angular.toJson($scope.ProductUp));
        var CategoryList = $filter('filter')($scope.CategoryList, { CategoryID: $scope.ProductUp.CategoryID }, true);
        $scope.CategoryName = CategoryList[0];
        //alert(angular.toJson($scope.CategoryName));

    }


    $scope.ProductUpdate = function (data) {


        $scope.f2_submitted = true;
        $scope.message = '';

        //alert($scope.f2_isFormValid);

        //alert(angular.toJson(data));
        if ($scope.f2_isFormValid) {
            var isConfirmed = confirm("Are you sure to Update this record ?");
            if (isConfirmed) {


                $scope.ProductUp = data;

                //$scope.ProductUp.EntryDate = new Date(parseInt($scope.ProductUp.EntryDate.substr(6)));
                //alert(angular.toJson($scope.ProductUp));
                ProductInsertProfileService.ProductUpdate($scope.ProductUp).then(function (d) {

                    if (d == 'Success') {

                        angular.element('#ModelProductContent').modal('hide');
                        alert('You have successfully Updated');

                        // Populate JobCard
                        GetItemNameInfo();

                        $scope.f2.$setPristine();

                        //ClearForm();
                    }

                    else {
                        alert(d);

                        //return;
                    }

                    $scope.submitText2 = "Update";
                });
            }
            else {
                return false;
            }

        }
    }

    // Delete Product Name

    $scope.DeleteProduct = function (data) {

        $scope.message = '';


        //alert(angular.toJson(data));


        var isConfirmed = confirm("Are you sure to Delete this record ?");
        if (isConfirmed) {

            $scope.CategoryUp = data;


            //alert(angular.toJson($scope.CategoryUp));
            ProductInsertProfileService.ProductDelete($scope.CategoryUp).then(function (d) {

                if (d == 'Success') {


                    alert('You have successfully Delete Record');

                    // Populate JobCard
                    GetProductInfo();

                    //$scope.f2.$setPristine();

                    //ClearForm();
                }

                else {
                    alert(d);

                    //return;
                }

                //$scope.submitText2 = "Update";
            });
        }
        else {
            return false;
        }

        //}


    }

    // delete Product content 

    $scope.DeleteProductInfo = function (data) {

        $scope.message = '';


        //alert(angular.toJson(data));


        var isConfirmed = confirm("Are you sure to Delete this record ?");
        if (isConfirmed) {

            $scope.SupplierUp = data;


            //alert(angular.toJson($scope.CategoryUp));
            ProductInsertProfileService.ProductInfoDelete($scope.SupplierUp).then(function (d) {

                if (d == 'Success') {


                    alert('You have successfully Delete Record');

                    // Populate JobCard
                    GetSupplierInfo();

                    //$scope.f2.$setPristine();

                    //ClearForm();
                }

                else {
                    alert(d);

                    //return;
                }

                //$scope.submitText2 = "Update";
            });
        }
        else {
            return false;
        }

        //}


    }
    // Populate Category Content

    ProductInsertProfileService.GetCategoryContent().then(function (d) {
        $scope.CategoryList = d.data;
    }, function (error) {
        alert('Error GetCategoryContent!');
    });

    ProductInsertProfileService.GetCategoryContent_M().then(function (d) {
        $scope.CategoryList_M = d.data;
    }, function (error) {
        alert('Error GetCategoryContent!');
    });

    //function GetCategoryInfo() {
    //    ProductInsertProfileService.GetCategoryContent().then(function (d) {
    //        $scope.CategoryList = d.data;
    //    }, function (error) {
    //        alert('Error GetCategoryInfo!');
    //    });
    //}
    $scope.GetCategoryID = function () {
        $scope.Product.CategoryID = $scope.CategoryName.CategoryID;
        //alert(angular.toJson($scope.Product.CategoryID ));
        $scope.ProductnameList = $filter('filter')($scope.ItemList, { CategoryID: $scope.CategoryName.CategoryID }, true);
        //alert(angular.toJson($scope.ProductnameList));
    };

    $scope.GetCategoryID_M = function () {
        $scope.Product.CategoryID = $scope.M_CategoryName.CategoryID;
        //alert(angular.toJson($scope.Product.CategoryID ));
        $scope.ProductnameList_M = $filter('filter')($scope.ItemList, { CategoryID: $scope.M_CategoryName.CategoryID }, true);

    };
    //$scope.GetCategoryUpID = function () {
    //    $scope.ProductUp.CategoryID = $scope.CategoryName.CategoryID;
    //    //alert(angular.toJson($scope.Product.CategoryID ));

    //};

    // Populate Item Name Content

    ProductInsertProfileService.GetItemNameContent().then(function (d) {
        $scope.ItemList = d.data;
        //alert(angular.toJson($scope.ItemList));
    }, function (error) {
        alert('Error GetItemNameContent!');
    });
    //ProductInsertProfileService.GetItemNameContent_M().then(function (d) {
    //    $scope.ItemList_M = d.data;
    //    //alert(angular.toJson($scope.ItemList));
    //}, function (error) {
    //    alert('Error GetItemNameContent!');
    //});

    //function GetItemNameInfo() {
    //    ProductInsertProfileService.GetItemNameContent().then(function (d) {
    //        $scope.ItemList = d.data;
    //    }, function (error) {
    //        alert('Error GetItemNameInfo!');
    //    });
    //}

    $scope.GetItemID = function () {
        $scope.Model.ItemID = $scope.ItemName.itemID;

        //alert(angular.toJson($scope.Model.ItemID));

        //alert(angular.toJson($scope.ModelNameList));

        $scope.ProductModelList = $filter('filter')($scope.ModelNameList, { ItemID: ''+$scope.Model.ItemID }, true);
        // string and integer er jnno problem hssa 
        //alert(angular.toJson($scope.ProductModelList));

    };
    $scope.GetItemID_M = function () {
        
        $scope.Product.ItemID = $scope.M_ItemName.itemID;
        $scope.Model.ItemID = $scope.M_ItemName.itemID;
        //alert(angular.toJson($scope.Model.ItemID));
        $scope.ItemList = $filter('filter')($scope.SupplierNameList, { ItemID: $scope.M_ItemName.ItemID }, true);

    };
    // Populate Supplier Name Content
    ProductInsertProfileService.GetSupplierContent().then(function (d) {
        $scope.SupplierNameList = d.data;
        //alert(angular.toJson($scope.SupplierNameList ));
    }, function (error) {
        alert('Error GetSupplierContent!');
    });

    // Populate Model Name Content
    ProductInsertProfileService.GetModelContent().then(function (d) {
        $scope.ModelNameList = d.data;
        //alert(angular.toJson($scope.SupplierNameList ));
    }, function (error) {
        alert('Error GetModelContent!');
    });

    // Populate ProductInfo Name Content
    ProductInsertProfileService.GetProductInfoContent().then(function (d) {
        $scope.ProductInfoList = d.data;
        //alert(angular.toJson($scope.ProductInfoList ));
    }, function (error) {
        alert('Error GetProductInfoContent!');
    });

    function GetProductInfo() {
        ProductInsertProfileService.GetProductInfoContent().then(function (d) {
            $scope.ProductInfoList = d.data;
        }, function (error) {
            alert('Error GetProductInfoListContent!');
        });
    }

    $scope.GetSupplierID = function () {
        $scope.Product.SuppID = $scope.SuppName.SuppID;
        //alert(angular.toJson($scope.Product.SuppID ));
        

    };

    //$scope.totalItems = $scope.ProductUp.SuppID.length;
    $scope.currentPage = 4;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };


    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

    //Clear Form 
    function ClearForm() {
        $scope.Model = {};
        $scope.f1.$setPristine();
        $scope.f2.$setPristine();

        $scope.submitted = false;
        $scope.submitted2 = false;

    }

})


.factory('ProductInsertProfileService', function ($http, $q) {

    var fac = {};

    fac.GetCategoryContent = function () {
        return $http.get('/Data/GetCategory')
    }
    fac.GetCategoryContent_M = function () {
        return $http.get('/Data/GetCategory')
    }
    

    fac.GetItemNameContent = function () {
        return $http.get('/Data/GetItemName')
    }
    fac.GetModelContent = function () {
        return $http.get('/Data/GetProductModelName')
    }

    fac.GetProductInfoContent = function () {
        return $http.get('/Product/GetProductInfo')
    }

    //fac.GetItemNameContent_M = function () {
    //    return $http.get('/Data/GetItemName')
    //}
    

    fac.GetSupplierContent = function () {
        return $http.get('/Data/GetSupplier')
    }


    var getModelAsFormData = function (data) {
        var dataAsFormData = new FormData();
        angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    };


    fac.SaveModelData = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/Product_Model_Info_insert',
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

    fac.SaveFormData = function (data) {
        alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Product/ProductInfo_insert',
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

    fac.ProductUpdate = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/ItemInfo_Update',
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

    fac.ProductInfoDelete = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Product/ProductInfo_Delete',
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



