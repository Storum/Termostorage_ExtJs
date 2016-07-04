/*
 * File: app/view/MainView.js
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

Ext.define('Termo.view.MainView', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.chart.Chart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.series.Area'
    ],

    id: 'id_main_view',
    itemId: 'mainView',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    flex: 1,
                    id: 'id_tr_panel_stories',
                    title: 'Склады',
                    store: 'tree_store_objects',
                    viewConfig: {
                        id: 'id_tv_stories',
                        loadingText: 'Загрузка...'
                    }
                },
                {
                    xtype: 'panel',
                    flex: 3,
                    id: 'id_panel_charts',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    dockedItems: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            dock: 'top',
                            height: 44,
                            id: 'id_panel_buttons',
                            title: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            dockedItems: [
                                {
                                    xtype: 'radiogroup',
                                    dock: 'left',
                                    height: 33,
                                    id: 'id_radio_grp_period',
                                    width: 349,
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            id: 'id_day_check',
                                            name: 'x',
                                            boxLabel: '1 День',
                                            checked: true,
                                            inputValue: '1'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'id_week_check',
                                            name: 'x',
                                            boxLabel: '2 Дня',
                                            inputValue: '2'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'id_month_check',
                                            fieldLabel: '',
                                            name: 'x',
                                            boxLabel: '3 Дня',
                                            inputValue: '3'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'id_custome_check',
                                            fieldLabel: '',
                                            name: 'x',
                                            boxLabel: 'Период:',
                                            inputValue: '4'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    dock: 'left',
                                    disabled: true,
                                    height: 89,
                                    id: 'id_period_panel',
                                    width: 264,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'datefield',
                                            dock: 'top',
                                            id: 'id_datefield_start',
                                            fieldLabel: 'Начало:',
                                            labelWidth: 50,
                                            invalidText: 'Неверное значение',
                                            format: 'd.m.Y H:i:s'
                                        },
                                        {
                                            xtype: 'datefield',
                                            dock: 'top',
                                            id: 'id_datefield_finish',
                                            fieldLabel: 'Конец:',
                                            labelWidth: 50,
                                            invalidText: 'Неверное значение',
                                            format: 'd.m.Y H:i:s'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    dock: 'right',
                                    id: 'id_exit_btn',
                                    width: 77,
                                    icon: 'resources//img//Exit.png',
                                    scale: 'large',
                                    text: 'Выйти'
                                }
                            ],
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'id_user_lbl',
                                    fieldBodyCls: 'align-top',
                                    fieldLabel: '',
                                    hideLabel: true,
                                    fieldCls: 'align-top'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'id_panel_termo',
                            autoScroll: true,
                            layout: 'fit',
                            title: 'Температура',
                            titleAlign: 'right',
                            dockedItems: [
                                {
                                    xtype: 'panel',
                                    dock: 'top',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            height: 30,
                                            id: 'id_export_png_temp_btn',
                                            width: 65,
                                            icon: 'resources//img//Png.png',
                                            scale: 'medium',
                                            text: 'PNG'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            height: 30,
                                            id: 'id_export_ex_temp_btn',
                                            width: 65,
                                            icon: 'resources//img//Excel.png',
                                            scale: 'medium',
                                            text: 'Excel'
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'displayfield',
                                            dock: 'left',
                                            id: 'id_user_lbl_1',
                                            fieldBodyCls: 'align-center ',
                                            fieldLabel: '',
                                            hideLabel: true,
                                            fieldCls: 'align-center '
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'chart',
                                    height: 250,
                                    id: 'id_temperature_chart',
                                    width: 400,
                                    animate: true,
                                    background: {
                                        fill: '#F6F6F3'
                                    },
                                    insetPadding: 20,
                                    store: 'store_temperature',
                                    axes: [
                                        {
                                            type: 'Numeric',
                                            fields: [
                                                'temperature_data',
                                                'temperature_min',
                                                'temperature_max'
                                            ],
                                            title: 'Температура',
                                            adjustMaximumByMajorUnit: true,
                                            adjustMinimumByMajorUnit: true,
                                            position: 'left'
                                        },
                                        {
                                            type: 'Numeric',
                                            fields: [
                                                'temperature_data'
                                            ],
                                            hidden: true,
                                            position: 'right',
                                            title: 'Температура_h',
                                            adjustMaximumByMajorUnit: true,
                                            adjustMinimumByMajorUnit: true,
                                            minimum: 0
                                        },
                                        {
                                            type: 'Category',
                                            fields: [
                                                'date'
                                            ],
                                            label: {
                                                renderer: function(v)
                                                {
                                                    if (v)
                                                    {
                                                        var date_obj = new Date();
                                                        date_obj.setTime (Date.parse(v));
                                                        
                                                        
                                                        return date_obj.toLocaleFormat('%H:%M');
                                                    }
                                                    else
                                                        return "";
                                                    
                                                },
                                                rotation: {
                                                    degrees: -45
                                                }
                                            },
                                            title: 'Время',
                                            position: 'bottom'
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'line',
                                            title: 'max_temperature',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'temperature_max',
                                            showMarkers: false,
                                            smooth: 3,
                                            style: {
                                                stroke: '#F02431',
                                                'stroke-width': 1,
                                                fill: '#F02431'
                                            }
                                        },
                                        {
                                            type: 'line',
                                            title: 'min_temperature',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'temperature_min',
                                            showMarkers: false,
                                            smooth: 3,
                                            style: {
                                                stroke: '#F02431',
                                                'stroke-width': 1,
                                                fill: '#F02431'
                                            }
                                        },
                                        {
                                            type: 'area',
                                            highlight: {
                                                fill: 'red',
                                                'stroke-width': 2,
                                                stroke: 'red'
                                            },
                                            tips: {
                                                trackMouse: true,
                                                width: 160,
                                                height: 70,
                                                renderer: function(storeItem, item)
                                                {
                                                   
                                                    
                                                    var date_obj = new Date();
                                                    date_obj.setTime (Date.parse(storeItem.get('date')));
                                                                                                
                                                    //console.log(storeItem.get('date'));
                                                    
                                                    var temperature_value = storeItem.get('temperature_data');
                                                    var humid_value = storeItem.get('humid_data');
                                                    
                                                    if (temperature_value > 1000)
                                                        temperature_value = "_";
                                                    
                                                    
                                                    if (humid_value > 1000)
                                                        humid_value = "_";
                                                    
                                                    
                                                    
                                                    this.setTitle('<br> Температура: ' + temperature_value + '°<br />' + 'Влажность: ' + humid_value + '<br />' +  date_obj.toLocaleFormat('%d.%m.%y %H:%M:%S'));
                                                }
                                            },
                                            axis: 'right',
                                            xField: 'date',
                                            yField: 'x',
                                            style: {
                                                fill: '#1DED49',
                                                stroke: '#1DED49',
                                                'stroke-width': 3,
                                                opacity: 0.0
                                            }
                                        },
                                        {
                                            type: 'line',
                                            renderer: function(sprite, record, attributes, index, store) {
                                                var r = store.getAt(index);

                                                if (r)
                                                {

                                                    var max_temperature = r.get('temperature_max');
                                                    var min_temperature = r.get('temperature_min');
                                                    var temperature = r.get('temperature_data');

                                                    if (max_temperature < temperature || min_temperature > temperature)
                                                    attributes.fill = '#A90F0F';
                                                    //       attributes.fill = '#1DED49';
                                                }



                                                return attributes;
                                            },
                                            title: 'Temperature',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'temperature_data',
                                            markerConfig: {
                                                type: 'circle'
                                            },
                                            smooth: 10,
                                            style: {
                                                //    fill: "#1DED49",
                                                //    stroke: "#1DED49",
                                                fill: '#C1C1BF',
                                                stroke: '#C1C1BF',
                                                'stroke-width': 3,
                                                opacity: 0.8
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'id_panel_moisture',
                            layout: 'fit',
                            title: 'Относительная влажность',
                            titleAlign: 'right',
                            dockedItems: [
                                {
                                    xtype: 'panel',
                                    dock: 'top',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            height: 30,
                                            id: 'id_export_png_humid_btn',
                                            width: 65,
                                            icon: 'resources//img//Png.png',
                                            scale: 'medium',
                                            text: 'PNG'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            height: 30,
                                            id: 'id_export_ex_humid_btn',
                                            width: 65,
                                            icon: 'resources//img//Excel.png',
                                            scale: 'medium',
                                            text: 'Excel'
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'displayfield',
                                            dock: 'left',
                                            id: 'id_user_lbl_2',
                                            fieldBodyCls: 'align-center ',
                                            fieldLabel: '',
                                            hideLabel: true,
                                            fieldCls: 'align-center '
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'chart',
                                    height: 250,
                                    id: 'id_humid_chart',
                                    width: 400,
                                    animate: true,
                                    background: {
                                        fill: '#F6F6F3'
                                    },
                                    insetPadding: 20,
                                    store: 'store_humid',
                                    axes: [
                                        {
                                            type: 'Numeric',
                                            fields: [
                                                'humid_data',
                                                'humid_min',
                                                'humid_max'
                                            ],
                                            minorTickSteps: 1,
                                            title: 'Влажность',
                                            adjustMaximumByMajorUnit: true,
                                            adjustMinimumByMajorUnit: true,
                                            position: 'left'
                                        },
                                        {
                                            type: 'Numeric',
                                            fields: [
                                                'humid_data'
                                            ],
                                            hidden: true,
                                            minorTickSteps: 1,
                                            position: 'right',
                                            title: 'Влажность_h',
                                            adjustMaximumByMajorUnit: true,
                                            adjustMinimumByMajorUnit: true
                                        },
                                        {
                                            type: 'Category',
                                            fields: [
                                                'date'
                                            ],
                                            label: {
                                                renderer: function(v)
                                                {
                                                    if (v)
                                                    {
                                                        var date_obj = new Date();
                                                        date_obj.setTime (Date.parse(v));
                                                        
                                                        
                                                        return date_obj.toLocaleFormat('%H:%M');
                                                    }
                                                    else
                                                        return "";
                                                    
                                                },
                                                rotation: {
                                                    degrees: -45
                                                }
                                            },
                                            title: 'Время',
                                            position: 'bottom'
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'line',
                                            title: 'max_humid',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'humid_max',
                                            showMarkers: false,
                                            smooth: 3,
                                            style: {
                                                stroke: '#F02431',
                                                'stroke-width': 1,
                                                fill: '#F02431'
                                            }
                                        },
                                        {
                                            type: 'line',
                                            title: 'min_humid',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'humid_min',
                                            showMarkers: false,
                                            smooth: 3,
                                            style: {
                                                stroke: '#F02431',
                                                'stroke-width': 1,
                                                fill: '#F02431'
                                            }
                                        },
                                        {
                                            type: 'area',
                                            highlight: {
                                                fill: 'red',
                                                'stroke-width': 2,
                                                stroke: 'red'
                                            },
                                            tips: {
                                                trackMouse: true,
                                                width: 160,
                                                height: 70,
                                                renderer: function(storeItem, item)
                                                {
                                                   
                                                    
                                                    var date_obj = new Date();
                                                    date_obj.setTime (Date.parse(storeItem.get('date')));
                                                                                                
                                                    //console.log(storeItem.get('date'));
                                                    
                                                    var temperature_value = storeItem.get('temperature_data');
                                                    var humid_value = storeItem.get('humid_data');
                                            
                                                    if (temperature_value > 1000)
                                                        temperature_value = "_";
                                                    
                                                    
                                                    if (humid_value > 1000)
                                                        humid_value = "_";
                                                    
                                                    
                                                        
                                                    this.setTitle('<br> Влажность: ' + humid_value + '<br />' + 'Температура: ' + temperature_value + '°<br />' +  date_obj.toLocaleFormat('%d.%m.%y %H:%M:%S'));
                                                    
                                            //        this.setTitle('<br>' + storeItem.get('humid_data') + '<br />' + date_obj.toLocaleFormat('%d.%m.%y %H:%M:%S'));
                                                }
                                            },
                                            axis: 'right',
                                            xField: 'date',
                                            yField: 'x',
                                            style: {
                                                fill: '#1DED49',
                                                stroke: '#1DED49',
                                                'stroke-width': 3,
                                                opacity: 0.0
                                            }
                                        },
                                        {
                                            type: 'line',
                                            renderer: function(sprite, record, attributes, index, store) {
                                                var r = store.getAt(index);

                                                if (r)
                                                {

                                                    var max_humid = r.get('humid_max');
                                                    var min_humid = r.get('humid_min');
                                                    var humid = r.get('humid_data');

                                                    if (max_humid < humid || min_humid > humid)
                                                    attributes.fill = '#A90F0F';
                                                }



                                                return attributes;
                                            },
                                            title: 'Humid',
                                            axis: 'left',
                                            xField: 'date',
                                            yField: 'humid_data',
                                            markerConfig: {
                                                type: 'circle'
                                            },
                                            smooth: 10,
                                            style: {
                                                fill: '#C1C1BF',
                                                stroke: '#C1C1BF',
                                                //fill: "#1DED49",
                                                //stroke: "#1DED49",
                                                'stroke-width': 3,
                                                opacity: 0.8
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});