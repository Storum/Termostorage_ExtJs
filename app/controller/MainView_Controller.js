/*
 * File: app/controller/MainView_Controller.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Termo.controller.MainView_Controller', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.data.JsonP',
        'Ext.window.MessageBox'
    ],

    id: 'id_main_view_cntr',
    views: [
        'MainView'
    ],

    onViewItemClick: function(dataview, record, item, index, e, eOpts) {




        if (record.get('TermoMin') === "")
        {
            Termo.Utilities.set_title_no_params();
            Termo.Utilities.clear_all_chart_stories();
            Termo.Utilities.disable_buttons(true);
            Termo.Utilities.set_axis_title (true);

            return;
        }
        else
            Termo.Utilities.disable_buttons(false);


        GlobalVars.current_termo_min = record.get('TermoMin');
        GlobalVars.current_termo_max = record.get('TermoMax');
        GlobalVars.current_humid_min = record.get('HumidMin');
        GlobalVars.current_humid_max = record.get('HumidMax');

        GlobalVars.current_unit_id = record.get('unit_id');


        if (GlobalVars.current_period_type == 4 /*&& Termo.Utilities.isValidDate(GlobalVars.current_start_date) && Termo.Utilities.isValidDate(GlobalVars.current_finish_date)*/)
            Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
        else if (GlobalVars.current_period_type !== 4)
            Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);

        Termo.Utilities.runner_stop();
        Termo.Utilities.task_chart_reload ();

        Termo.Utilities.set_title_params (GlobalVars.current_humid_max, GlobalVars.current_humid_min, GlobalVars.current_termo_max, GlobalVars.current_termo_min);

    },

    onRadiogroupChange: function(field, newValue, oldValue, eOpts) {


        GlobalVars.current_period_type = parseInt(newValue.x, 10);


        var period_panel = Ext.getCmp('id_period_panel');


        if (newValue.x == 4)
        {

            period_panel.setDisabled(false);
            var start_datefield = Ext.getCmp('id_datefield_start');
            var finish_datefield = Ext.getCmp('id_datefield_finish');
            start_datefield.reset();
            finish_datefield.reset();


            //if (GlobalVars.current_unit_id && Termo.Utilities.isValidDate(GlobalVars.current_start_date) && Termo.Utilities.isValidDate(GlobalVars.current_finish_date))
            //    Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
            //else
            //{
            //    Termo.Utilities.clear_all_chart_stories();
           // }
        }
        else
        {
            period_panel.setDisabled(true);
            if (GlobalVars.current_unit_id)
                Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
           // else
           //     Termo.Utilities.clear_all_chart_stories();
        }
    },

    onDatefieldChange_start: function(field, newValue, oldValue, eOpts) {


        var d = new Date();
        var time_offset = d.getTimezoneOffset()/60;


        var finish_datefield_value = Ext.getCmp('id_datefield_finish').getValue();

        if (!Termo.Utilities.isValidDate(newValue))
            return;



        if (GlobalVars.current_finish_date)
        {

            var finish_date = new Date(GlobalVars.current_finish_date*1000);

            if (newValue.getTime() > finish_date.getTime())
            {
                Ext.MessageBox.alert('Ошибка ввода', 'Дата окончания позже даты начала');
                Termo.Utilities.clear_all_chart_stories();


                var start_datefield = Ext.getCmp('id_datefield_start');
                var finish_datefield = Ext.getCmp('id_datefield_finish');
                start_datefield.reset();
                finish_datefield.reset();

        //        GlobalVars.current_finish_date = null;
        //        GlobalVars.current_start_date = null;
            }
            else
            {

                GlobalVars.current_start_date = Math.floor(newValue / 1000) + time_offset;




                if (GlobalVars.current_unit_id && finish_datefield_value)
                    Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);

            }
        }
        else
        {



            GlobalVars.current_start_date = Math.floor(newValue / 1000) + time_offset;

            if (GlobalVars.current_unit_id && finish_datefield_value)
            {
                console.log('start_');
                Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
            }


        }


    },

    onDatefieldChange_finish: function(field, newValue, oldValue, eOpts) {
        var d = new Date();
        var time_offset = d.getTimezoneOffset()/60;

        var start_datefield_value = Ext.getCmp('id_datefield_start').getValue();



        if (!Termo.Utilities.isValidDate(newValue))
            return;



        if (GlobalVars.current_start_date)
        {
            var start_date = new Date(GlobalVars.current_start_date*1000);

            if (newValue.getTime() < start_date.getTime())
            {
                Ext.MessageBox.alert('Ошибка ввода', 'Дата окончания позже даты начала');
                Termo.Utilities.clear_all_chart_stories();


                var finish_datefield = Ext.getCmp('id_datefield_finish');
                finish_datefield.reset();
            }
            else
            {
                GlobalVars.current_finish_date  = Math.floor(newValue / 1000) + time_offset;

                if (GlobalVars.current_unit_id && start_datefield_value)
                    Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
            }
        }
        else
        {
            GlobalVars.current_finish_date = Math.floor(newValue / 1000) + time_offset;

            if (GlobalVars.current_unit_id && start_datefield_value)
                    Termo.Utilities.exec_report_tracing (GlobalVars.current_unit_id, GlobalVars.current_period_type);
        }

    },

    onButtonClick_export_to_excel_temp: function(button, e, eOpts) {
        Termo.Utilities.export_to_excel(2);
    },

    onButtonClick_export_to_excel_humid: function(button, e, eOpts) {
        Termo.Utilities.export_to_excel(1);
    },

    onButtonClick_exit: function(button, e, eOpts) {
        //window.open(GlobalVars.url_setting, '_blank');
        window.location = GlobalVars.url_setting;


    },

    onButtonClick_save_term_png: function(button, e, eOpts) {
        Termo.Utilities.save_temperature_chart();
    },

    onButtonClick_save_humid_png: function(button, e, eOpts) {
        Termo.Utilities.save_humid_chart();
    },

    init: function(application) {
        this.control({
            "#id_tv_stories": {
                itemclick: this.onViewItemClick
            },
            "#id_radio_grp_period": {
                change: this.onRadiogroupChange
            },
            "#id_datefield_start": {
                change: this.onDatefieldChange_start
            },
            "#id_datefield_finish": {
                change: this.onDatefieldChange_finish
            },
            "#id_export_ex_temp_btn": {
                click: this.onButtonClick_export_to_excel_temp
            },
            "#id_export_ex_humid_btn": {
                click: this.onButtonClick_export_to_excel_humid
            },
            "#id_exit_btn": {
                click: this.onButtonClick_exit
            },
            "#id_export_png_temp_btn": {
                click: this.onButtonClick_save_term_png
            },
            "#id_export_png_humid_btn": {
                click: this.onButtonClick_save_humid_png
            }
        });
    }

});
