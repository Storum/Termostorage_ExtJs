Ext.define('Termo.Utilities', {
    statics: {
        get_unit_group_list: function () {
            if (GlobalVars.eid !== "")
                Ext.data.JsonP.request(
                    {
                        url: GlobalVars.url_setting + 'php/get_unit_group_list.php',
                        params:
                        {
                            eid: GlobalVars.eid,
                            format: 'json'
                        },
                        callbackKey: 'callback',
                        async: false,
                        success: function (result)
                        {
                            if (result.error == 8)
                                Ext.MessageBox.alert('Ошибка Wialon', 'Неверный токен');
                            else if (result.error == 4)
                                Ext.MessageBox.alert('Ошибка Wialon', 'Ошибка ввода Wialon');
                            else
                            {
                               GlobalVars.avl_unit_groups = result.items; 
                            }
                               
                        }
                    });
        },
        

        get_unit_list: function () {
            if (GlobalVars.eid !== "")
                Ext.data.JsonP.request(
                    {
                        url: GlobalVars.url_setting + 'php/get_unit_list.php',
                        params:
                        {
                            eid: GlobalVars.eid,
                            format: 'json'
                        },
                        callbackKey: 'callback',
                        async: false,
                        success: function (result)
                        {
                            console.log(result);
                            
                            if (result.error == 8)
                                Ext.MessageBox.alert('Ошибка Wialon', 'Неверный токен');
                            else if (result.error == 4)
                                Ext.MessageBox.alert('Ошибка Wialon', 'Ошибка ввода Wialon');
                            else
                            {
                                GlobalVars.avl_units = result.items;
                                Termo.Utilities.load_units_to_tree(); // TODO сделать вызов нормальный. Чтобы вызывалась одна функция обновления источников, потом из нее уже получалось как надо
                            }
                               
                        }
                    });
        },
        
        get_report_template_data: function () {
            if (GlobalVars.eid !== "")
                Ext.data.JsonP.request(
                    {
                        url: GlobalVars.url_setting + 'php/get_report_template_data.php',
                        params:
                        {
                            eid: GlobalVars.eid,
                            report_name: GlobalVars.report_template_name,
                            format: 'json'
                        },
                        callbackKey: 'callback',
                        async: false,
                        success: function (result)
                        {
                            GlobalVars.resource_id = result.resource_id;
                            GlobalVars.template_id =  result.template_id;
                            GlobalVars.interval_of_tracing =  result.interval_of_tracing;
                               
                        }
                    });
        },
        
        
        get_unit_name_by_id: function (unit_id) {
            for (var next_unit in GlobalVars.avl_units) {                

                if (GlobalVars.avl_units[next_unit].id == unit_id)
                    return GlobalVars.avl_units[next_unit].nm;
        
            }
        },
        get_unit_icon_by_id: function (unit_id) {
            for (var next_unit in GlobalVars.avl_units) {                

                if (GlobalVars.avl_units[next_unit].id == unit_id)
                    return 'http://hst-api.wialon.com' + GlobalVars.avl_units[next_unit].uri + "?b=16&v=1";
                    
        
            }
        },
        get_unit_fld_value_by_id: function (unit_id, field_name) {
            for (var next_unit in GlobalVars.avl_units) {                

                if (GlobalVars.avl_units[next_unit].id == unit_id)
                {
                    for (var next_fld in GlobalVars.avl_units[next_unit].flds)
                    {
                        if (GlobalVars.avl_units[next_unit].flds[next_fld].n == field_name)
                            return GlobalVars.avl_units[next_unit].flds[next_fld].v;
                    }

                }
            }
            
            return 0;
        },
        
        
        get_units_without_store: function (i){
            

            var finded = false;
            var is_group_have_items = false;
            var units_wo_groups = [];
            
//            var units_wo_groups = "{\"id\":" + i++ + ", \"expanded\":true, \"text\":\"СКЛАДЫ ВНЕ ГРУПП\", \"children\":[";
//            comma = "";
            
            for (var next_unit in GlobalVars.avl_units){
                
                finded = false;
                
                for (var next_group_ in GlobalVars.avl_unit_groups){
                    
                    for (var next_group_unit in GlobalVars.avl_unit_groups[next_group_].u)
                    {
                        if (GlobalVars.avl_unit_groups[next_group_].u[next_group_unit] == GlobalVars.avl_units[next_unit].id)
                        {
                            finded = true;
                            break;
                        }
                            
                    }
                    
                    if (finded)
                        break;
                }

                if (!finded)
                {
                    is_group_have_items = true;
                    units_wo_groups[units_wo_groups.length] = {/*id: i++, */leaf:true, unit_id: GlobalVars.avl_units[next_unit].id, text:GlobalVars.avl_units[next_unit].nm, icon:'http://hst-api.wialon.com' + GlobalVars.avl_units[next_unit].uri + "?b=16&v=1"};
                }
                    
            }
            
            
            if (is_group_have_items)        
                return {id:i++, expanded:true, text:"СКЛАДЫ ВНЕ ГРУПП", children:units_wo_groups};
            else
                return "{}";
            
        },

        load_units_to_tree: function (){
            
            /*var data = [];
            var date = new Date();
            
            
            for (var next_data in Report_data)
            {
                if (Math.abs(Report_data[next_data].c['2']) > 100000)
                    continue;
                
                date.setTime(Date.parse(Report_data[next_data].c['0']));
                
                data[data.length] = {humid_min: HumidMin, humid_max: HumidMax, humid_data: Report_data[next_data].c['1'],  temperature_data: Report_data[next_data].c['2'], date:date.toString(), x: 1000};
                
            }*/
            
            var data = [];
            var units_of_group = [];
            var groups = [];
            var i = 0;
            var i_gr = 0;
            var first_group = true;
            
            var HumidMax_ = 0;
            var HumidMin_ = 0;
            var TermoMax_ = 0;
            var TermoMin_ = 0;
            var unit_id_ = 0;
            var icon_ = "";
            
            
            for (var next_group in GlobalVars.avl_unit_groups){

                if (i!==0)
                    i++;
                
                i_gr = i;

                    
                units_of_group = [];
                for (var next_item in GlobalVars.avl_unit_groups[next_group].u){
                    
                    i++;
                    HumidMax_ = Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'HumidMax');
                    HumidMin_ = Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'HumidMin');
                    TermoMax_ = Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'TermoMax');
                    TermoMin_ = Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'TermoMin');
                    unit_id_ = GlobalVars.avl_unit_groups[next_group].u[next_item];
                    icon_ = Termo.Utilities.get_unit_icon_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item]) + "?b=16&v=1";
                    
                    
                    units_of_group[units_of_group.length] = {id:i, 
                                                             text: Termo.Utilities.get_unit_name_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item]),
                                                             HumidMax: HumidMax_,
                                                             HumidMin: HumidMin_,
                                                             TermoMax: TermoMax_,
                                                             TermoMin: TermoMin_,
                                                             unit_id: unit_id_,
                                                             icon: icon_,
                                                             leaf: true,
                                                             expanded: false};
                                                             
                }
                
                groups[groups.length] = {id:i_gr, leaf:false, unit_id: GlobalVars.avl_unit_groups[next_group].id, text:GlobalVars.avl_unit_groups[next_group].nm, expanded:true, children:units_of_group};
                
            }
            
            
            
            groups[groups.length] = Termo.Utilities.get_units_without_store (i);
            

            
            data = {text:"Имя", expanded:true, children:groups};
            
           
            
            
            var tree = Ext.getCmp('id_tr_panel_stories');
            var store = tree.getStore().setRootNode(data);
            
            
            /*var i = 0;
            var text_result = "{\"text\":\"Имя\", \"expanded\":true, \"children\":[";
            var comma = "";
            
            var HumidMax = 0;
            var HumidMin = 0;
            var TermoMax = 0;
            var TermoMin = 0;
            
            for (var next_group in GlobalVars.avl_unit_groups){
                
                text_result += comma + "{\"id\":" + i++ + ", \"group_id\":" + GlobalVars.avl_unit_groups[next_group].id + ", \"text\":\"" + GlobalVars.avl_unit_groups[next_group].nm + "\"";
                comma = ",";
                
                if (GlobalVars.avl_unit_groups[next_group].u.length !== 0)
                {
                    comma = "";
                    text_result += ", \"expanded\":true, \"children\":[";
                    
                    for (var next_item in GlobalVars.avl_unit_groups[next_group].u) {
                        
                     
                        text_result += comma + "{\"id\":" + i++ + ", \"leaf\":true" +
                                ", \"text\":\"" + Termo.Utilities.get_unit_name_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item]) + 
                                "\", \"HumidMax\":\"" + Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'HumidMax') + 
                                "\", \"HumidMin\":\"" + Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'HumidMin') + 
                                "\", \"TermoMax\":\"" + Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'TermoMax') + 
                                "\", \"TermoMin\":\"" + Termo.Utilities.get_unit_fld_value_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item], 'TermoMin') + 
                                "\", \"Unit_id\":\"" + GlobalVars.avl_unit_groups[next_group].u[next_item] + 
                                "\", \"icon\":\"" + Termo.Utilities.get_unit_icon_by_id (GlobalVars.avl_unit_groups[next_group].u[next_item]) + "?b=16&v=1" + 
                                "\"}";    
                        comma = ",";
                    }
                    
                    text_result += "]}";
                }
            }
            
            
            if (i !== 0)
            {
                var unite_wo_store = Termo.Utilities.get_units_without_store (i);
                if (unite_wo_store !== "{}")
                    text_result += "," + Termo.Utilities.get_units_without_store (i) + "]}";
                else
                    text_result += "]}";
                    
            }

            else
                text_result +=  Termo.Utilities.get_units_without_store (i) + "]}";
            
            json_result = JSON.parse(text_result);*/
//            console.log(json_result);
            /*var x = {
                        "text":"Имя",
                        "expanded": true,
                        "children": [
                            { "id": 1, "text": "Phil", "leaf": true },
                            { "id": 2, "text": "Nico", "expanded": true, "children": [
                                { "id": 3, "text": "Mitchell", "leaf": true }
                            ]},
                            { "id": 4, "text": "Sue", "loaded": true }
                        ]
                    };*/
            
                 
            

            
        },
        
        exec_report_tracing: function (unit_id_, period_type)
        {
            //Termo.Utilities.clear_all_chart_stories ();
            
            var interval = "";
            
            var d = new Date();
            var time_offset = d.getTimezoneOffset()/60;
            
            switch (period_type)
            {
                case 1:
                    
                    GlobalVars.current_start_date = Math.floor(Date.now() / 1000) + time_offset - 86400;
                    GlobalVars.current_finish_date = Math.floor(Date.now() / 1000) + time_offset;
                    
                    interval = '"flags":"0","from":"' + GlobalVars.current_start_date + '","to":"' + GlobalVars.current_finish_date + '"';
                    
                    Termo.Utilities.set_load_mask_for_charts ();
                    
                    
                    if (GlobalVars.eid !== "")
                        Ext.data.JsonP.request(
                        {
                            url: GlobalVars.url_setting + 'php/exec_tracing_report.php',
                            params:
                            {
                                eid: GlobalVars.eid,
                                resource_id: GlobalVars.resource_id,
                                template_id: GlobalVars.template_id,
                                unit_id: unit_id_,
                                interval: interval,
                                format: 'json'
                            },
                            callbackKey: 'callback',
                            async: false,
                            success: function (result)
                            {
                                if (!result.error)
                                {
                                    if (!result[2].error)
                                        Termo.Utilities.load_data_to_chart_store (result[2]);
                                    else
                                    {
                                        Termo.Utilities.disable_buttons(true);
                                        Termo.Utilities.clear_all_chart_stories();
                                    }
                                        
                                }
                                else
                                {
                                    Termo.Utilities.disable_buttons(true);
                                    Termo.Utilities.clear_all_chart_stories();
                                }
                                    
                                    
                            }
                        });
                    break;
                case 2:
                    
                    GlobalVars.current_start_date = Math.floor(Date.now() / 1000) + time_offset - 172800;
                    GlobalVars.current_finish_date = Math.floor(Date.now() / 1000) + time_offset;
                    
                    interval = '"flags":"0","from":"' + GlobalVars.current_start_date + '","to":"' + GlobalVars.current_finish_date + '"';
                    
                    
                    Termo.Utilities.set_load_mask_for_charts ();
                    
                    
                    if (GlobalVars.eid !== "")
                        Ext.data.JsonP.request(
                        {
                            url: GlobalVars.url_setting + 'php/exec_tracing_report.php',
                            params:
                            {
                                eid: GlobalVars.eid,
                                resource_id: GlobalVars.resource_id,
                                template_id: GlobalVars.template_id,
                                unit_id: unit_id_,
                                interval: interval,
                                format: 'json'
                            },
                            callbackKey: 'callback',
                            async: false,
                            success: function (result)
                            {
                                if (!result.error)
                                {
                                    if (!result[2].error)
                                        Termo.Utilities.load_data_to_chart_store (result[2]);
                                    else
                                    {
                                        Termo.Utilities.disable_buttons(true);
                                        Termo.Utilities.clear_all_chart_stories();
                                    }
                                        
                                }
                                else
                                {
                                    Termo.Utilities.disable_buttons(true);
                                    Termo.Utilities.clear_all_chart_stories();
                                }
                                
                            }
                        });
                    break;
                case 3:
                    
                    GlobalVars.current_start_date = Math.floor(Date.now() / 1000) + time_offset - 259200;
                    GlobalVars.current_finish_date = Math.floor(Date.now() / 1000) + time_offset;
                    
                    interval = '"flags":"0","from":"' + GlobalVars.current_start_date + '","to":"' + GlobalVars.current_finish_date + '"';
                    
                    
                    Termo.Utilities.set_load_mask_for_charts ();
                    
                    
                    if (GlobalVars.eid !== "")
                        Ext.data.JsonP.request(
                        {
                            url: GlobalVars.url_setting + 'php/exec_tracing_report.php',
                            params:
                            {
                                eid: GlobalVars.eid,
                                resource_id: GlobalVars.resource_id,
                                template_id: GlobalVars.template_id,
                                unit_id: unit_id_,
                                interval: interval,
                                format: 'json'
                            },
                            callbackKey: 'callback',
                            async: false,
                            success: function (result)
                            {
                                if (!result.error)
                                {
                                    if (!result[2].error)
                                        Termo.Utilities.load_data_to_chart_store (result[2]);
                                    else
                                    {
                                        Termo.Utilities.disable_buttons(true);
                                        Termo.Utilities.clear_all_chart_stories();
                                    }
                                        
                                }
                                else
                                {
                                    Termo.Utilities.disable_buttons(true);
                                    Termo.Utilities.clear_all_chart_stories();
                                }
                            }
                        });
                    break;
                default:
                    
                    
                    if (GlobalVars.current_finish_date === GlobalVars.current_start_date)
                        interval = '"flags":"0","from":"' + GlobalVars.current_start_date + '","to":"' + GlobalVars.current_finish_date + (60 * GlobalVars.interval_of_tracing*2) + '"';
                    else
                        interval = '"flags":"0","from":"' + GlobalVars.current_start_date + '","to":"' + GlobalVars.current_finish_date + '"';
                    
                    
                    Termo.Utilities.set_load_mask_for_charts ();
                    
                    
                    if (GlobalVars.eid !== "")
                        Ext.data.JsonP.request(
                        {
                            url: GlobalVars.url_setting + 'php/exec_tracing_report.php',
                            params:
                            {
                                eid: GlobalVars.eid,
                                resource_id: GlobalVars.resource_id,
                                template_id: GlobalVars.template_id,
                                unit_id: unit_id_,
                                interval: interval,
                                format: 'json'
                            },
                            callbackKey: 'callback',
                            async: false,
                            success: function (result)
                            {
                                if (!result.error)
                                {
                                    if (!result[2].error)
                                        Termo.Utilities.load_data_to_chart_store (result[2]);
                                    else
                                    {
                                        Termo.Utilities.disable_buttons(true);
                                        Termo.Utilities.clear_all_chart_stories();
                                    }
                                        
                                }
                                else
                                {
                                    Termo.Utilities.disable_buttons(true);
                                    Termo.Utilities.clear_all_chart_stories();
                                }
                            }
                        });
                    break;
                    
            }
            
            GlobalVars.current_interval = interval;
        },
        
        create_temperature_chart_data: function (TermoMin, TermoMax, Report_data)
        {
            var data = [];
            var date = new Date();
            var i = 0;
            
            for (var next_data in Report_data)
            {
                
                if (Math.abs(Report_data[next_data].c['2']) > 1000)
                    continue;
                
                
                date.setTime(Date.parse(Report_data[next_data].c['0']));
                
                data[data.length] = {temperature_min: parseFloat(TermoMin), temperature_max: parseFloat(TermoMax), temperature_data: parseFloat(Report_data[next_data].c['2']),  humid_data: Report_data[next_data].c['1'], date:date.toString(), x:1000};
                                
            }
            
            return data;
            
        },

        create_humid_chart_data: function (HumidMin, HumidMax, Report_data)
        {
            var data = [];
            var date = new Date();
            
            
            for (var next_data in Report_data)
            {
                if (Math.abs(Report_data[next_data].c['2']) > 100000)
                    continue;
                
                date.setTime(Date.parse(Report_data[next_data].c['0']));
                
                data[data.length] = {humid_min: HumidMin, humid_max: HumidMax, humid_data: Report_data[next_data].c['1'],  temperature_data: Report_data[next_data].c['2'], date:date.toString(), x: 1000};
                
            }
            
            return data;
            
        },
        
        
        isValidDate: function (value) {
            if (value === null)
                return false;
            
            return value.constructor.toString().indexOf("Date") > -1;
        },
        
        load_data_to_chart_store: function (Report_data)
        {
            var chart_temperature_data = Termo.Utilities.create_temperature_chart_data (GlobalVars.current_termo_min, GlobalVars.current_termo_max, Report_data);
            var chart_temperature_store = Ext.getCmp('id_temperature_chart').getStore();
            chart_temperature_store.loadData(chart_temperature_data);
            
            
            var chart_humid_data = Termo.Utilities.create_humid_chart_data (GlobalVars.current_humid_min, GlobalVars.current_humid_max, Report_data);
            var chart_humid_store = Ext.getCmp('id_humid_chart').getStore();
            chart_humid_store.loadData(chart_humid_data);
            
            Termo.Utilities.disable_buttons(false);
            Termo.Utilities.set_axis_title (false);
            
            
        },
        
        set_load_mask_for_charts: function ()
        {
            
            var temperature_chart = Ext.getCmp('id_temperature_chart');
            var humid_chart = Ext.getCmp('id_humid_chart');
            
            temperature_chart.setLoading('Загрузка...');
            humid_chart.setLoading('Загрузка...');
        },
        
        clear_all_chart_stories: function ()
        {
            Termo.Utilities.set_axis_title (false);
            
            var temperature_panel_store = Ext.getCmp('id_temperature_chart').getStore();
            var humid_panel_store = Ext.getCmp('id_humid_chart').getStore();
            
            
            temperature_panel_store.removeAll();
            humid_panel_store.removeAll();
            
            
        },
        disable_buttons: function (value)
        {
            var btn_export_png_termo = Ext.getCmp('id_export_png_temp_btn');
            var btn_export_exl_termo = Ext.getCmp('id_export_ex_temp_btn');
            var btn_export_png_humid = Ext.getCmp('id_export_png_humid_btn');
            var btn_export_exl_humid = Ext.getCmp('id_export_ex_humid_btn');
            
            btn_export_png_termo.setDisabled (value);
            btn_export_exl_termo.setDisabled (value);
            btn_export_png_humid.setDisabled (value);
            btn_export_exl_humid.setDisabled (value);            

        },
        
        export_to_excel: function (type)
        {
            var result_url = GlobalVars.url_setting + 'php/get_report_to_excel.php?eid=' + GlobalVars.eid + '&resource_id=' + GlobalVars.resource_id + '&template_id=' + GlobalVars.template_id + '&unit_id=' + GlobalVars.current_unit_id + '&interval=' + GlobalVars.current_interval + '&type=' + type;	
            var elemIF = document.createElement("iframe");
		
            elemIF.src = result_url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);

        },
        set_title_params: function (HumidMax, HumidMin, TermoMax, TermoMin)
        {
            var humid_panel = Ext.getCmp('id_panel_moisture');
            var temperature_panel = Ext.getCmp('id_panel_termo');
            
            humid_panel.setTitle ("Установленная норма влажности: от " + HumidMin + "% до " + HumidMax + "%");
            temperature_panel.setTitle ("Установленная норма температуры: от " + TermoMin + "°С до " + TermoMax + "°C");            
            
            
            
        },
        set_title_no_params: function ()
        {
            var humid_panel = Ext.getCmp('id_panel_moisture');
            var temperature_panel = Ext.getCmp('id_panel_termo');
            
            humid_panel.setTitle ("Влажность");
            temperature_panel.setTitle ("Температура");  
            
            
        },
        set_axis_title: function (set_clear)
        {
            var humid_chart = Ext.getCmp('id_humid_chart');
            var termo_chart = Ext.getCmp('id_temperature_chart');
            var ba_humid = humid_chart.axes.get('bottom');
            var ba_termo = termo_chart.axes.get('bottom');

            if (ba_humid.labels.length === 0)
            {
            Ext.getCmp('id_humid_chart').getStore().loadData(
            [{date:"01.01.2001 21:00:00",
            humid_data:"0",
            humid_max:"0",
            humid_min:"0",
            temperature_data:"0",
             x:1000},
            {date:"01.01.2001 21:00:01",
            humid_data:"0",
            humid_max:"0",
            humid_min:"0",
            temperature_data:"0",
             x:1000}]);
            
            Ext.getCmp('id_temperature_chart').getStore().loadData(
            [{date:"01.01.2001 21:00:00",
            humid_data:"0",
            humid_max:"0",
            humid_min:"0",
            temperature_data:"0",
             x:1000},
            {date:"01.01.2001 21:00:01",
            humid_data:"0",
            humid_max:"0",
            humid_min:"0",
            temperature_data:"0",
             x:1000}]);
            }

            
            
            if (set_clear)
            {

                ba_humid.setTitle("Время");
                ba_termo.setTitle("Время");
            }    
            else
            {
                var ds = new Date (GlobalVars.current_start_date * 1000);
                var df = new Date (GlobalVars.current_finish_date * 1000);
            


                ba_humid.setTitle(Termo.Utilities.get_unit_name_by_id (GlobalVars.current_unit_id) + " за период: " + ds.toLocaleFormat2('%d.%m.%y %H:%M') + " - " + df.toLocaleFormat2('%d.%m.%y %H:%M'));
                ba_termo.setTitle(Termo.Utilities.get_unit_name_by_id (GlobalVars.current_unit_id) + " за период: " + ds.toLocaleFormat2('%d.%m.%y %H:%M') + " - " + df.toLocaleFormat2('%d.%m.%y %H:%M'));
            }
            
            
        },
       
        set_user_lbl: function (UserName)
        {
            var user_lbl = Ext.getCmp('id_user_lbl');
            user_lbl.setValue ("Текущий пользователь: " + UserName);
            
            var user_lbl_1 = Ext.getCmp('id_user_lbl_1');
            user_lbl_1.setValue ("Выгрузка:");

            var user_lbl_2 = Ext.getCmp('id_user_lbl_2');
            user_lbl_2.setValue ("Выгрузка:");
            
            
        },
        save_temperature_chart: function ()
        {
            var temperature_chart = Ext.getCmp('id_temperature_chart');
            
            temperature_chart.save({
                 type: 'image/png'
            });


        },
        save_humid_chart: function ()
        {
            var humid_chart = Ext.getCmp('id_humid_chart');
            

            humid_chart.save({
                 type: 'image/png'
            });

        },
        start_tasks: function ()
        {
            var runner = new Ext.util.TaskRunner(),
                clock, updateClock, task;
            
            clock = Ext.getBody().appendChild({
                id: 'clock'
            });
            
            // Start a simple clock task that updates a div once per second
            updateClock = function() {
                if (GlobalVars.eid !== "")
                Ext.data.JsonP.request(
                    {
                        url: GlobalVars.url_setting + 'php/avl_events.php',
                        params:
                        {
                            format: 'json',
                            eid: GlobalVars.eid
                        },
                        callbackKey: 'callback',
                        async: false,
                        success: function (result)
                        {
                            //console.log('tick');
                        }
                    });
            };
            
            task = runner.start({
                run: updateClock,
                interval: 15000
            });
 
        },
        task_chart_reload: function ()
        {
            
            updateClock = function() {
                if (GlobalVars.current_period_type !== 4 && GlobalVars.current_unit_id)
                {
                    Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
                }
            };
            
            var task = {
                    run: updateClock,
                    fireOnStart: false,
                     interval: GlobalVars.interval_of_tracing*50*1000 + 10000
                
            };
            
            GlobalVars.current_task = task;
            
            Ext.TaskManager.start(task);
 
        },
        runner_stop: function ()
        {
            if (GlobalVars.current_task)
                Ext.TaskManager.stop (GlobalVars.current_task);
        }
        
    }
});


