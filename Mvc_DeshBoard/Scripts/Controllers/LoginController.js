angular.module('MyApp') 
.controller('LoginController', function ($scope, LoginService) {
       
    //alert(angular.toJson($scope.data));

    //Default Variable
    $scope.submitText = "Sign In";
    $scope.submitted = false;
    $scope.message = '';   
    $scope.isFormValid = false;

   
   
    $scope.User = {
        UserID:'1'
        
    };

  

    //validates form on client side
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });


    //Save Data
    $scope.Login_check = function (data) {
       
        if ($scope.submitText == 'Sign In') {
            
           
            $scope.submitted = true;
           
            $scope.message = '';           
            if ($scope.isFormValid) {
                //alert('sdsd');
                
                $scope.User = data;
                //alert(angular.toJson($scope.User));
                //Summary_Data();
                //Registration Check
                LoginService.Login_check($scope.User).then(function (d) {

                    if (d == 'Success') {
                        //LoginService.SaveLoginInfo($scope.User).then(function (d) {
                        //    //alert(d);
                        //});

                        //alert('Success');
                        window.location.pathname = 'Home/Deshboard';
                        //$window.location.href = '/Home/Deshboard';
                        
                        //window.location.pathname = 'Home/UserProfile';


                        
                        ClearForm();
                    }
                    else
                    {
                        alert(d);
                    }

                    $scope.submitText = "Sign In";
                });
            }
            else {
                $scope.message = '';

            }
        }
    }
    //Clear Form 
    function ClearForm() {
        $scope.User = {};
        $scope.f1.$setPristine(); 
        $scope.submitted = false;
    }

})




.factory('LoginService', function ($http, $q) { 


    var fac = {};

    fac.GetUserDetailByUserName = function (data) {
        //alert(angular.toJson(data));
        return $http.get('/Data/GetUserDetailByUserName', {
            params: { Username: data.Username }
            
        });
    }

 
    fac.Login_check = function (data) {
     


        var defer = $q.defer();

        var data_emp = fac.GetUserDetailByUserName(data);
       
        data_emp.then(function (result) {
            if (result.data.length < 1) {
                defer.resolve('User Name Not available');
                return defer.promise;
            }
            else {
                data.UserID = result.data[0].UserID;

                $http({
                    url: '/User/Login_check',
                    method: 'POST',
                    data: JSON.stringify(data),
                    headers: { 'content-type': 'application/json' }
                }).success(function (d) {
                    // Success callback
                    defer.resolve(d);
                }).error(function (e) {
                    //Failed Callback
                    alert('Error Login_check!');
                    defer.reject(e);
                });
            }
        });


       
        return defer.promise;
    }
    return fac;
});
