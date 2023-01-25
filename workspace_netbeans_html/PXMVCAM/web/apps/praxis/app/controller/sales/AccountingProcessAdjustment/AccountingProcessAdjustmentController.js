/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingProcessAdjustment.AccountingProcessAdjustmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingProcessAdjustmentController',
    fecha: new Date(),
    nameText: '',
    nameText2: '',
    me: '',
    searchParams: {},
    init: function(view) {
        prototype.id = 'AccountingProcessAdjustmentForm';
        prototype.url = CONTEXTPATH + '/AccountingProcessAdjustment';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingProcessAdjustmentForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AccountingProcessAdjustmentForm-btnProccess': {
                click: this.btnProccess_click
            },
            '#AccountingProcessAdjustmentForm-btnDownloadFile': {
                click: this.onDowloadFile
            },
            '#AccountingProcessAdjustmentForm-btnDownloadFile2': {
                click: this.onDowloadFile2
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-panelBtn').hide();
        this.setStoreData(obj, e);
    },
    onChangeType: function(obj, value) {

    },
    onChangeZone: function(obj, value) {
        Ext.getCmp(prototype.id + '-panelBtn').show();
        var btnDownloadFile = Ext.getCmp(prototype.id + '-btnDownloadFile');
        var btnDownloadFile2 = Ext.getCmp(prototype.id + '-btnDownloadFile2');
        btnDownloadFile.show();
        btnDownloadFile2.hide();

        var date = Ext.util.Format.date(me.fecha, 'dmY');
        var time = Ext.util.Format.date(me.fecha, 'hms');
        me.nameTxt = date + time + 'BI_GL_ASR' + value + 'GSA.txt';
        btnDownloadFile.setText(me.nameTxt);
    },
    onDowloadFile: function() {
        var msj = this.validateDowload();
        if (msj.trim() === '') {

            var name = Ext.getCmp(prototype.id + '-btnDownloadFile').getText();
            var nameLote = '';

            if (strType === 'GSA') {
                nameLote = 'L27COMGL' + strZona;
            } else if (strType === 'FOB') {
                nameLote = 'L30COMFOB';
            }
            var params = {
                strType: strType,
                strZona: strZona,
                nameLote: nameLote,
                nameText: name
            };
            console.log(params);
            global.Msg({
                msg: "Data not Found"
            });

//            Ext.Ajax.request({
//                url: prototype.url + '/downloadText',
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
//                params: params,
//                success: function(response, options) {
//                    Ext.getCmp(prototype.id + '-centerC').unmask();
//                    var res = Ext.JSON.decode(response.responseText);
//                    var result = res.result;
//                    me.procesarResultado(result);
//                }
//            });
        } else {
            global.Msg({
                msg: msj
            });
        }
    },
    onDowloadFile2: function() {
        var msj = this.validateDowload();
        if (msj.trim() === '') {

            var name = Ext.getCmp(prototype.id + '-btnDownloadFile2').getText();
            var nameLote = '';

            var params = {
                strType: strType,
                strZona: strZona,
                nameLote: nameLote,
                nameText: name
            };
            console.log(params);
            global.Msg({
                msg: "Data not Found"
            });

//            Ext.Ajax.request({
//                url: prototype.url + '/downloadText',
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
//                params: params,
//                success: function(response, options) {
//                    Ext.getCmp(prototype.id + '-centerC').unmask();
//                    var res = Ext.JSON.decode(response.responseText);
//                    var result = res.result;
//                    me.procesarResultado(result);
//                }
//            });
        } else {
            global.Msg({
                msg: msj
            });
        }
    },
    setStoreData: function() {
    
    },
    validateParams: function() {

        var msj = '';
        return msj;
    },
    validateDowload: function() {

        var msj = '';
        if (zona === '') {
            msj = 'Selected Zone';
        }
        else if (type === '') {
            msj = 'Selected Type';
        }

        return msj;
    },
    btnProccess_click: function() {
        var msj = this.validateParams();
        if (msj.trim() === '') {

            this.setParams();
            Ext.Ajax.request({
                url: prototype.url + '/proccessComission',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
                params: searchParams,
                success: function(response, options) {
                    Ext.getCmp(prototype.id + '-centerC').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    var result = res.result;
                    me.procesarResultado(result);
                }
            });
        } else {
            global.Msg({
                msg: msj
            });
        }

    },
    procesarResultado: function(status) {
        console.log("Resultado : " + status);
        var msj = '';
        var date = Ext.util.Format.date(me.fecha, 'dmY');
        var mes = Ext.util.Format.date(me.fecha, 'm');
        var dia = Ext.util.Format.date(me.fecha, 'd');
        var time = Ext.util.Format.date(me.fecha, 'hms');
        var btnDownloadFile = Ext.getCmp(prototype.id + '-btnDownloadFile');
        var btnDownloadFile2 = Ext.getCmp(prototype.id + '-btnDownloadFile2');
        
        if (status === 'C') {
            if (type === 'GSA') {
                Ext.getCmp(prototype.id + '-panelBtn').hide();
            } else {
                me.nameTxt = 'E_PR_OPERADORA' + '_' + dia + global.getMonthAbrev(mes) + '_' + time + '.txt';
                me.nameTxt2 = 'D_PR_OPERADORA' + '_' + dia + global.getMonthAbrev(mes) + '_' + time + '.txt';
                btnDownloadFile.setText(me.nameTxt);
                btnDownloadFile2.setText(me.nameTxt2);
                Ext.getCmp(prototype.id + '-panelBtn').show();
                Ext.getCmp(prototype.id + '-btnDownloadFile').show();
                Ext.getCmp(prototype.id + '-btnDownloadFile2').show();
            }
            msj = 'Completed process, Download File.';
        } else if (status === 'I') {
            msj = 'There is already a process in execution.';
        } else {
            msj = 'Error in process.', 'PRAXIS';
        }
        global.Msg({
            msg: msj
        });
    }
    ,
    verificarResultado: function(status) {
        console.log("------ verificarResultados --------------");
        Ext.getCmp(prototype.id + '-tabMain').mask('Loading...');
        if (status === 'C') {
            console.log("Status C");
            Ext.Ajax.request({
                url: prototype.url + '/proccessComission',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-tabMain').mask('Loading...'),
                params: searchParams,
                success: function(response, options) {
                    Ext.getCmp(prototype.id + '-tabMain').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    var result = res.result;
                    console.log(result);
                }
            });
        }
        else if (status === 'I') {
            console.log("Vuelve a Intentarlo");
            setTimeout(function() {
                me.verificarProceso();
            }, 5000);
        } else {
            console.log("Error de procesamiento");
        }
        Ext.getCmp(prototype.id + '-tabMain').unmask();
    },
    setParams: function() {

        var date = Ext.util.Format.date(me.fecha, 'Ymd');
        if (invoice !== 'I') {
            periodicity = '';
        }

        var IN_A1805CCUST = '139';
        var IN_A1805APL = 'PX';
        var IN_A1805CLIEN = (type === 'GSA' ? invoice + periodicity : perio);
        var IN_A1805POLIZ = (type === 'GSA' ? 'GL' : 'AP');
        var IN_A1805FECHA = date;
        var IN_A1805BATCH = '';
        var IN_A1805PROGA = type;
        var IN_A1805MODO = 'S';
        var IN_A1805FILE = '';
        var IN_PARAM = '139' + date;
        searchParams = {
            IN_A1805CCUST: IN_A1805CCUST,
            IN_A1805APL: IN_A1805APL,
            IN_A1805CLIEN: IN_A1805CLIEN,
            IN_A1805POLIZ: IN_A1805POLIZ,
            IN_A1805FECHA: IN_A1805FECHA,
            IN_A1805BATCH: IN_A1805BATCH,
            IN_A1805PROGA: IN_A1805PROGA,
            IN_A1805MODO: IN_A1805MODO,
            IN_A1805FILE: IN_A1805FILE,
            IN_PARAM: IN_PARAM
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_A1805CCUST : " + searchParams.IN_A1805CCUST);
        console.log("IN_A1805APL : " + searchParams.IN_A1805APL);
        console.log("IN_A1805CLIEN : " + searchParams.IN_A1805CLIEN);
        console.log("IN_A1805POLIZ : " + searchParams.IN_A1805POLIZ);
        console.log("IN_A1805FECHA : " + searchParams.IN_A1805FECHA);
        console.log("IN_A1805BATCH : " + searchParams.IN_A1805BATCH);
        console.log("IN_A1805PROGA : " + searchParams.IN_A1805PROGA);
        console.log("IN_A1805MODO : " + searchParams.IN_A1805MODO);
        console.log("IN_A1805FILE : " + searchParams.IN_A1805FILE);
        console.log("IN_PARAM : " + searchParams.IN_PARAM);
        console.log("-------------------------------------------");
    },
    btnDownloadFiles_click: function() {
        var data = Ext.getCmp(prototype.id + '-gridData').store.data.items;
        var lista = [];
        var element;
        for (var i = 0; i < data.length; i++) {
            var item = data[i].data;
            element = {
                "AIRLIN": item.AIRLIN,
                //CADENA: item.CADENA,
                "CARRIER": item.CARRIER,
                "CUENTA": item.CUENTA,
                "FPROC": item.FPROC,
                "POLIZA_GL": item.POLIZA_GL
            };
            if (item.POLIZA_GL === 'Y') {
                lista.push(element);
            }
        }
        if (lista.length > 0) {
            var jsonArray = JSON.stringify(lista);
            Ext.Ajax.request({
                url: prototype.url + '/downloadFiles',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-tabMain').mask('Loading...'),
                params: {
                    lista: jsonArray,
                },
                success: function(response, options) {
                    Ext.getCmp(prototype.id + '-tabMain').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                }
            });
        } else {
            global.Msg({
                msg: 'Select a record.'
            });
        }


    }

});