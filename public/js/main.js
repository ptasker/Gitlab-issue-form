$(function () {

    $('.timepicker').timepicker();
    $('.datepicker').datepicker({
        "dateFormat": 'yy-mm-dd'
    });
    function getMilestones(project_id) {

        $.ajax({
            url : '/milestones',
            type: 'post',
            data: {
                project_id: project_id
            },

            success: function (response) {

                console.log(response);

                if (response.length > 0) {

                    var str = '';

                    $.each(response, function (i, ele) {
                        var due_date = !ele.due_date ? 'Due date not set' : "Due: " + ele.due_date;
                        str += '<option value="' + ele.title + '">' + ele.title + ' - ' + due_date + '</option>';
                    });

                } else {
                    str = '<option value="">No milestones. Create a new one?</option>';
                }

                $("#milestone").html(str);

            }
        });
    }

    $("#project").on("change", function () {
        var project_id = $(this).val();
        getMilestones(project_id);
    });


    $("#add-milestone-form").on("submit", function () {


        var title = $("#add-milestone-form #title").val();
        var desc  = $("#add-milestone-form #description").val();
        var date  = $("#add-milestone-form #date").val();

        var project_id = $("#project option:selected").val();

        if (!title || !desc || !date) {
            $(this).find('.msg').html('<div class="alert alert-dismissible alert-warning"> <button type="button" class="close" data-dismiss="alert">×</button>Please fill out all fields</div>');
            return false;
        }

        var data = {};

        $.ajax({
            url : '/createmilestone',
            type: 'post',
            data: {
                project_id     : project_id,
                milestone_title: title,
                milestone_desc : desc,
                due_date       : date
            },

            success: function (response) {

                console.log(response);

                $('#myModal').modal('hide');
                getMilestones(response.project_id);
            }
        });


        return false;

    });

});