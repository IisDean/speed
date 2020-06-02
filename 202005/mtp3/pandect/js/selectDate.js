
    function getDay(day){
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
    }

    function doHandleMonth(month){
        var m = month;
        if(month.toString().length == 1){
            m = "0" + month;
        }
        return m;
    }

    var locale = {
        "format": 'YYYY-MM-DD',
        "applyLabel": "OK",
        "cancelLabel": "Cancel",
        "fromLabel": "Start Date",
        "toLabel": "End Date'",
        "weekLabel": "W",
        "daysOfWeek": ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "firstDay": 1
    };

    function retreatData(data){
        $('#config-demo1').daterangepicker({
            "maxDate" : getDay(0),
            "startDate": getDay(-data+1),
            "endDate": getDay(0),
            "locale": locale
        }, function(start, end, label) {
            var st = start.format().substring(0,10);
            var en = end.format().substring(0,10);
            $('#config-demo1').val(st + ' - ' + en);
            $('[basis-day]').removeClass('check');
        });
    }

    $('[basis-day]').on('click',function(){
        var da = $(this).attr('basis-day');
        $('[basis-day]').removeClass('check');
        $(this).addClass('check');
        retreatData(da);
    }).eq(0).click();
