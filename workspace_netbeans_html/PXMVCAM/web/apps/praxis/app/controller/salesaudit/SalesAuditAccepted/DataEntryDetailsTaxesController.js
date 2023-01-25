/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsTaxesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailsTaxesController',
    BeanTaxes: {},
    urlWin01:  CONTEXTPATH + '/SalesAuditAccepted',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log(this.view.params)

        this.setStoresGrids();
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        me.BeanTaxes.VP_CIA = rec.data.A1672CCUST;
        me.BeanTaxes.VP_FRMSRIE = rec.data.A1672FORMA + "" + rec.data.A1672SERIE;
        me.BeanTaxes.VP_SEQ = rec.data.A1672SEQ;
        me.BeanTaxes.VP_CUPON = rec.data.A1672CUPON;
        me.BeanTaxes.VP_TRNCU = rec.data.A1672TRNCU;
        Ext.getCmp(prototype.id2 + '-griddata1').getStore().removeAll();
        Ext.getCmp(prototype.id2 + '-griddata2').getStore().removeAll();

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: me.urlWin01 + '/searchLstTax',
            params: {beanString: JSON.stringify(me.BeanTaxes)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    if (rec.data.A1672TRNCU !== 'EXCH') {
                        Ext.getCmp(prototype.id2 + '-griddata1').show();
                        Ext.getCmp(prototype.id2 + '-griddata2').hide();
                        Ext.getCmp(prototype.id2 + '-griddata1').getStore().loadData(res.data);
                    } else {
                        Ext.getCmp(prototype.id2 + '-griddata1').hide();
                        Ext.getCmp(prototype.id2 + '-griddata2').show();
                        Ext.getCmp(prototype.id2 + '-griddata2').getStore().loadData(res.data);
                    }

                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp( prototype.id2 + '-griddata1');
        var grid02 = Ext.getCmp(prototype.id2 + '-griddata2');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid01'
        });

       var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid02'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCancelClick: function (btn) {
        this.view.close();
    }
});

