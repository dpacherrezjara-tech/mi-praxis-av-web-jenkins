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
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.FormUnicoSeguimietoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormUnicoSeguimietoController',
    BeanMoreProvi: {},
    BeanInitial: {},
    Botones: '',
    urlWin01:  CONTEXTPATH + '/ADMReport',
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
        me.BeanInitial = rec;       
        switch (String(this.view.params.action)) {
            case 'SNCAMBIO':
                Ext.getCmp(prototype.id4 + '-BtnLoad').hide();
                 me.BeanMoreProvi.A2553NMEMO = rec.A2548CNXPA;
                break;
            case 'CAMBIO':
                Ext.getCmp(prototype.id4 + '-BtnLoad').show();
                 me.BeanMoreProvi.A2553NMEMO = rec.A2548CNXPA;
                break;
            case 'CAMBIOS':
                Ext.getCmp(prototype.id4 + '-BtnLoad').show();
                 me.BeanMoreProvi.A2553NMEMO = rec.get('A2548CNXPA');
                break;
             case 'SMCAMBIO':
                Ext.getCmp(prototype.id4 + '-BtnLoad').hide();
                 me.BeanMoreProvi.A2553NMEMO = rec.get('A2548CNXPA');
                break;
        }
        me.SerechDatos();
    },
    SerechDatos: function () {
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id4 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadTracing/',
            params: {beanString: JSON.stringify(this.BeanMoreProvi)},
            success: function (response, options) {
                mask.hide();
                var res = Ext.decode(response.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.id4 + '-gridSeguimieto').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id4 + '-Disputa').setValue(data.A2553DESCR);
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp( prototype.id4 + \'-win\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id4 + '-gridSeguimieto');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        console.log(rec);
        alert('manteni');

    },
    onClickLoad: function () {
        var rec = this.BeanInitial === null || this.BeanInitial === undefined ? {} : this.BeanInitial;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimietoSubiArchivo({
            params: {
                rec: rec,
                action:String(this.view.params.action),
                url01: this.urlWin01
            }
        });
        win.show();
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id4 + '-gridSeguimieto');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id4 + '-store-grid01'
        });

        grid01.setStore(store01);
    }
});

