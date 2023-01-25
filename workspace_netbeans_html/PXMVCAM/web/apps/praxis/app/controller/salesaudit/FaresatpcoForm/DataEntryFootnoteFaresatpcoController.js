/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.FaresatpcoForm.DataEntryFootnoteFaresatpcoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idDataEntryFootnoteFaresatpco + '-DataEntryFootnoteFaresatpcoController',
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
        var grid00 = Ext.getCmp(prototype.idDataEntryFootnoteFaresatpco + '-gridFareFoot');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryFootnoteFaresatpco + '-store-gridDataEntry',
            proxy: {
                type: 'ajax',
                url: me.url + '/loadFareFootSearch/',
                timeout: 60000000,
                extraParams: {
                    VP_TARNO: me.view.params.VP_TARNO,
                    VP_CXRCO: me.view.params.VP_CXRCO,
                    VP_FTNT: me.view.params.VP_FTNT,
                    VP_EFF: me.view.params.VP_EFF
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
    onCancelClick: function (btn) {
        this.view.close();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onFootnoteDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryCategoryFaresatpco({
            params: {
                VP_RECTY: Ext.String.trim(rec.get('A2468RECTY')),
                VP_ACTIO: Ext.String.trim(rec.get('A2468ACTIO')),
                VP_TARNO: Ext.String.trim(rec.get('A2468TARNO1')),
                VP_CARRIER: Ext.String.trim(rec.get('A2468CXRCO')),
                VP_FTNT: Ext.String.trim(rec.get('A2468FTNT')),
                VP_CATNO: Ext.String.trim(rec.get('A2468CATNO')),
                VP_SEQNO: Ext.String.trim(rec.get('A2468SEQNO')),
                VP_EFF: Ext.String.trim(rec.get('A2468EFF1')),
                VP_RULNO: '',
                VP_type: 'Footnote'

            }
        });
        win.show();
    }


});


