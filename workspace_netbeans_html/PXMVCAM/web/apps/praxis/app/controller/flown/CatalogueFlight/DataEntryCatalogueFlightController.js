/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.CatalogueFlight.DataEntryCatalogueFlightController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/CatalogueFlight',
    p: {},
    existAirport: false,
    aux: false,
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
        console.log("URL : " + this.url);
        this.p = this.view.params;
        this.setStoreData();

        switch (this.p.action) {
            case 'I':
                this.onClearInputs();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-de-back').hide();
                Ext.getCmp(prototype.id + '-btn-de-next').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-flightNumberOpe').setReadOnly(false);
                Ext.getCmp(prototype.id + '-carrierOpe').setReadOnly(false);
                Ext.getCmp(prototype.id + '-flightNumberMar').setReadOnly(false);
                Ext.getCmp(prototype.id + '-carrierMar').setReadOnly(false);
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-de-back').show();
                Ext.getCmp(prototype.id + '-btn-de-next').show();
                Ext.getCmp(prototype.id + '-flightNumberOpe').setReadOnly(true);
                Ext.getCmp(prototype.id + '-carrierOpe').setReadOnly(true);
                Ext.getCmp(prototype.id + '-flightNumberMar').setReadOnly(true);
                Ext.getCmp(prototype.id + '-carrierMar').setReadOnly(true);


                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    }
    ,
    setStoreData: function() {
        var cmbOperator = Ext.getCmp(prototype.id + '-cmbOperator');
        var cmbFlight = Ext.getCmp(prototype.id + '-cmbFlight');

        cmbOperator.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["I", "International"],
                ["D", "Domestic"]
            ]}));


        cmbFlight.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["J", "Scheduled"],
                ["C", "Charter"]
            ]}));
    },
    onFocusLeaveOpe: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-flightNumberOpe');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    onFocusLeaveMar: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-flightNumberMar');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    onFocusLeaveHar: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-flightNumberHar');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    }
    ,
    onUpdateClick: function(btn) {
        //var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.p.action = "U";
                    this.crud();
                }
            }
        });
    }
    ,
    onDeleteClick: function(btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.p.action = "D";
                    this.crud();
                }
            }
        });
    }
    ,
    onSaveClick: function(btn) {
        var NFLIGHT = Ext.getCmp(prototype.id + '-flightNumberOpe').getValue();
        var CARRIER = Ext.getCmp(prototype.id + '-carrierOpe').getValue();
        var NFLIGMKT = Ext.getCmp(prototype.id + '-flightNumberMar').getValue();
        var CARRIMKT = Ext.getCmp(prototype.id + '-carrierMar').getValue();
        var NFLIGHTH = Ext.getCmp(prototype.id + '-flightNumberHar').getValue();
        var CARRIERH = Ext.getCmp(prototype.id + '-carrierHar').getValue();
        var FREQ = Ext.getCmp(prototype.id + '-frecuency').getValue();
        var EQUIPO = Ext.getCmp(prototype.id + '-equipment').getValue();
        var TOPER = Ext.getCmp(prototype.id + '-cmbOperator').getValue();
        var TFLIGH = Ext.getCmp(prototype.id + '-cmbFlight').getValue();



        if (TFLIGH === null) {
            TFLIGH = '';
        } else {
            if (TFLIGH === 'Scheduled' || TFLIGH === 'J') {
                TFLIGH = 'J';
            } else if (TFLIGH === 'Charter' || TFLIGH === 'C') {
                TFLIGH = 'C';
            } else {
                TFLIGH = '';
            }
        }
        if (TOPER === null) {
            TOPER = '';
        } else {
            if (TOPER === 'International' || TOPER === 'I') {
                TOPER = 'I';
            } else if (TOPER === 'Domestic' || TOPER === 'D') {
                TOPER = 'D';
            } else {
                TOPER = '';
            }
        }
        if (NFLIGHT.trim() === '' || CARRIER.trim() === '' || NFLIGMKT.trim() === '' || CARRIMKT.trim() === '') {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {
                }
            });
        } else {
            if (CARRIER.trim().length < 2 || CARRIMKT.trim().length < 2) {
                global.Msg({
                    msg: 'It requires you to enter a Carrier.',
                    fn: function() {
                    }
                });
            } else {

                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to insert?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            this.p.action = "I";
                            this.crud();
                        }
                    }
                });

            }
        }


//        if (fDate === null) {
//            global.Msg({
//                msg: 'You must enter the Flight date.',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-flightDate').focus(true);
//                }
//            });
//        } else if (fNumber === '') {
//            global.Msg({
//                msg: 'You must enter the Flight Number',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-flightNumber').focus(true);
//                }
//            });
//        } else if (origin === '') {
//            global.Msg({
//                msg: 'You must enter the Departure Airport.',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-origin').focus(true);
//                }
//            });
//        } else if (destination === '') {
//            global.Msg({
//                msg: 'You must enter the Arrival Airport..',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-destination').focus(true);
//                }
//            });
//        } else {
//
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to insert?',
//                buttons: Ext.MessageBox.YESNO,
//                scope: this,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function(btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "I";
//                        this.crud();
//                    }
//                }
//            });
//
//        }
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


        var NFLIGHT = Ext.getCmp(prototype.id + '-flightNumberOpe').getValue();
        var CARRIER = Ext.getCmp(prototype.id + '-carrierOpe').getValue();
        var NFLIGMKT = Ext.getCmp(prototype.id + '-flightNumberMar').getValue();
        var CARRIMKT = Ext.getCmp(prototype.id + '-carrierMar').getValue();
        var NFLIGHTH = Ext.getCmp(prototype.id + '-flightNumberHar').getValue();
        var CARRIERH = Ext.getCmp(prototype.id + '-carrierHar').getValue();
        var FREQ = Ext.getCmp(prototype.id + '-frecuency').getValue();
        var EQUIPO = Ext.getCmp(prototype.id + '-equipment').getValue();
        var TOPER = Ext.getCmp(prototype.id + '-cmbOperator').getValue();
        var TFLIGH = Ext.getCmp(prototype.id + '-cmbFlight').getValue();

        console.log("--------->TFLIGH : " + TFLIGH);
        if (TFLIGH === null) {
            TFLIGH = '';
        } else {
            if (TFLIGH === 'Scheduled' || TFLIGH === 'J') {
                TFLIGH = 'J';
            } else if (TFLIGH === 'Charter' || TFLIGH === 'C') {
                TFLIGH = 'C';
            } else {
                TFLIGH = '';
            }
        }

        console.log("--------->TOPER : " + TOPER);
        if (TOPER === null) {
            TOPER = '';
        } else {
            if (TOPER === 'International' || TOPER === 'I') {
                TOPER = 'I';
            } else if (TOPER === 'Domestic' || TOPER === 'D') {
                TOPER = 'D';
            } else {
                TOPER = '';
            }
        }
        console.log("Parametros a pasar : ");
        console.log("NFLIGHT : " + NFLIGHT);
        console.log("CARRIER : " + CARRIER);
        console.log("NFLIGMKT : " + NFLIGMKT);
        console.log("CARRIMKT : " + CARRIMKT);
        console.log("NFLIGHTH : " + NFLIGHTH);
        console.log("CARRIERH : " + CARRIERH);
        console.log("FREQ : " + FREQ);
        console.log("TOPER : " + TOPER);
        console.log("NFLIGHT : " + TFLIGH);


        return {
            strOption: strOption,
            NFLIGHT: NFLIGHT,
            CARRIER: CARRIER,
            NFLIGMKT: NFLIGMKT,
            CARRIMKT: CARRIMKT,
            NFLIGHTH: NFLIGHTH,
            CARRIERH: CARRIERH,
            FREQ: FREQ,
            EQUIPO: EQUIPO,
            TOPER: TOPER,
            TFLIGH: TFLIGH
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
        Ext.getCmp(prototype.id + '-flightNumberOpe').setValue('');
        Ext.getCmp(prototype.id + '-carrierOpe').setValue('');
        Ext.getCmp(prototype.id + '-flightNumberMar').setValue('');
        Ext.getCmp(prototype.id + '-carrierMar').setValue('');
        Ext.getCmp(prototype.id + '-flightNumberHar').setValue('');
        Ext.getCmp(prototype.id + '-carrierHar').setValue('');
        Ext.getCmp(prototype.id + '-frecuency').setValue('');
        Ext.getCmp(prototype.id + '-equipment').setValue('');
        Ext.getCmp(prototype.id + '-cmbOperator').setValue('');
        Ext.getCmp(prototype.id + '-cmbFlight').setValue('');
    },
    getDataInputs: function() {
        var rec = this.p.rec;

        Ext.getCmp(prototype.id + '-flightNumberOpe').setValue(rec.get('NFLIGHT').trim());
        Ext.getCmp(prototype.id + '-carrierOpe').setValue(rec.get('CARRIER').trim());
        Ext.getCmp(prototype.id + '-flightNumberMar').setValue(rec.get('NFLIGMKT').trim());
        Ext.getCmp(prototype.id + '-carrierMar').setValue(rec.get('CARRIMKT').trim());
        Ext.getCmp(prototype.id + '-flightNumberHar').setValue(rec.get('NFLIGHTH').trim());
        Ext.getCmp(prototype.id + '-carrierHar').setValue(rec.get('CARRIERH').trim());
        Ext.getCmp(prototype.id + '-frecuency').setValue(rec.get('FREQ').trim());
        Ext.getCmp(prototype.id + '-equipment').setValue(rec.get('EQUIPO').trim());
        Ext.getCmp(prototype.id + '-cmbOperator').setValue(rec.get('TOPER').trim());
        Ext.getCmp(prototype.id + '-cmbFlight').setValue(rec.get('TFLIGH').trim());


        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('HOUP'));

    },
    onBackClickDataEntry: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            rec = all.getAt(rowIndex - 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex - 1};
            this.getDataInputs();
        }
    },
    onNextClickDataEntry: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};
            this.getDataInputs();
        }
    }


});


