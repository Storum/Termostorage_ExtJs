/*
 * File: app/store/store_humid.js
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

Ext.define('Termo.store.store_humid', {
    extend: 'Ext.data.Store',

    requires: [
        'Termo.model.model_humid'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Termo.model.model_humid',
            storeId: 'store_humid',
            listeners: {
                datachanged: {
                    fn: me.onStoreDataChangeD,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onStoreDataChangeD: function(store, eOpts) {
        var chart = Ext.getCmp('id_humid_chart');

        if (chart)
            chart.setLoading(false);
    }

});