/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesGroupManagement.SalesGroupManagementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesGroupManagementController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'SalesGroupManagementForm';
        prototype.url = CONTEXTPATH + '/SalesGroupManagement';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#SalesGroupManagementForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#SalesGroupManagementForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesGroupManagementForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesGroupManagementForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesGroupManagementForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesGroupManagementForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesGroupManagementForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesGroupManagementForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesGroupManagementForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesGroupManagementForm-btn-pag-last': {
                click: this.pagLast
            },
            '#SalesGroupManagementForm-cboModulo': {
                change: this.onChangeModule
            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        Ext.getCmp(prototype.id + '-txtDateFrom').hide();
        Ext.getCmp(prototype.id + '-txtDateTo').hide();
        this.setStoreData();
       // this.btnSearch_click();

    },
    setStoreData: function() {
        var cboModulo = Ext.getCmp(prototype.id + '-cboModulo');
        var cboEstado = Ext.getCmp(prototype.id + '-cboEstado');

        cboModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "(Select)"],
                ["PFLOWN", "Flown Accounting"],
                ["PPFLOWN", "Flown Accounting Pending"]
            ]}));
        cboModulo.setValue("");

        cboEstado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "Completed"],
                ["N", "New"],
                ["P", "In Process"],
                ["E", "In Error"]
            ]}));
        cboEstado.setValue("");
    },
    onChangeModule: function() {
        var opt = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        if (opt === '') {
            Ext.getCmp(prototype.id + '-txtDateFrom').hide();
            Ext.getCmp(prototype.id + '-txtDateTo').hide();
        } else {
            Ext.getCmp(prototype.id + '-txtDateFrom').show();
            Ext.getCmp(prototype.id + '-txtDateTo').show();
        }

    },
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_MODULO = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        var A1955STATU = Ext.getCmp(prototype.id + '-cboEstado').getValue();
        var IN_FINI = Ext.getCmp(prototype.id + '-txtDateFrom').getValue();
        var IN_FFIN = Ext.getCmp(prototype.id + '-txtDateTo').getValue();
        var IN_FECHA_PROCESO = '';
        var IN_FECHA_ACUSE = '';
        IN_FFIN = Ext.util.Format.date(IN_FFIN, 'Ymd');
        IN_FINI = Ext.util.Format.date(IN_FINI, 'Ymd');

        switch (IN_MODULO) {
            case 'PSALES':
            case 'PADJMA':
            case 'PFLOWN':
            case 'PPFLOWN':
                IN_FECHA_PROCESO = IN_FINI;
                IN_FECHA_ACUSE = IN_FFIN;
                break;

        }


        searchParams = {
            IN_MODULO: IN_MODULO,
            A1955STATU: A1955STATU,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            IN_FECHA_ACUSE: IN_FECHA_ACUSE
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_MODULO : " + searchParams.IN_MODULO);
        console.log("A1955STATU : " + searchParams.A1955STATU);
        console.log("IN_FECHA_PROCESO : " + searchParams.IN_FECHA_PROCESO);
        console.log("IN_FECHA_ACUSE : " + searchParams.IN_FECHA_ACUSE);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesGroupManagement.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtDateTo').setValue('');
        Ext.getCmp(prototype.id + '-cboModulo').setValue('');
        Ext.getCmp(prototype.id + '-cboEstado').setValue('');
    },
    btnExcel_click: function(obj, e) {
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
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_MODULO=' + searchParams.IN_MODULO
                + '&A1955STATU=' + searchParams.A1955STATU
                + '&IN_FECHA_PROCESO=' + searchParams.IN_FECHA_PROCESO
                + '&IN_FECHA_ACUSE=' + searchParams.IN_FECHA_ACUSE
                );
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    
     btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.SalesGroupManagementForm.DataEntry', {
            //id: prototype.id + '-dataEntry',
            id: 'DataEntrySalesGroupManagementForm',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});
