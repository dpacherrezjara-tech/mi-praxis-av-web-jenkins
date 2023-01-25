/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.OracleControlAcknowledgment.OracleControlAcknowledgmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleControlAcknowledgmentController',
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
        prototype.id = 'OracleControlAcknowledgmentForm';
        prototype.url = CONTEXTPATH + '/OracleControlAcknowledgment';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#OracleControlAcknowledgmentForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#OracleControlAcknowledgmentForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#OracleControlAcknowledgmentForm-btnClear': {
                click: this.btnClear_click
            },
            '#OracleControlAcknowledgmentForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#OracleControlAcknowledgmentForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#OracleControlAcknowledgmentForm-btnBack': {
                click: this.btnBack_click
            },
            '#OracleControlAcknowledgmentForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#OracleControlAcknowledgmentForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#OracleControlAcknowledgmentForm-btn-pag-next': {
                click: this.pagNext
            },
            '#OracleControlAcknowledgmentForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------     
            '#OracleControlAcknowledgmentForm-cboModulo': {
                change: this.onChangeModule
            },
            '#OracleControlAcknowledgmentForm-txtPais': {
                change: this.onUpperValue
            },
            '#OracleControlAcknowledgmentForm-txtCanal': {
                change: this.onUpperValue
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.showGridActual();
        //this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    showGridActual: function() {
        //this.hideAllGrid();
//        switch (me.gridActual) {
//            case  '-gridData':
//                Ext.getCmp(prototype.id + '-pie').show();
//                break;
//            case '-gridDataDetail':
//                Ext.getCmp(prototype.id + '-pie').hide();
//                break;
//        }

        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        Ext.getCmp(prototype.id + '-gridData').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
    },
    setStoreData: function() {
        var cboModulo = Ext.getCmp(prototype.id + '-cboModulo');
        cboModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["SALES", "Sales Accounting"],
                ["FLOWN", "Flown Accounting"],
                ["IXP", "Interline Accounting Payable"],
                ["IXC", "Interline Accounting Recceivable"],
                ["ADJFL", "Flown ADJ"],
                ["ADJCA", "Caducos ADJ"],
                ["CADUCOS", "Caducos"],
                ["ADM", "ADM"],
                ["FWNTNU", "Flown TNU"],
                ["IXPTNU", "IXP TNU"],
                ["FOB", "FOB"],
                ["CONSORTIA", "CONSORTIA"],
                ["IXPEST", "IXP Estimated"],
                ["IXCEST", "IXC Estimated"],
                ["IXPREV", "IXP REV Estimated"],
                ["IXCREV", "IXC REV Estimated"]
            ]
        }));
        cboModulo.setValue("");

        var cboAccion = Ext.getCmp(prototype.id + '-cboAccion');
        cboAccion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["Normal", "Normal / Reg"],
                ["Estimated", "Estimated"],
                ["Reverse", "Reverse"],
                ["AP/AR", "AP/AR"],
                ["Manual", "Manual Adj."]
            ]
        }));
        cboAccion.setValue("");

        var cboEstado = Ext.getCmp(prototype.id + '-cboEstado');
        cboEstado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "Procesable"],
                ["X", "No procesable"],
                ["Q", "En cola"],
                ["E", "Tiempo de respuesta expirado"],
            ]
        }));
        cboEstado.setValue("");

        Ext.getCmp(prototype.id + '-cboFuente').hide();
        Ext.getCmp(prototype.id + '-txtPais').hide();
        Ext.getCmp(prototype.id + '-txtCanal').hide();

    },
    onChangeModule: function(obj, value) {
        var txtPais = Ext.getCmp(prototype.id + '-txtPais');
        var txtCanal = Ext.getCmp(prototype.id + '-txtCanal');
        var cboFuente = Ext.getCmp(prototype.id + '-cboFuente');

        txtPais.setValue("");
        txtCanal.setValue("");
        cboFuente.setValue("");
        switch (value) {
            case 'SALES':

                txtPais.setFieldLabel("<b>Country</b>");
                txtPais.inputEl.dom.maxLength = 2;
                txtPais.inputEl.dom.enforceMaxLength = true;
                txtPais.setConfig("maskRe", /[a-zA-Z]/);
                txtPais.show();

                txtCanal.setFieldLabel("<b>Chanel</b>");
                txtCanal.inputEl.dom.maxLength = 3;
                txtCanal.inputEl.dom.enforceMaxLength = true;
                txtCanal.setConfig("maskRe", /[a-zA-Z]/);
                txtCanal.show();


                cboFuente.setFieldLabel("<b>Source</b>");
                cboFuente.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "(Select)"],
                        ["ARC", "ARC"],
                        ["BSP", "BSP"],
                        ["ASR", "ASR"],
                        ["MAN", "MAN"]
                    ]
                }));
                cboFuente.setValue("");
                cboFuente.show();

                break;

            case 'FLOWN':

                txtPais.setFieldLabel("<b>Carrier</b>");
                txtPais.inputEl.dom.maxLength = 2;
                txtPais.inputEl.dom.enforceMaxLength = true;
                txtPais.setConfig("maskRe", /[a-zA-Z]/);
                txtPais.show();

                txtCanal.hide();

                cboFuente.setFieldLabel("<b>Cliente</b>");
                cboFuente.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "(select)"],
                        ["139", "139"],
                        ["OAL", "OAL"]
                    ]
                }));
                cboFuente.setValue("");
                cboFuente.show();
                break;

            case 'IXP':

                txtPais.setFieldLabel("<b>Month</b>");
                txtPais.inputEl.dom.maxLength = 6;
                txtPais.inputEl.dom.enforceMaxLength = true;
                txtPais.setConfig("maskRe", /[0-9]/);
                txtPais.show();

                txtCanal.setFieldLabel("<b>Period</b>");
                txtCanal.inputEl.dom.maxLength = 2;
                txtCanal.inputEl.dom.enforceMaxLength = true;
                txtCanal.setConfig("maskRe", /[0-9]/);
                txtCanal.show();

                cboFuente.hide();
                break;

            case 'IXC':
                break;

            case 'ADJFL':
                break;

            case 'ADJCA' :
                break;

            case 'CADUCOS' :
                break;
        }
    },
    btnSearch_click: function(obj, e) {

        this.setFormatParameter();
        me.drillDown = [];
        me.gridActual = '-gridData';
        //this.showGridActual();
        var IN_MODULO = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        if (IN_MODULO === '') {
            global.Msg({
                msg: 'Please select module.'
            });
        } else {
            this.setGridData(obj, e);
        }




    },
    setFormatParameter: function() {

        var IN_MODULO = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        var IN_ENVIO = "";//app.trim(txtEnvio.text);
        var IN_FECHA_PROCESO = Ext.getCmp(prototype.id + '-txtDateFrom').getValue();
        var IN_FECHA_ACUSE = Ext.getCmp(prototype.id + '-txtDateTo').getValue();
        IN_FECHA_PROCESO = Ext.util.Format.date(IN_FECHA_PROCESO, 'Ymd');
        IN_FECHA_ACUSE = Ext.util.Format.date(IN_FECHA_ACUSE, 'Ymd');
        var A1955FUENT = Ext.getCmp(prototype.id + '-cboFuente').getValue();
        var A1955KEY2 = Ext.getCmp(prototype.id + '-txtPais').getValue();
        var A1955KEY3 = Ext.getCmp(prototype.id + '-txtCanal').getValue();
        var A1955STATU = Ext.getCmp(prototype.id + '-cboEstado').getValue();
        var A1955ACTIO = Ext.getCmp(prototype.id + '-cboAccion').getValue();

        searchParams = {
            IN_MODULO: IN_MODULO,
            IN_ENVIO: IN_ENVIO,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            IN_FECHA_ACUSE: IN_FECHA_ACUSE,
            A1955FUENT: A1955FUENT,
            A1955KEY2: A1955KEY2,
            A1955KEY3: A1955KEY3,
            A1955STATU: A1955STATU,
            A1955ACTIO: A1955ACTIO
        };
        console.log("IN_MODULO : " + IN_MODULO);
        console.log("IN_ENVIO : " + IN_ENVIO);
        console.log("IN_FECHA_PROCESO : " + IN_FECHA_PROCESO);
        console.log("IN_FECHA_ACUSE : " + IN_FECHA_ACUSE);
        console.log("A1955FUENT : " + A1955FUENT);
        console.log("A1955KEY2 : " + A1955KEY2);
        console.log("A1955KEY3 : " + A1955KEY3);
        console.log("A1955STATU : " + A1955STATU);
        console.log("A1955ACTIO : " + A1955ACTIO);

    },
    setGridData: function(obj, val) {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.OracleControlAcknowledgment.GridData', {
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

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsFOB.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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

    },
    onSetGridDataDetail: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;
        var A1880FFACT = data.A1880FFACT.replace('/', '').replace('/', '');

        me.paramsDetail = {
            IN_A1881CCUST: data.A1880CCUST,
            IN_A1881NFACT: data.A1880NFACT,
            IN_A1881FECHA: A1880FFACT
        };
        this.setGridDataDetail();

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
        var txtPais = Ext.getCmp(prototype.id + '-txtPais');
        var txtCanal = Ext.getCmp(prototype.id + '-txtCanal');
        var cboFuente = Ext.getCmp(prototype.id + '-cboFuente');
        var cboAccion = Ext.getCmp(prototype.id + '-cboAccion');
        var cboModulo = Ext.getCmp(prototype.id + '-cboModulo');
        var cboEstado = Ext.getCmp(prototype.id + '-cboEstado');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtDateTo');


        txtPais.setValue("");
        txtCanal.setValue("");
        cboFuente.setValue("");
        cboAccion.setValue("");
        cboModulo.setValue("");
        cboEstado.setValue("");
        txtDateFrom.setValue("");
        txtDateTo.setValue("");


        Ext.getCmp(prototype.id + '-cboFuente').hide();
        Ext.getCmp(prototype.id + '-txtPais').hide();
        Ext.getCmp(prototype.id + '-txtCanal').hide();
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
                global.getFile(prototype.url + '/getXLSX?IN_A1880CCUST=' + searchParams.IN_A1880CCUST
                        + '&IN_A1880FECHA=' + searchParams.IN_A1880FECHA);
                break;

            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?IN_A1881CCUST=' + me.paramsDetail.IN_A1881CCUST
                        + '&IN_A1881NFACT=' + me.paramsDetail.IN_A1881NFACT
                        + '&IN_A1881FECHA=' + me.paramsDetail.IN_A1881FECHA
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
    onEditClick: function (obj, metaData, rowNum, column, obj2, rowData) {
        //alert(rowData.data.A1955ENVIO);
                
        var params = {};
            console.log(rowData.data);
            
            params.bean = rowData.data;
            Ext.create('Ext.Praxis.view.sales.OracleControlAcknowledgmentForm.DataEntry', {
                id: 'DataEntry',
                params: params
            }).show();
            //Ext.getCmp(prototype.id+'-gridDataTkt').enable();
        
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
