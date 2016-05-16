/*
 * File: app/model/model_temperature.js
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

Ext.define('Termo.model.model_temperature', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'date',
            type: 'string'
        },
        {
            name: 'temperature_min',
            type: 'float'
        },
        {
            name: 'temperature_max',
            type: 'float'
        },
        {
            name: 'temperature_data',
            type: 'float'
        },
        {
            name: 'humid_data',
            type: 'float'
        },
        {
            name: 'x',
            type: 'float'
        }
    ]
});