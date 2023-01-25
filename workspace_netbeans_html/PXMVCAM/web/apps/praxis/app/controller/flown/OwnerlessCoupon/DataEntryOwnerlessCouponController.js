/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.OwnerlessCoupon.DataEntryOwnerlessCouponController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/OwnerlessCoupon',
    p: {},
    A1413CIA: '',
    A14113CUPON: '',
    A1413FORSE: '',
    meDE:'',
    /**
     * Constructor
     */
    init: function(view) {
         meDE = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        console.log("URL : " + this.url);
        this.p = this.view.params;
        this.setStoreData();
        switch (this.p.action) {
            case 'I':
//                this.onClearInputs();
                break;
            case 'U':
                this.getDataInputs();
                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    }
    ,
    setStoreData: function() {
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbA1413STCRU');
        var cmbRegType = Ext.getCmp(prototype.id + '-cmbA1413TYPE');
        var cmbSaleSource = Ext.getCmp(prototype.id + '-cmbA1413SOURC');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pendiente"],
                ["M", "Macht con venta"],
                ["F", "Extraido al Flown"],
                ["D", "Duplicate"],
                ["C", "Cancelled"]
            ]}));
        cmbRegType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["A", "Reg. Cabecera Archivo"],
                ["B", "Reg. Vuelo"],
                ["C", "Reg. Tickets"],
                ["D", "Reg. Totales Archivos"]

            ]}));
        cmbSaleSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["A", "ARC"],
                ["B", "BSP"],
                ["T", "TCN"],
                ["I", "ISR"],
                ["X", "XL"]


            ]}));
    },
    validateFields: function() {
        var A1413FROM = Ext.getCmp(prototype.id + '-txtA1413FROM');
        var A1413TO = Ext.getCmp(prototype.id + '-txtA1413TO');
        var A1413FVLOB = Ext.getCmp(prototype.id + '-txtA1413FVLOB');
        var A1413NVLOB = Ext.getCmp(prototype.id + '-txtA1413NVLOB');
        var msj = '';
        if (!A1413FVLOB.isValid()) {
            msj = 'Invalid Flight Date';
            return msj;
        }
        if (A1413NVLOB.getValue() === '') {
            msj = 'Invalid Flight Number';
            return msj;
        }
        if (A1413FVLOB.getValue() === '') {
            msj = 'Invalid Flight Date';
            return msj;
        }
        if (!A1413FROM.isValid()) {
            msj = 'It requires you to enter a Departure City';
            return msj;
        }
        if (!A1413TO.isValid()) {
            msj = 'It requires you to enter an Arrival City';
            return msj;
        }
        return msj;
    }
    ,
    onUpdateClick: function(btn) {

        var A1413FROM = Ext.getCmp(prototype.id + '-txtA1413FROM').getValue();
        var A1413TO = Ext.getCmp(prototype.id + '-txtA1413TO').getValue();
        var A1413FVLOB = Ext.getCmp(prototype.id + '-txtA1413FVLOB').getValue();
        var A1413NVLOB = Ext.getCmp(prototype.id + '-txtA1413NVLOB').getValue();

        var msj = this.validateFields();
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj,
                fn: function() {
                }
            });
        } else {

            Ext.Ajax.request({
                url: prototype.url + '/validFlight',
                method: 'POST',
                timeout: 60000000,
                waitTitle: 'Processing',
                waitMsg: 'Response time...',
                params: {
                    A1413FROM: A1413FROM,
                    A1413TO: A1413TO,
                    A1413FVLOB: A1413FVLOB,
                    A1413NVLOB: A1413NVLOB
                },
                success: function(response, options) {
                    var resp = Ext.JSON.decode(response.responseText);
                    console.log(" Mensaje en el Succes : " + resp.msj);
                    if (resp.msj.trim() === '') {
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Are you sure to update ?',
                            buttons: Ext.MessageBox.YESNO,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'yes') {
                                    meDE.p.action = "U";
                                    meDE.crud();
                                }
                            }
                        });
                    } else {
                        global.Msg({
                            msg: resp.msj.trim(),
                            fn: function() {
                            }
                        });
                    }

                }

            });
        }

    }
    ,
    onDeleteClick: function(btn) {
    }
    ,
    onSaveClick: function(btn) {
    }
    ,
    crud: function() {

        var rec = this.p.rec;
        var strOption = this.p.action;
        console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                if (msg === 'DUPLICATED KEY, VERIY!') {
                    global.Msg({
                        msg: msg,
                        icon: 2,
                        fn: function() {
                        }
                    });
                } else {
                    global.Msg({
                        msg: msg,
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                }

            }
        });
    }
    ,
    getDataEntryValues: function(strOption) {

        var strOption = strOption;
        var A1413DATE = Ext.getCmp(prototype.id + '-txtA1413DATE').getValue();
        var A1413SEC = Ext.getCmp(prototype.id + '-txtA1413SEC').getValue();
        var A1413DATA = Ext.getCmp(prototype.id + '-txtA1413DATA').getValue();
        var A1413STATU = Ext.getCmp(prototype.id + '-txtA1413STATU').getValue();
        var strTicket = Ext.getCmp(prototype.id + '-txtStrTicket').getValue();
        var arreglo = strTicket.split(" ");
        var A1413CIA = arreglo[0];
        var A1413FORSE = arreglo[1];
        var A1413CUPON = arreglo[2];
        var A1413FROM = Ext.getCmp(prototype.id + '-txtA1413FROM').getValue();
        var A1413TO = Ext.getCmp(prototype.id + '-txtA1413TO').getValue();
        var A1413STCRU = Ext.getCmp(prototype.id + '-cmbA1413STCRU').getValue();
        var A1413FVLO = Ext.getCmp(prototype.id + '-txtA1413FVLO').getValue();
        var A1413TYPE = Ext.getCmp(prototype.id + '-cmbA1413TYPE').getValue();
        var A1413SOURC = Ext.getCmp(prototype.id + '-cmbA1413SOURC').getValue();
        var A1413PNROR = Ext.getCmp(prototype.id + '-txtA1413PNROR').getValue();
        var A1413PNR = Ext.getCmp(prototype.id + '-txtA1413PNR').getValue();
        var A1413FFCIA = Ext.getCmp(prototype.id + '-txtA1413FFCIA').getValue();
        var A1413FFCOD = Ext.getCmp(prototype.id + '-txtA1413FFCOD').getValue();
        var A1413FVTA = Ext.getCmp(prototype.id + '-txtA1413FVTA').getValue();
        var A1413NPAX = Ext.getCmp(prototype.id + '-txtA1413NPAX').getValue();
        var A1413FVLOB = Ext.getCmp(prototype.id + '-txtA1413FVLOB').getValue();
        var A1413NVLOB = Ext.getCmp(prototype.id + '-txtA1413NVLOB').getValue();
        var A1413CITYB = Ext.getCmp(prototype.id + '-txtA1413CITYB').getValue();
        var A1413FCONT = Ext.getCmp(prototype.id + '-txtA1413FCONT').getValue();


        return {
            strOption: strOption,
            A1413DATE: A1413DATE,
            A1413SEC: A1413SEC,
            A1413DATA: A1413DATA,
            A1413STATU: A1413STATU,
            A1413CIA: A1413CIA,
            A1413FORSE: A1413FORSE,
            A1413CUPON: A1413CUPON,
            A1413FROM: A1413FROM,
            A1413TO: A1413TO,
            A1413STCRU: A1413STCRU,
            A1413FVLO: A1413FVLO,
            A1413TYPE: A1413TYPE,
            A1413SOURC: A1413SOURC,
            A1413PNROR: A1413PNROR,
            A1413PNR: A1413PNR,
            A1413FFCIA: A1413FFCIA,
            A1413FFCOD: A1413FFCOD,
            A1413FVTA: A1413FVTA,
            A1413NPAX: A1413NPAX,
            A1413FVLOB: A1413FVLOB,
            A1413NVLOB: A1413NVLOB,
            A1413CITYB: A1413CITYB,
            A1413FCONT: A1413FCONT
        };
    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    onClearInputs: function() {
        // Ext.getCmp(prototype.id + '-flightNumberOpe').setValue('');       
    },
    getDataInputs: function() {

        console.log("Entro al getDataInputs");
        var rec = this.p.rec;
        var A1413DATE = rec.get('A1413DATE');
        var A1413CIA = rec.get('A1413CIA');
        var A1413FORSE = rec.get('A1413FORSE');
        var A1413CUPON = rec.get('A1413CUPON');
        Ext.Ajax.request({
            url: prototype.url + '/searchBeans',
            method: 'POST',
            timeout: 60000000,        
            params: {
                A1413DATE: A1413DATE,
                A1413CIA: A1413CIA,
                A1413FORSE: A1413FORSE,
                A1413CUPON: A1413CUPON
            }           
            ,
            success: function(response, options) {
                var resp = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.id + '-txtA1413DATE').setValue(resp.beanCons.A1413DATE);
                Ext.getCmp(prototype.id + '-txtStrTicket').setValue(resp.beanCons.strTicket);
                Ext.getCmp(prototype.id + '-txtA1413FVLOB').setValue(resp.beanCons.A1413FVLOB);
                Ext.getCmp(prototype.id + '-txtA1413NVLOB').setValue(resp.beanCons.A1413NVLOB);
                Ext.getCmp(prototype.id + '-txtA1413FROM').setValue(resp.beanCons.A1413FROM);
                Ext.getCmp(prototype.id + '-txtA1413TO').setValue(resp.beanCons.A1413TO);
                Ext.getCmp(prototype.id + '-txtA1413FREGI').setValue(resp.beanCons.A1413FREGI);
                Ext.getCmp(prototype.id + '-cmbA1413STCRU').setValue(resp.beanCons.A1413STCRU);
                Ext.getCmp(prototype.id + '-cmbA1413TYPE').setValue(resp.beanCons.A1413TYPE);
                Ext.getCmp(prototype.id + '-cmbA1413SOURC').setValue(resp.beanCons.A1413SOURC);
                Ext.getCmp(prototype.id + '-txtA1413SEC').setValue(resp.beanCons.A1413SEC);
                Ext.getCmp(prototype.id + '-txtA1413PNROR').setValue(resp.beanCons.A1413PNROR);
                Ext.getCmp(prototype.id + '-txtA1413PNR').setValue(resp.beanCons.A1413PNROR);
                Ext.getCmp(prototype.id + '-txtA1413DATA').setValue(resp.beanCons.A1413DATA);
                Ext.getCmp(prototype.id + '-txtA1413FVLO').setValue(resp.beanCons.A1413FVLO);
                Ext.getCmp(prototype.id + '-txtA1413CITYB').setValue(resp.beanCons.A1413CITYB);
                Ext.getCmp(prototype.id + '-txtA1413FFCOD').setValue(resp.beanCons.A1413FFCOD);
                Ext.getCmp(prototype.id + '-txtA1413FFCIA').setValue(resp.beanCons.A1413FFCIA);
                Ext.getCmp(prototype.id + '-txtA1413STATU').setValue(resp.beanCons.A1413STATU);
                Ext.getCmp(prototype.id + '-txtA1413NPAX').setValue(resp.beanCons.A1413NPAX);
                Ext.getCmp(prototype.id + '-txtA1413FCONT').setValue(resp.beanCons.A1413FCONT);
                Ext.getCmp(prototype.id + '-txtA1413FVTA').setValue(resp.beanCons.A1413FVTA);
                Ext.getCmp(prototype.id + '-USCR').setValue(resp.beanCons.A1413REGIS);
                Ext.getCmp(prototype.id + '-FECR').setValue(resp.beanCons.A1413FREGI);
                Ext.getCmp(prototype.id + '-HOCR').setValue(resp.beanCons.A1413HREGI);
                Ext.getCmp(prototype.id + '-USUP').setValue(resp.beanCons.A1413REVIS);
                Ext.getCmp(prototype.id + '-FEUP').setValue(resp.beanCons.A1413FREVI);
                Ext.getCmp(prototype.id + '-HOUP').setValue(resp.beanCons.A1413HREVI);
            },
            failure: function(form, action) {
                if (action.failureType === 'server') {
                    obj = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('Server Error!', obj.msg);
                } else {
                    Ext.Msg.alert('Warning!', action.response.responseText);
                }
            }
        });
    },
    onBackClickDataEntry: function() {
        console.log("Atras");
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        console.log("---" + this.p.rowIndex);
        if (this.p.rowIndex > 0) {
            rec = all.getAt(rowIndex - 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex - 1};           
            this.getDataInputs();
        }
    },
    onNextClickDataEntry: function() {
        console.log("Siguiente");
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        console.log("---" + this.p.rowIndex);
        if (this.p.rowIndex < 19) {
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};            
            this.getDataInputs();
        }
    }



});


