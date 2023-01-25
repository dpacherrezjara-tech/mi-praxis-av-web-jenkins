/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.DocumListAdmsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DocumListAdmsController',
    Bean: {},
    urlWin01: '',
    urlWin02: '',
    
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
        this.urlWin02 = Ext.String.trim(this.view.params.url02);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log(this.view.params)
        prototype.url3 = CONTEXTPATH + '/ADMReport';
        this.setStoresGrids();
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.id0 + '-MemoNumber').setValue(rec.get('A3537NUMCONX'));
        this.Bean.IN_OPTION = '1';
        this.Bean.IN_COUNTRY = '';
        this.Bean.IN_DOCUMET = rec.get('A3537NCONX');

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id0 + '-form'), {
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
                    Ext.getCmp(prototype.id0 + '-gridTKT').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id0 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id0 + '-gridTKT');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id0 + '-store-grid01'
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
    },
    onRendererColumnOnTicket: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id0 + \'-form\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id0 + '-gridTKT');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var win = new Ext.Praxis.view.screens.ScrFormUnico({
            params: {
                action: 'SNCAMBIO',
                rec: rec,
                url01: prototype.url3
            }
        });
        win.show();
    }
});



