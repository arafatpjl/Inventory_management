
angular.module('MyApp')
.controller('DataController', function ($scope, DataProfileService, $window, $filter, $http) {


    //alert(angular.toJson($scope.data));

    $scope.submitText = "Save";
    $scope.submitText2 = "Update";
   
    $scope.submitted = false;
    $scope.submitted2 = false;
 
    $scope.isFormValid = false;
    $scope.f2_isFormValid = false;
  

    $scope.Supplier = {

        SuppName: '',
        Address: '',
        Contact: '',
        Email: '',
        Remarks: ''
    };

    $scope.SupplierUp = {
        SuppID: '',
        SuppName: '',
        Address: '',
        Contact: '',
        Email: '',
        Remarks: '',
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
              
               
                //$scope.Fabric.WidthUnit = $scope.WidthUnit.id;
                //$scope.Fabric.WeightUnit = $scope.WeightUnit.id;
                //$scope.Fabric.PriceUnit = $scope.PriceUnit.id;
                $scope.Supplier = data;
                //alert(angular.toJson($scope.Supplier));


                DataProfileService.SaveFormData($scope.Supplier).then(function (d) {
                    if (d == 'Success') {
                        alert('You have successfully Save Data');
                       
                        ClearForm();
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

    

    $scope.editSupplierStatus = function (r) {

        //alert('sdsd');
        $scope.SupplierUp = angular.copy(r);
        //alert(angular.toJson($scope.SupplierUp));

    }


    $scope.SupplierUpdate = function (data) {
      

        $scope.f2_submitted = true;
        $scope.message = '';

        //alert($scope.f2_isFormValid);
    
        //alert(angular.toJson(data));
        if ($scope.f2_isFormValid) {
       
            $scope.SupplierUp = data;
         
            //$scope.SupplierUp.EntryDate = new Date(parseInt($scope.SupplierUp.EntryDate.substr(6)));
            //alert(angular.toJson($scope.SupplierUp));
            DataProfileService.SupplierUpdate($scope.SupplierUp).then(function (d) {

                if (d == 'Success') {

                    angular.element('#ModelSupplierContent').modal('hide');
                    alert('You have successfully Updated');

                    // Populate JobCard
                    GetSupplierInfo();

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
    }

    // Delete Supplier Name

    $scope.DeleteSupplier = function (data) {

        $scope.message = '';


        //alert(angular.toJson(data));


        var isConfirmed = confirm("Are you sure to Delete this record ?");
        if (isConfirmed) {

            $scope.SupplierUp = data;


            //alert(angular.toJson($scope.CategoryUp));
            DataProfileService.SupplierDelete($scope.SupplierUp).then(function (d) {

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
    // Populate Fabric Content

    DataProfileService.GetSupplierContent().then(function (d) {
        $scope.SupplierList = d.data;
    }, function (error) {
        alert('Error GetSupplierContent!');
    });

    function GetSupplierInfo() {
        DataProfileService.GetSupplierContent().then(function (d) {
            $scope.SupplierList = d.data;
        }, function (error) {
            alert('Error GetSupplierContent!');
        });
    }

    //$scope.pageChanged = function () {
    //    var startPos = ($scope.page - 1) * 3;
    
    //    console.log($scope.page);
    //};

    //$scope.totalItems = $scope.SupplierUp.SuppID.length;
    $scope.currentPage = 4;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    //$scope.pageChanged = function () {
    //    console.log('Page changed to: ' + $scope.currentPage);
    //};

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

    //Clear Form 
    function ClearForm() {
        $scope.Supplier = {};
        $scope.f1.$setPristine();
        $scope.f2.$setPristine();
 
        $scope.submitted = false;
        $scope.submitted2 = false;
     
    }

})


.factory('DataProfileService', function ($http, $q) {

    var fac = {};

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

    
    fac.SaveFormData = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/SupplierInfo_insert',
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

    fac.SupplierUpdate = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/SupplierInfo_Update',
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

    fac.SupplierDelete = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/SupplierInfo_Delete',
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



