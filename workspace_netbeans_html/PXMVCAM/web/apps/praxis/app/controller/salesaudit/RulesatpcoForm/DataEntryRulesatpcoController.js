/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.RulesatpcoForm.DataEntryRulesatpcoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idDataEntryRules + '-DataEntryRulesatpcoController',
    url: CONTEXTPATH + '/RulesatpcoForm',
    params: '',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();



    },
    setStoresGrids: function () {
        var me = this;
        var grid00 = Ext.getCmp(prototype.idDataEntryRules + '-gridRules');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryRules + '-store-gridDataEntry',
            proxy: {
                type: 'ajax',
                url: me.url + '/loadRulesSearch/',
                timeout: 60000000,
                extraParams: {
                    VP_CATNO: me.view.params.CATNO
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.idbspdescarga + '-lbl-total').setText(records[0].data.total);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});
                    }
                }
            }
        });

        grid00.setStore(store00);
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    }


});


