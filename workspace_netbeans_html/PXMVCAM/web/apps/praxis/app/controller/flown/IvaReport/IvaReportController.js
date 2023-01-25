/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.IvaReport.IvaReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IvaReportController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        prototype.id = 'IvaReportForm';
        prototype.url = CONTEXTPATH + '/IvaReport';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#IvaReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#IvaReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#IvaReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#IvaReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#IvaReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#IvaReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#IvaReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#IvaReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#IvaReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#IvaReportForm-btn-pag-last': {
                click: this.pagLast
            },
            '#IvaReportForm-cboModulo': {
                change: this.onChangeModule
            }
        });
    },
    xpanel_afterrender: function (obj, e) {

//        Ext.getCmp(prototype.id + '-txtDateFrom').hide();
//        Ext.getCmp(prototype.id + '-txtDateTo').hide();
        this.setStoreData();
        // this.btnSearch_click();

    },
    setStoreData: function () {
        var cboModulo = Ext.getCmp(prototype.id + '-cboModulo');
        var cboCia = Ext.getCmp(prototype.id + '-cboCia');
        var cboCarr = Ext.getCmp(prototype.id + '-cboCarr');
        var cboStock = Ext.getCmp(prototype.id + '-cboStock');

        cboModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "(Select)"],
                ["PFLOWN", "Iva Report"]
            ]}));
        cboModulo.setValue("");

        cboCia.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["02", "02"],
                ["03", "03"]
            ]}
        ));
        cboCia.setValue("");

        cboCarr.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AM", "AM"],
                ["5D", "5D"]
            ]}));
        cboCarr.setValue("");

        cboStock.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["LI", "LI"],
                ["OA", "OA"]
            ]}));
        cboStock.setValue("");

    },
    onChangeModule: function () {
        var opt = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        if (opt === '') {
//            Ext.getCmp(prototype.id + '-txtDateFrom').hide();
//            Ext.getCmp(prototype.id + '-txtDateTo').hide();
            Ext.getCmp(prototype.id + '-cboCia').hide();
            Ext.getCmp(prototype.id + '-txtPFlight').hide();
            Ext.getCmp(prototype.id + '-cboCarr').hide();
            Ext.getCmp(prototype.id + '-cboStock').hide();
            Ext.getCmp(prototype.id + '-txtPeriodo').hide();
        } else {
//            Ext.getCmp(prototype.id + '-txtDateFrom').show();
//            Ext.getCmp(prototype.id + '-txtDateTo').show();
            Ext.getCmp(prototype.id + '-cboCia').show();
            Ext.getCmp(prototype.id + '-txtPFlight').show();
            Ext.getCmp(prototype.id + '-cboCarr').show();
            Ext.getCmp(prototype.id + '-cboStock').show();
            Ext.getCmp(prototype.id + '-txtPeriodo').show();
        }

    },
    btnSearch_click: function (obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function () {

        var IN_MODULO = Ext.getCmp(prototype.id + '-cboModulo').getValue();
//        var IN_TICKET = Ext.getCmp(prototype.id + '-txtTicket').getValue();
//        var IN_ORIGEN = Ext.getCmp(prototype.id + '-txtOrigen').getValue();
//        var IN_DESTINO = Ext.getCmp(prototype.id + '-txtDestino').getValue();
        
        var IN_CIA = Ext.getCmp(prototype.id + '-cboCia').getValue();
        var IN_PFLIGHT = Ext.getCmp(prototype.id + '-txtPFlight').getValue();
        var IN_CARR = Ext.getCmp(prototype.id + '-cboCarr').getValue();
        var IN_STOCK = Ext.getCmp(prototype.id + '-cboStock').getValue();
        var IN_PERIODO = Ext.getCmp(prototype.id + '-txtPeriodo').getValue();
        
        var IN_FECHA_PROCESO = '';
        var IN_FECHA_ACUSE = '';
        //       IN_FFIN = Ext.util.Format.date(IN_FFIN, 'Ymd');
        //       IN_FINI = Ext.util.Format.date(IN_FINI, 'Ymd');

        switch (IN_MODULO) {
            case 'PSALES':
            case 'PADJMA':
            case 'PFLOWN':
            case 'PPFLOWN':

                break;

        }


        searchParams = {
            IN_MODULO: IN_MODULO,
//            IN_TICKET: IN_TICKET,
//            IN_ORIGEN: IN_ORIGEN,
//            IN_DESTINO: IN_DESTINO,
            
            IN_CIA: IN_CIA,
            IN_PFLIGHT: IN_PFLIGHT,
            IN_CARR: IN_CARR,
            IN_STOCK: IN_STOCK,
            IN_PERIODO: IN_PERIODO
        };
        console.log("-------------Parametros enviados-----------");
        console.log(searchParams);
        console.log("-------------------------------------------");
    },
    setGridData: function (obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.IvaReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
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
    btnClear_click: function (obj, e) {
//        Ext.getCmp(prototype.id + '-txtDateFrom').setValue('');
//        Ext.getCmp(prototype.id + '-txtDateTo').setValue('');
        Ext.getCmp(prototype.id + '-cboCia').setValue();
        Ext.getCmp(prototype.id + '-txtPFlight').setValue();
        Ext.getCmp(prototype.id + '-cboCarr').setValue();
        Ext.getCmp(prototype.id + '-cboStock').setValue();
        Ext.getCmp(prototype.id + '-txtPeriodo').setValue();
        
        Ext.getCmp(prototype.id + '-cboModulo').setValue('');
//        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
//        Ext.getCmp(prototype.id + '-txtOrigen').setValue('');
//        Ext.getCmp(prototype.id + '-txtDestino').setValue('');
//        Ext.getCmp(prototype.id + '-cboEstado').setValue('');
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_MODULO=' + searchParams.IN_MODULO
                + '&IN_CIA=' + searchParams.IN_CIA
                + '&IN_PFLIGHT=' + searchParams.IN_PFLIGHT
                + '&IN_CARR=' + searchParams.IN_CARR
                + '&IN_STOCK=' + searchParams.IN_STOCK
                + '&IN_PERIODO=' + searchParams.IN_PERIODO
                );
    }
    ,
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },

    btnAdd_click: function (obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function (action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.flown.IvaReportForm.DataEntry', {
            //id: prototype.id + '-dataEntry',
            id: 'DataEntryIvaReportForm',
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
    pagFirst: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});
