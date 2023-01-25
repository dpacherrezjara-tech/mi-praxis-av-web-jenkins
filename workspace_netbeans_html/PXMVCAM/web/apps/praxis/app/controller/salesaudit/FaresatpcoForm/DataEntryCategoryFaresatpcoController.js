/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.FaresatpcoForm.DataEntryCategoryFaresatpcoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idDataEntryCategoryFaresatpco + '-DataEntryCategoryFaresatpcoController',
    url: CONTEXTPATH + '/FaresatpcoForm',
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
        var grid00 = Ext.getCmp(prototype.idDataEntryCategoryFaresatpco + '-gridTableFoot');
        var grid01 = Ext.getCmp(prototype.idDataEntryCategoryFaresatpco + '-gridTableRule');
        var url = '';
        if (me.view.params.VP_type === 'Rules') {
            grid00.hide();
            grid01.show();
            var store01 = Ext.create('Ext.data.Store', {
                storeId: prototype.idDataEntryCategoryFaresatpco + '-store-gridDataEntry2',
                proxy: {
                    type: 'ajax',
                    url: me.url + '/loadTableRuleSearch/',
                    timeout: 60000000,
                    extraParams: {
                        VP_RECTY: me.view.params.VP_RECTY,
                        VP_ACTIO: me.view.params.VP_ACTIO,
                        VP_TARNO: me.view.params.VP_TARNO,
                        VP_CARRIER: me.view.params.VP_CARRIER,
                        VP_RULNO: me.view.params.VP_RULNO,
                        VP_CATNO: me.view.params.VP_CATNO,
                        VP_SEQNO: me.view.params.VP_SEQNO,
                        VP_FCLAS: me.view.params.VP_FCLAS,
                        VP_EFF: me.view.params.VP_EFF,
                        VP_FTNT: me.view.params.VP_FTNT
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

            grid01.setStore(store01);
        } else {
            grid00.show();
            grid01.hide();
            var store00 = Ext.create('Ext.data.Store', {
                storeId: prototype.idDataEntryCategoryFaresatpco + '-store-gridDataEntry',
                proxy: {
                    type: 'ajax',
                    url: me.url + '/loadTableFootSearch/',
                    timeout: 60000000,
                    extraParams: {
                        VP_RECTY: me.view.params.VP_RECTY,
                        VP_ACTIO: me.view.params.VP_ACTIO,
                        VP_TARNO: me.view.params.VP_TARNO,
                        VP_CARRIER: me.view.params.VP_CARRIER,
                        VP_RULNO: me.view.params.VP_RULNO,
                        VP_CATNO: me.view.params.VP_CATNO,
                        VP_SEQNO: me.view.params.VP_SEQNO,
                        VP_FCLAS: me.view.params.VP_FCLAS,
                        VP_EFF: me.view.params.VP_EFF,
                        VP_FTNT: me.view.params.VP_FTNT
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
        }
        ;

    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnRule: function (value, metaData, record, rowIndex, colIndex, store, view) {
        value = 'And';
        switch (String(record.get('A2393LOGIC'))) {
            case '=':
                value = 'Then';
                break;
            case ':':
                value = 'If';
                break;
            case '/':
                value = 'Or';
                break;
            case '*':
                value = 'Else';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnFoot: function (value, metaData, record, rowIndex, colIndex, store, view) {
        value = 'And';
        switch (String(record.get('A2468LOGIC'))) {
            case '=':
                value = 'Then';
                break;
            case ':':
                value = 'If';
                break;
            case '/':
                value = 'Or';
                break;
            case '*':
                value = 'Else';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onDetailRulesClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco({
            params: {
                CATNO: rec.get('A2393CATNO')
            }
        });
        win.show();
    },
    onDetailFootClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco({
            params: {
                CATNO: rec.get('A2468CATNO')
            }
        });
        win.show();
    }





});


