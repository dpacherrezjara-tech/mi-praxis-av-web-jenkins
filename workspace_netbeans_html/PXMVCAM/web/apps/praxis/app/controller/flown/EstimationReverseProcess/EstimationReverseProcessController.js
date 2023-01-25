/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.EstimationReverseProcess.EstimationReverseProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EstimationReverseProcessController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'EstimationReverseProcessForm';
        prototype.url = CONTEXTPATH + '/EstimationReverseProcess';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#EstimationReverseProcessForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#EstimationReverseProcessForm-btnOutFile': {
                click: this.btnOutFile_click
            },
            '#EstimationReverseProcessForm-btnDownloadFiles': {
                click: this.btnDownloadFiles_click
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData(obj, e);
    },
    setStoreData: function() {
        var cbxAirline = Ext.getCmp(prototype.id + '-cbxAirline');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');
        var cbxType = Ext.getCmp(prototype.id + '-cbxType');

        cbxAirline.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["OAL", "OAL"],
                ["139", "139"],
                ["All", "All"]
            ]}));
        cbxAirline.setValue("");
        cbxCarrier.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["AM", "AM"],
                ["5D", "5D"],
                ["ALL", "ALL"]
            ]}));
        cbxCarrier.setValue("");
        cbxType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["E", "Estimate"],
                ["X", "Reverse"]
            ]}));
        cbxType.setValue("");


    },
    validateParams: function() {
        var cbxAirline = Ext.getCmp(prototype.id + '-cbxAirline');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');
        var cbxType = Ext.getCmp(prototype.id + '-cbxType');
        var fecha = Ext.getCmp(prototype.id + '-txtDate');
        var msj = '';


        if (cbxAirline.getValue() === '') {
            msj = 'You must select the Airline.';
            cbxAirline.focus();
            return msj;
        }


        if (cbxCarrier.getValue() === '') {
            msj = 'You must select the Carrier.';
            cbxCarrier.focus();
            return msj;
        }


        if (cbxType.getValue() === '') {
            msj = 'You must select the Type.';
            cbxType.focus();
            return msj;
        }

        if (fecha.getValue() === null) {
            msj = 'Input Date.';
            fecha.focus();
            return msj;
        } else {
            if (!fecha.isValid()) {
                msj = 'Input Corret Date.';
                fecha.focus();
                return msj;
            }
        }
        return msj;
    },
    btnOutFile_click: function() {
        var msj = this.validateParams();
        if (msj.trim() === '') {

            this.setParams();
            Ext.Ajax.request({
                url: prototype.url + '/obtainDataText',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-tabMain').mask('Loading...'),
                params: searchParams,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var status = res.lstQUERYTxt;
                    console.log(status);
                    if (status !== 'C')
                    {
                        if (status === 'X')
                        {
                            global.Msg({
                                msg: 'There are Tickets without Carrier.'
                            });
                        }
                        else if (status === 'I')
                        {
                            global.Msg({
                                msg: 'There is already a process running.'
                            });
                        }
                        else if (status === 'E')
                        {
                            global.Msg({
                                msg: 'There is no rate of exchange for the processing date.'
                            });
                        }
                        else
                        {
                            global.Msg({
                                msg: 'Error in process.'
                            });
                        }
                        Ext.getCmp(prototype.id + '-tabMain').unmask();
                    }
                    else
                    {
                        setTimeout(function() {
                            Ext.getCmp(prototype.id + '-tabMain').unmask();
                            me.verificarProceso();
                        }, 2000);
                    }
                }
            });
        } else {
            global.Msg({
                msg: msj
            });
        }

    },
    verificarProceso: function() {
        var status = "";
        Ext.Ajax.request({
            url: prototype.url + '/verificaProceso',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-tabMain').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-tabMain').unmask();
                var res = Ext.JSON.decode(response.responseText);
                status = res.lstValida;
                me.verificarResultado(status);
            }
        });
    },
    verificarResultado: function(status) {
        console.log("------ verificarResultados --------------");
        Ext.getCmp(prototype.id + '-tabMain').mask('Loading...');
        if (status === 'C') {
            console.log("Status C");

            Ext.Ajax.request({
                url: prototype.url + '/resultadoDownload',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-tabMain').mask('Loading...'),
                params: searchParams,
                success: function(response, options) {
                    Ext.getCmp(prototype.id + '-tabMain').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    var listaData = res.listaData;
                    console.log(listaData);
                    var aux;
                    if (listaData.length > 0) {

                        for (var i = 0; i < listaData.length; i++) {
                            console.log(listaData[i]);
                            aux = listaData[i].POLIZA_GL;
                            console.log(aux);
                            if (aux === 'N') {
                                listaData[i].CADENA = false;
                            } else {
                                listaData[i].CADENA = true;
                            }
                        }
                    }
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-tabMain').unmask();
                    global.Msg({
                        msg: 'Process Completed.'
                    });
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
        var txtDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtDate').getValue(), 'Ymd');
        var IN_A1805CLIEN = Ext.getCmp(prototype.id + '-cbxAirline').getValue();
        var IN_A1805POLIZ = Ext.getCmp(prototype.id + '-cbxCarrier').getValue();
        var IN_A1805MODO = Ext.getCmp(prototype.id + '-cbxType').getValue();
        var IN_PARAM = txtDate;
        var IN_A1805CCUST = '139';
        var IN_A1805APL = 'PX';
        var IN_A1805FECHA = txtDate;
        //strModo = (modo == 'E' ? 'EST' : 'REV');
        searchParams = {
            IN_A1805CLIEN: IN_A1805CLIEN,
            IN_A1805POLIZ: IN_A1805POLIZ,
            IN_A1805MODO: IN_A1805MODO,
            IN_PARAM: IN_PARAM,
            IN_A1805CCUST: IN_A1805CCUST,
            IN_A1805APL: IN_A1805APL,
            IN_A1805FECHA: IN_A1805FECHA
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_A1805CLIEN : " + searchParams.IN_A1805CLIEN);
        console.log("IN_A1805POLIZ : " + searchParams.IN_A1805POLIZ);
        console.log("IN_A1805MODO : " + searchParams.IN_A1805MODO);
        console.log("IN_PARAM : " + searchParams.IN_PARAM);
        console.log("IN_A1805APL : " + searchParams.IN_A1805APL);
        console.log("IN_A1805FECHA : " + searchParams.IN_A1805FECHA);
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
                    IN_A1805MODO: Ext.getCmp(prototype.id + '-cbxType').getValue()
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
