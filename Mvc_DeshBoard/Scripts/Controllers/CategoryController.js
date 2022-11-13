
angular.module('MyApp')
.controller('CategoryController', function ($scope, CategoryProfileService, $window, $filter, $http) {


    //alert(angular.toJson($scope.data));

    $scope.submitText = "Save";
    $scope.submitText2 = "Update";

    $scope.submitted = false;
    $scope.submitted2 = false;

    $scope.message = '';
    $scope.isFormValid = false;
    $scope.f2_isFormValid = false;
  

    $scope.Category = {

        CategoryName: ''
       
    };

    $scope.CategoryUp = {
        CategoryID: '',
        CategoryName: ''
    };

  

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
                $scope.Category = data;
                //alert(angular.toJson($scope.Category));


                CategoryProfileService.SaveFormData($scope.Category).then(function (d) {
                    if (d == 'Success') {
                        alert('You have successfully Save Data');
                       
                        ClearForm();
                        GetCategoryInfo();
                        $scope.f1.$setPristine();
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

    

    $scope.editCategoryStatus = function (r) {

        //alert('sdsd');
        $scope.CategoryUp = angular.copy(r);
        //alert(angular.toJson($scope.CategoryUp));

    }


    $scope.CategoryUpdate = function (data) {
      

        $scope.f2_submitted = true;
        $scope.message = '';

        //alert($scope.f2_isFormValid);
    
        //alert(angular.toJson(data));
        if ($scope.f2_isFormValid) {

            var isConfirmed = confirm("Are you sure to Update this record ?");
            if (isConfirmed) {
                 
            $scope.CategoryUp = data;
         
            //$scope.CategoryUp.EntryDate = new Date(parseInt($scope.CategoryUp.EntryDate.substr(6)));
            //alert(angular.toJson($scope.CategoryUp));
            CategoryProfileService.CategoryUpdate($scope.CategoryUp).then(function (d) {

                if (d == 'Success') {

                    angular.element('#ModelCategoryContent').modal('hide');
                    alert('You have successfully Updated');

                    // Populate JobCard
                    GetCategoryInfo();

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

    //Delete Category delete

    $scope.DeleteCategory = function (data) {

        $scope.message = '';


        //alert(angular.toJson(data));


            var isConfirmed = confirm("Are you sure to Delete this record ?");
            if (isConfirmed) {

                $scope.CategoryUp = data;

           
                //alert(angular.toJson($scope.CategoryUp));
                CategoryProfileService.CategoryDelete($scope.CategoryUp).then(function (d) {

                    if (d == 'Success') {

                       
                        alert('You have successfully Delete Record');

                        // Populate JobCard
                        GetCategoryInfo();

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

    CategoryProfileService.GetCategoryContent().then(function (d) {
        $scope.CategoryList = d.data;
    }, function (error) {
        alert('Error GetCategoryContent!');
    });

    function GetCategoryInfo() {
        CategoryProfileService.GetCategoryContent().then(function (d) {
            $scope.CategoryList = d.data;
        }, function (error) {
            alert('Error GetCategoryContent!');
        });
    }



    //Clear Form 
    function ClearForm() {
        $scope.Category = {};
        $scope.f1.$setPristine();
        $scope.f2.$setPristine();
       
        $scope.submitted2 = false;
      
    }

})


.factory('CategoryProfileService', function ($http, $q) {

    var fac = {};

    fac.GetCategoryContent = function () {
        return $http.get('/Data/GetCategory')
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
            url: '/Data/CategoryInfo_insert',
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

    fac.CategoryUpdate = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/CategoryInfo_Update',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            // Success callback
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            alert('Error CategoryUpdate!');
            defer.reject(e);
        });
        return defer.promise;
    }
    fac.CategoryDelete = function (data) {
        //alert(angular.toJson(data));
        var defer = $q.defer();
        $http({
            url: '/Data/CategoryInfo_Delete',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            // Success callback
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            alert('Error CategoryDelete!');
            defer.reject(e);
        });
        return defer.promise;
    }

   

 
    return fac;

});



