
angular.module('MyApp')
.controller('ProductNameController', function ($scope, ProductProfileService, $window, $filter, $http) {


    //alert(angular.toJson($scope.data));

    $scope.submitText = "Save";
    $scope.submitText2 = "Update";
  
    $scope.submitted = false;
    $scope.submitted2 = false;
 
    $scope.message = '';
    $scope.isFormValid = false;
    $scope.f2_isFormValid = false;


    $scope.Product = {

        itemName: '',
        CategoryID: ''
    };

    $scope.ProductUp = {
        itemID: '',
        itemName: '',
        CategoryID: '',
        CategoryName: '',
        EntryDate: new Date("2015-03-25T12:00:00-06:00")
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


                $scope.Product = data;
                //alert(angular.toJson($scope.Product));


                ProductProfileService.SaveFormData($scope.Product).then(function (d) {
                    if (d == 'Success') {
                        alert('You have successfully Save Data');

                        ClearForm();
                        GetItemNameInfo();
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
            ProductProfileService.ProductUpdate($scope.ProductUp).then(function (d) {

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
            ProductProfileService.ProductDelete($scope.CategoryUp).then(function (d) {

                if (d == 'Success') {


                    alert('You have successfully Delete Record');

                    // Populate JobCard
                    GetItemNameInfo();

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

    ProductProfileService.GetCategoryContent().then(function (d) {
        $scope.CategoryList = d.data;
    }, function (error) {
        alert('Error GetCategoryContent!');
    });

    function GetCategoryInfo() {
        ProductProfileService.GetCategoryContent().then(function (d) {
            $scope.CategoryList = d.data;
        }, function (error) {
            alert('Error GetCategoryInfo!');
        });
    }
    $scope.GetCategoryID= function () {
        $scope.Product.CategoryID = $scope.CategoryName.CategoryID;
        //alert(angular.toJson($scope.Product.CategoryID ));

    };
    $scope.GetCategoryUpID = function () {
        $scope.ProductUp.CategoryID = $scope.CategoryName.CategoryID;
        //alert(angular.toJson($scope.Product.CategoryID ));

    };

    // Populate Item Name Content

    ProductProfileService.GetItemNameContent().then(function (d) {
        $scope.IteamList = d.data;
        //alert(angular.toJson($scope.IteamList));
    }, function (error) {
        alert('Error GetItemNameContent!');
    });

    function GetItemNameInfo() {
        ProductProfileService.GetItemNameContent().then(function (d) {
            $scope.IteamList = d.data;
        }, function (error) {
            alert('Error GetItemNameInfo!');
        });
    }
   

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
        $scope.Product = {};
        $scope.f1.$setPristine();
        $scope.f2.$setPristine();
   
        $scope.submitted = false;
        $scope.submitted2 = false;
    
    }

})


.factory('ProductProfileService', function ($http, $q) {

    var fac = {};

    fac.GetCategoryContent = function () {
        return $http.get('/Data/GetCategory')
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
            url: '/Data/IteamInfo_insert',
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

    fac.ProductDelete = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/ItemInfo_Delete',
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



