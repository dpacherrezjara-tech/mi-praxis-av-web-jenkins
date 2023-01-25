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
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsTaxOnComiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailsTaxOnComiController',
    TaxOnComi: {},
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
        this.TaxOnComi.VP_CIA = rec.data.A1672CCUST;
        this.TaxOnComi.VP_FRMSRIE = rec.data.A1672FORMA + "" + rec.data.A1672SERIE;
        this.TaxOnComi.VP_SEQ = rec.data.A1672SEQ;
        this.TaxOnComi.VP_CUPON = rec.data.A1672CUPON;
        this.TaxOnComi.VP_TRNCU = rec.data.A1672TRNCU;
        Ext.getCmp(prototype.id4 + '-griddata').getStore().removeAll();
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id4 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/searchLstTaxOnComi',
            params: {beanString: JSON.stringify(this.TaxOnComi)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.id4 + '-griddata').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id4 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id4 + '-griddata');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id4 + '-store-grid01'
        });

        grid01.setStore(store01);
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



