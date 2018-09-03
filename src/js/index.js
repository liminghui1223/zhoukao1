// $(function() {
//     $.ajax({
//         url: '/api/getData',
//         dataType: 'json',
//         success: function(res) {
//             if (res.code === 0) {
//                 var str = '';
//                 res.data.forEach(function(file) {
//                     str += '<span>' + file.img + '</span>'
//                 })
//                 $('.bottom').html(str);
//             }
//         }
//     })
// })