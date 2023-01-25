/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.ControlProcess.DataEntryControlProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ControlProcess',
    paramsDE: {},
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        console.log(p);
        var data = p.data;
        var searchParams = p.searchParams;

        paramsDE = {
            VP_FECHA: data.VL_DATE_PROC,
            VP_TIPO: searchParams.VP_TIPO,
            VP_A1530FUENT: searchParams.VP_A1530FUENT,
            VP_A1530PSVTA: searchParams.VP_A1530PSVTA,
            VP_INDICADOR: 5
        };

        console.log(paramsDE);
        this.setGridData();

    },
    setGridData: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/load_Detalle'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = paramsDE;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-de-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-de-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-de-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-de-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-de-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-de-paggin').bindStore(storeGridDatas);
    },
    onBtnSearch: function() {
        this.setGridData();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBtnClear: function() {


    },
    onBtnExcel: function(obj, e) {


        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });

    },
    exportExcel: function() {
     
        global.getFile(prototype.url + '/getDetailXLSX?VP_FECHA=' + paramsDE.VP_FECHA
                + '&VP_TIPO=' + paramsDE.VP_TIPO
                + '&VP_A1530FUENT=' + paramsDE.VP_A1530FUENT
                + '&VP_A1530PSVTA=' + paramsDE.VP_A1530PSVTA
                + '&VP_INDICADOR=' + paramsDE.VP_INDICADOR
                );
    },
    onBtnBack: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    },
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }

});


