$(function () {


    $("#project").on("change", function () {


        var project_id = $(this).val();

        $.ajax({
            url    : '/milestones',
            type   : 'post',
            data   : {
                project_id: project_id

            },
            success: function (response) {

                console.log(response);

                if (response.length > 0) {

                    var str = '';

                    $.each(response, function (i, ele) {
                        var due_date = !ele.due_date ? ' not set ' : "Due: " + ele.due_date;
                        str += '<option value="' + ele.title + '">' + ele.title + ' - ' + due_date + '</option>';
                    });


                } else {
                    str = '<option value="">Select a project first...</option>';
                }

                $("#milestone").html(str);
            }
        });
    });


});