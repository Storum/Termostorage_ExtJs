Ext.define('GlobalVars',
{
	singleton: true,
    eid: "",
	avl_units: null,
    avl_unit_groups: null,
    report_template_name: 'Termostorage2',
    resource_id: null,
    template_id: null,
    interval_of_tracing: null,
    current_start_date: null,
    current_finish_date: null,
    current_interval: null,
    current_period_type: 1,
    current_unit_id: null,
    current_termo_min: null,
    current_termo_max: null,
    current_humid_min: null,
    current_humid_max: null,
    current_export_data: null,
    current_runner: null,
    current_task: null,
    
//	url_setting: 'http://termostorage.ru/'
	url_setting: 'http://localhost/xxx/'
    //token: 'f16039bab187c0ef5aaf68cb1f7278765649B313D817930E0238A7EC84AA6645CFA75E1'
});