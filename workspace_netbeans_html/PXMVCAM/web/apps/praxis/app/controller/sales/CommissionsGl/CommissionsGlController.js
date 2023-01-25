/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.CommissionsGl.CommissionsGlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CommissionsGlController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'CommissionsGlForm';
        prototype.url = CONTEXTPATH + '/CommissionsGl';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CommissionsGlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CommissionsGlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CommissionsGlForm-btnClear': {
                click: this.btnClear_click
            },
            '#CommissionsGlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CommissionsGlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CommissionsGlForm-btnBack': {
                click: this.btnBack_click
            },
            '#CommissionsGlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CommissionsGlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CommissionsGlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CommissionsGlForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#CommissionsGlForm-cmbDate': {
                change: this.onChangeModule
            },
            '#CommissionsGlForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#CommissionsGlForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDate').hide();
        Ext.getCmp(prototype.id + '-cmbDateFromYear').hide();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();
        this.setStoreData();
        this.showGridActual();
//        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Creation Date"],
                ["2", "Accounting Period"]
            ]
        }));
        cmbDate.setValue("");
    },
    onChangeModule: function(obj, value) {

        switch (value) {
            case '':
                Ext.getCmp(prototype.id + '-txtDate').hide();
                Ext.getCmp(prototype.id + '-cmbDateFromYear').hide();
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();

                break;
            case '1':
                Ext.getCmp(prototype.id + '-txtDate').show();
                Ext.getCmp(prototype.id + '-cmbDateFromYear').hide();
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtDate').hide();
                Ext.getCmp(prototype.id + '-cmbDateFromYear').show();
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').show();
                break;
        }

    },
    showGridActual: function() {
        this.hideAllGrid();
        switch (me.gridActual) {
            case  '-gridData':
                Ext.getCmp(prototype.id + '-pie').setWidth(1360);
                Ext.getCmp(prototype.id + '-footer').setWidth(1360);
                Ext.getCmp(prototype.id + '-panelDetail').hide();
                break;
            case '-gridDataDetail':
                Ext.getCmp(prototype.id + '-pie').setWidth(800);
                Ext.getCmp(prototype.id + '-footer').setWidth(800);
                Ext.getCmp(prototype.id + '-panelDetail').show();
                break;
            case '-gridDataDetail2':
                Ext.getCmp(prototype.id + '-pie').setWidth(800);/*680*/
                Ext.getCmp(prototype.id + '-footer').setWidth(800);/*680*/
                Ext.getCmp(prototype.id + '-panelDetail').show();
                break;
        }
        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        Ext.getCmp(prototype.id + '-gridData').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail2').hide();
    },
    btnSearch_click: function(obj, e) {
        var msj = this.validParams();
        if (msj === '') {
            this.setFormatParameter();
            me.drillDown = [];
            me.gridActual = '-gridData';
            this.showGridActual();
            this.setGridData(obj, e);
        } else {
            global.Msg({
                msg: msj
            });
        }
    },
    validParams: function() {
        var msj = '';
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        if (opt === '') {
            msj = 'Enter the required fields';
        } else if (opt === '1') {
            var date = Ext.getCmp(prototype.id + '-txtDate').getValue();
            date = Ext.util.Format.date(date, 'Ymd');
            if (date === '') {
                msj = 'Enter the required fields';
            }
        }
        return msj;
    },
    setFormatParameter: function() {
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var year = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var IN_A1879CCUST = '139';
        var IN_A1879FECHA = '';
        var IN_A1879PERIO = '';
        if (opt === '1') {
            IN_A1879FECHA = Ext.getCmp(prototype.id + '-txtDate').getValue();
            IN_A1879FECHA = Ext.util.Format.date(IN_A1879FECHA, 'Ymd');
        } else {
            IN_A1879PERIO = year + month;
        }

        searchParams = {
            IN_A1879CCUST: IN_A1879CCUST,
            IN_A1879FECHA: IN_A1879FECHA,
            IN_A1879PERIO: IN_A1879PERIO

        };

        console.log("IN_A1879CCUST : " + IN_A1879CCUST);
        console.log("IN_A1879FECHA : " + IN_A1879FECHA);
        console.log("IN_A1879PERIO : " + IN_A1879PERIO);
    },
    setGridData: function(obj, val) {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsGl.GridData', {
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
    setGridDataDetail: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsGl.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
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
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);

    },
    setGridDataDetail2: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsGl.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail2'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
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
        Ext.getCmp(prototype.id + '-gridDataDetail2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);

    },
    onSetGridDataDetail: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;

        Ext.getCmp(prototype.id + '-txt_description').setValue(data.A1879DESCR.trim().toUpperCase());/*setValue(data.A1879DESCR.toUpperCase());*/
        Ext.getCmp(prototype.id + '-txt_major').setValue('GAM_' + data.A1879MONED.toUpperCase());
        Ext.getCmp(prototype.id + '-txt_period').setValue(data.A1879PERIO.trim().toUpperCase());
        Ext.getCmp(prototype.id + '-txt_as_of_date').setValue(data.A1879FECHA);
        Ext.getCmp(prototype.id + '-txt_conv_date').setValue(data.A1879FCONV);
        Ext.getCmp(prototype.id + '-txt_currency').setValue(data.A1879MONED.trim().toUpperCase());
        Ext.getCmp(prototype.id + '-txt_conv_type').setValue(data.A1879TCONV.trim().toUpperCase());
        Ext.getCmp(prototype.id + '-txt_total_debit').setValue(Ext.util.Format.number(data.A1879CARGO, '0,000.00'));
        Ext.getCmp(prototype.id + '-txt_total_credit').setValue(Ext.util.Format.number(data.A1879ABONO, '0,000.00'));
        Ext.getCmp(prototype.id + '-txt_conv_TC').setValue(Ext.util.Format.number(data.A1879TCAMB, '0,000.00'));


        var IN_A1879CCUST = data.A1879CCUST;
        var IN_A1879FECHA = data.A1879FECHA.replace('/', '').replace('/', '');
        var IN_A1879PERIO = data.A1879PERIO;
        var IN_A1879LOTE = data.A1879LOTE;
        var IN_A1879MONED = data.A1879MONED.trim();


        me.paramsDetail = {
            IN_A1879CCUST: IN_A1879CCUST,
            IN_A1879FECHA: IN_A1879FECHA,
            IN_A1879PERIO: IN_A1879PERIO,
            IN_A1879LOTE: IN_A1879LOTE,
            IN_A1879MONED: IN_A1879MONED
        };
        this.setGridDataDetail();

    },
    onSetGridDataDetail2: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail2';
        this.showGridActual();
        var data = rowData.data;
        var strNroCta = data.A1879NCTA.split('-');
        var IN_A1878CCUST = data.A1879CCUST;
        var IN_A1878MONED = data.A1879MONED;
        var IN_A1878TITU = data.A1879TITU;
        var IN_A1878FPRO = data.A1879FECHA.replace('/', '').replace('/', '');
        var IN_A1878CIAF = strNroCta[0];
        var IN_A1878UNID = strNroCta[1];
        var IN_A1878CECO = strNroCta[2];
        var IN_A1878UBICA = strNroCta[3];
        var IN_A1878CUENT = strNroCta[4];
        var IN_A1878SUBCU = strNroCta[5];
        var IN_A1878EQUI = strNroCta[6];
        var IN_A1878ICIA = strNroCta[7];


        me.paramsDetail = {
            IN_A1878CCUST: IN_A1878CCUST,
            IN_A1878MONED: IN_A1878MONED,
            IN_A1878TITU: IN_A1878TITU,
            IN_A1878FPRO: IN_A1878FPRO,
            IN_A1878CIAF: IN_A1878CIAF,
            IN_A1878UNID: IN_A1878UNID,
            IN_A1878CECO: IN_A1878CECO,
            IN_A1878UBICA: IN_A1878UBICA,
            IN_A1878CUENT: IN_A1878CUENT,
            IN_A1878SUBCU: IN_A1878SUBCU,
            IN_A1878EQUI: IN_A1878EQUI,
            IN_A1878ICIA: IN_A1878ICIA
        };
        console.log(me.paramsDetail);
        this.setGridDataDetail2();

    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
            this.getPaggin();
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            var pagData = pag.getPageData();
            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
        } else {
            global.showMenu();
        }
    }
    , btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue("");
        Ext.getCmp(prototype.id + '-txtDate').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-txtDate').hide();
        Ext.getCmp(prototype.id + '-cmbDateFromYear').hide();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();
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

        switch (me.gridActual) {
            case  '-gridData':
                global.getFile(prototype.url + '/getXLSX?IN_A1879CCUST=' + me.searchParams.IN_A1879CCUST
                        + '&IN_A1879FECHA=' + me.searchParams.IN_A1879FECHA
                        + '&IN_A1879PERIO=' + me.searchParams.IN_A1879PERIO);
                break;

            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?IN_A1879CCUST=' + me.paramsDetail.IN_A1879CCUST
                        + '&IN_A1879FECHA=' + me.paramsDetail.IN_A1879FECHA
                        + '&IN_A1879PERIO=' + me.paramsDetail.IN_A1879PERIO
                        + '&IN_A1879LOTE=' + me.paramsDetail.IN_A1879LOTE
                        + '&IN_A1879MONED=' + me.paramsDetail.IN_A1879MONED
                        );
                break;
            case '-gridDataDetail2':
                global.getFile(prototype.url + '/getDetail2XLSX?IN_A1878CCUST=' + me.paramsDetail.IN_A1878CCUST
                        + '&IN_A1878MONED=' + me.paramsDetail.IN_A1878MONED
                        + '&IN_A1878TITU=' + me.paramsDetail.IN_A1878TITU
                        + '&IN_A1878FPRO=' + me.paramsDetail.IN_A1878FPRO
                        + '&IN_A1878CIAF=' + me.paramsDetail.IN_A1878CIAF
                        + '&IN_A1878UNID=' + me.paramsDetail.IN_A1878UNID
                        + '&IN_A1878CECO=' + me.paramsDetail.IN_A1878CECO
                        + '&IN_A1878UBICA=' + me.paramsDetail.IN_A1878UBICA
                        + '&IN_A1878CUENT=' + me.paramsDetail.IN_A1878CUENT
                        + '&IN_A1878SUBCU=' + me.paramsDetail.IN_A1878SUBCU
                        + '&IN_A1878EQUI=' + me.paramsDetail.IN_A1878EQUI
                        + '&IN_A1878ICIA=' + me.paramsDetail.IN_A1878ICIA
                        );
                break;
        }
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
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function() {
        switch (me.gridActual) {
            case  '-gridData':
                me.pagginActual = '-paggin';
                break;
            case '-gridDataDetail':
                me.pagginActual = '-paggin2';
                break;
            case '-gridDataDetail2':
                me.pagginActual = '-paggin3';
                break;
        }
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    }
});
