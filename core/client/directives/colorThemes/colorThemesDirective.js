// 		function generateThemes($injector) {
//     var styles = $injector.has('$MD_THEME_STYLESHEETS') ? $injector.get('$MD_THEME_STYLESHEETS') : [];
//     if (styles) {
//         var $q = $injector.get('$q');
//         var $http = $injector.get('$http');
//         var calls = [];

//         angular.forEach(styles, function(style){
//             calls.push($http.get(style));
//         });

//         $q.all(calls).then(function(responses) {
//             var css = '';
//             angular.forEach(responses, function(response) {
//                 css += response.data;
//             });
//             generationIsDone = false; // here
//             generateCss(css);
//         });
//     } else {
//         var css = $injector.has('$MD_THEME_CSS') ? $injector.get('$MD_THEME_CSS') : '';
//         generationIsDone = false; // here 
//         generateCss(css);
//     }
// }
