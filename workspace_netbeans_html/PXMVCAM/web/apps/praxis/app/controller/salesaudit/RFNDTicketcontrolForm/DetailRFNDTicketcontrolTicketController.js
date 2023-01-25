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
Ext.define('Ext.Praxis.controller.salesaudit.RFNDTicketcontrolForm.DetailRFNDTicketcontrolTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailRFNDTicketcontrolTicketController',
    Bean: {},
    urlWin01: '',
    
    init: function (view) {
        var me = this;
        me.urlWin01 = Ext.String.trim(me.view.params.url01);
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
        Ext.getCmp(prototype.id1 + '-MemoNumber').setValue(rec.get('A3648FOLIO'));
        me.Bean.IN_TKT = rec.get('A3648TKT');
        me.Bean.IN_PREME = rec.get('A3648PREME');

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchListDocument',
            params: {beanString: JSON.stringify(this.Bean)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.id1 + '-gridTKT').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id1 + '-gridTKT');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
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




