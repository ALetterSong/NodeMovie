/**
 * admin.js
 *
 * Created by xiepan on 2016/10/11 16:58.
 */

$(function () {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/list/?id=' + id
        })
            .done(function (results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            })
    });


    $('#form-signup .btn-success').click(function () {
        // $(".form-signup").valid();
        var $$ = $('#form-signup');
        var data = $$.serializeArray();
        var postData = {};
        console.log("serializeArray: " + $$.serializeArray().toString());
        console.log("serialize: " + $$.serialize());
        $.each(data, function (n, v) {
            postData[data[n].name] = data[n].value;
        });
        console.log(postData);
        $.ajax({
            type: "POST",
            url: '/user/signup',
            // dataType: 'json',
            data: postData,
            error: function (xhr, textStatus, errorThrown) {
                // alert('error' + textStatus + " " + errorThrown);
                console.log(textStatus + " " + errorThrown);
            }
            ,
            success: function (data) {
                var m = data['message'];
                if (m == 'error') {
                    alert(data['info'])
                } else if (m == 'success') {
                    window.location = data['url'];
                }
            }
        });
        // return false;
    });
});