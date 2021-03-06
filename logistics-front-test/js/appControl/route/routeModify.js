let range_city = [];

layui.use(['element', 'form', 'laydate', 'layer', 'table', 'jquery'], function() {
    let element = layui.element,
        laydate = layui.laydate,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery;
    form = layui.form;

    let str = window.location.href.split('=');
    let expandId = str[1];
    let range = str[2].length>1?str[2].split(','):str[2];
    $("#mainroute").val(cityMap[str[3]]);
    $("#mainroutehidden").val(str[3]);

    $.each(range, function (i, item) {
        range_city.push(item.toString());
    });


    $.each(range_city, function (i, item) {
        let content = "<button type='button' class='layui-btn layui-btn-sm' id='city-" + item + "' onclick='removeSpan(" + item + ")'>";
        content += cityMap[item];
        content += "<span class='layui-badge layui-bg-gray' style='font-size: 4px; line-height: 16px; height: 16px'>X</span></button>";
        $("#selectedCity").append(content);
        console.log(range_city);
    });




    //--------------------------------------------------------------------------------------------------------------》》》
    $(document).on('click',"#mainroute",function () {


        layer.open({
            type: 2,
            title: '地区选择',
            content: ['index.html?changecity=1'],
            area: ['40%', '75%'],
            shadeClose: true,
            move: false,
            /*end: function() {
                table.reload('billTable', {
                    url: nginx_url + '/bill/findNotRelease'
                })
            }*/
        });
    });

    $(document).on('click','#rangeCity',function () {

        layer.open({
            type: 2,
            title: '地区选择',
            content: ['index.html?changecity=2'],
            area: ['40%', '75%'],
            shadeClose: true,
            move: false,
            end: function() {
                let select_id = $('#rangecityhidden').val();
                let select_value = $('#rangeCity').val();
                range_city.push(select_id.toString());
                if(select_id!=''&&select_id!=null){
                    console.log(select_id+"why");
                    let content = "<button type='button' class='layui-btn layui-btn-sm' id='city-" + select_id +"' onclick='removeSpan(" + select_id + ")'>";
                    content += select_value;
                    content += "<span class='layui-badge layui-bg-gray' style='font-size: 4px; line-height: 16px; height: 16px'>X</span></button>";
                    $("#selectedCity").append(content);
                    console.log(range_city);

                }
            }
        });

    });
    //----------------------------------------------------------------------------------------------------------------《《《

    form.on('submit(modInfo)', function () {
        let cityId = $("#mainroutehidden").val();
        console.log("expandId--"+expandId);
        console.log("cityId: " + cityId);
        console.log("range: " + range_city.toString());
        $.ajax({
            type: 'put',
            url: nginx_url + '/route/update/' + expandId,
            async: false,
            data: {
                'cityId': cityId,
                'rangeCity': range_city.toString()
            },
            //dataType: 'json',
            success: function (result) {
                if (result === 'SUCCESS') {
                    layer.msg('修改成功', {
                        time: 800,
                        icon: 1
                    }, function () {
                        let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    });
                } else {
                    layer.msg('修改失败', {
                        time: 800,
                        icon: 5
                    })
                }
            }
        });
        return false;
    })

});

function removeSpan(id) {
    let buttonId = '#city-' + id;
    range_city.splice($.inArray(id.toString(), range_city), 1);
    console.log(range_city);
    $(buttonId).remove();
    if(range_city==null||range_city.length==0){
        $('#rangeCity').val("");
    }
}

/*
function refreshSelect() {
    let selector = $("#rangeCity");
    selector.empty();
    let init = "<option value=''>请选择范围城市</option>";
    selector.append(init);
    $.each(cityArray, function (i, item) {
        if ((i+1) !== cityId && $.inArray((i+1), selected) === -1 && item !== '') {
            let option = "<option value='" + (i+1) + "'>";
            option += item;
            option += "</option>";
            $("#rangeCity").append(option);
        }
    });
}

function refreshInt() {
    $.each(selected, function (i, item) {
        selected[i] = parseInt(item);
    });
}*/

