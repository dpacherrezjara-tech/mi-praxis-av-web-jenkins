/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.MultilegTable.DataEntryMultilegTableController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/MultilegTable',
    aeropuertos: {},
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
        var p = this.view.params;
        this.getAirports();

        switch (p.action) {
            case 'I':
                this.onClearInputs();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-flightDate').setReadOnly(false);
                Ext.getCmp(prototype.id + '-flightNumber').setReadOnly(false);
                Ext.getCmp(prototype.id + '-origin').setReadOnly(false);
                Ext.getCmp(prototype.id + '-destination').setReadOnly(false);

                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-flightDate').setReadOnly(true);
                Ext.getCmp(prototype.id + '-flightNumber').setReadOnly(true);
                Ext.getCmp(prototype.id + '-origin').setReadOnly(true);
                Ext.getCmp(prototype.id + '-destination').setReadOnly(true);


                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    getAirports: function() {
        aeropuertos = Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: [
                {name: 'A1007CTATO', type: 'string'},
                {name: 'A1007NOMBR', type: 'string'}
            ],
            proxy: {
                type: 'ajax',
                url: 'MultilegTable/getCities',
                actionMethods: {
                    read: 'POST'
                },
                timeout: 60000000,
                reader: {
                    keepRawData: true,
                    type: 'json',
                    root: 'data'
                }
            }
        });
    },
    onFocusLeaveAirport: function(obj) {

        console.log(obj.getValue());
        console.log(obj.getId());
        var exist = false;
        var codAir = obj.getValue().trim();

        aeropuertos.each(function(record) {
            if (codAir === record.data.A1007CTATO) {
                exist = true;
                return false;
            }
        });

        if (!exist) {
            global.Msg({
                msg: 'This airport does not exist"',
                fn: function() {
                    Ext.getCmp(obj.getId()).focus();
                }
            });
        }
    },
    onFocusLeaveFlightNumber: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-flightNumber');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    }
    ,
    onUpdateClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "U";
                    this.crud();
                }
            }
        });
    }
    ,
    onDeleteClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    }
    ,
    onSaveClick: function(btn) {
        var p = this.view.params;
        var fDate = Ext.getCmp(prototype.id + '-flightDate').getValue();
        var fNumber = Ext.getCmp(prototype.id + '-flightNumber').getValue();
        var origin = Ext.getCmp(prototype.id + '-origin').getValue();
        var destination = Ext.getCmp(prototype.id + '-destination').getValue();


        if (fDate === null) {
            global.Msg({
                msg: 'You must enter the Flight date.',
                fn: function() {
                    Ext.getCmp(prototype.id + '-flightDate').focus(true);
                }
            });
        } else if (fNumber === '') {
            global.Msg({
                msg: 'You must enter the Flight Number',
                fn: function() {
                    Ext.getCmp(prototype.id + '-flightNumber').focus(true);
                }
            });
        } else if (origin === '') {
            global.Msg({
                msg: 'You must enter the Departure Airport.',
                fn: function() {
                    Ext.getCmp(prototype.id + '-origin').focus(true);
                }
            });
        } else if (destination === '') {
            global.Msg({
                msg: 'You must enter the Arrival Airport..',
                fn: function() {
                    Ext.getCmp(prototype.id + '-destination').focus(true);
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
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });

        }
    }
    ,
    crud: function() {
        var p = this.view.params;
        rec = p.rec;

        var strOption = p.action;

        console.log('opcion : ' + strOption);

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                var icon=1;
                if(msg==='Record Already Exists'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close(),
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function(strOption) {


        var DFLIGHT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-flightDate').getValue(), 'Ymd');
        var NFLIGHT = Ext.getCmp(prototype.id + '-flightNumber').getValue();
        var CDEPART = Ext.getCmp(prototype.id + '-origin').getValue();
        var CARRIVA = Ext.getCmp(prototype.id + '-destination').getValue();
        var LEGSEQ = Ext.getCmp(prototype.id + '-legSeq').getValue();
        var BASICML = Ext.getCmp(prototype.id + '-mileage').getValue().trim()===''?'0':Ext.getCmp(prototype.id + '-mileage').getValue().trim();
        var DEPARTLEG1 = Ext.getCmp(prototype.id + '-leg1Origin').getValue();
        var ARRIVALEG1 = Ext.getCmp(prototype.id + '-leg1Destination').getValue();
        var BASICML1 = Ext.getCmp(prototype.id + '-leg1Mileage').getValue();
        var CARR1 = Ext.getCmp(prototype.id + '-leg1Carrier').getValue();

        var DEPARTLEG2 = Ext.getCmp(prototype.id + '-leg2Origin').getValue();
        var ARRIVALEG2 = Ext.getCmp(prototype.id + '-leg2Destination').getValue();
        var BASICML2 = Ext.getCmp(prototype.id + '-leg2Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg2Mileage').getValue().trim();
        var CARR2 = Ext.getCmp(prototype.id + '-leg2Carrier').getValue();

        var DEPARTLEG3 = Ext.getCmp(prototype.id + '-leg3Origin').getValue();
        var ARRIVALEG3 = Ext.getCmp(prototype.id + '-leg3Destination').getValue();
        var BASICML3 = Ext.getCmp(prototype.id + '-leg3Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg3Mileage').getValue().trim();
        var CARR3 = Ext.getCmp(prototype.id + '-leg3Carrier').getValue();

        var DEPARTLEG4 = Ext.getCmp(prototype.id + '-leg4Origin').getValue();
        var ARRIVALEG4 = Ext.getCmp(prototype.id + '-leg4Destination').getValue();
        var BASICML4 = Ext.getCmp(prototype.id + '-leg4Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg4Mileage').getValue().trim();
        var CARR4 = Ext.getCmp(prototype.id + '-leg4Carrier').getValue();

        var DEPARTLEG5 = Ext.getCmp(prototype.id + '-leg5Origin').getValue();
        var ARRIVALEG5 = Ext.getCmp(prototype.id + '-leg5Destination').getValue();
        var BASICML5 = Ext.getCmp(prototype.id + '-leg5Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg5Mileage').getValue().trim();
        var CARR5 = Ext.getCmp(prototype.id + '-leg5Carrier').getValue();

        var DEPARTLEG6 = Ext.getCmp(prototype.id + '-leg6Origin').getValue();
        var ARRIVALEG6 = Ext.getCmp(prototype.id + '-leg6Destination').getValue();
        var BASICML6 = Ext.getCmp(prototype.id + '-leg6Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg6Mileage').getValue().trim();
        var CARR6 = Ext.getCmp(prototype.id + '-leg6Carrier').getValue();

        var DEPARTLEG7 = Ext.getCmp(prototype.id + '-leg7Origin').getValue();
        var ARRIVALEG7 = Ext.getCmp(prototype.id + '-leg7Destination').getValue();
        var BASICML7 = Ext.getCmp(prototype.id + '-leg7Mileage').getValue().trim()===''?0:Ext.getCmp(prototype.id + '-leg7Mileage').getValue().trim();
        var CARR7 = Ext.getCmp(prototype.id + '-leg7Carrier').getValue();

        return {
            strOption: strOption,
            DFLIGHT: DFLIGHT,
            NFLIGHT: NFLIGHT,
            CDEPART: CDEPART,
            CARRIVA: CARRIVA,
            LEGSEQ: LEGSEQ,
            BASICML: BASICML,
            DEPARTLEG1: DEPARTLEG1,
            ARRIVALEG1: ARRIVALEG1,
            BASICML1: BASICML1,
            CARR1: CARR1,
            DEPARTLEG2: DEPARTLEG2,
            ARRIVALEG2: ARRIVALEG2,
            BASICML2: BASICML2,
            CARR2: CARR2,
            DEPARTLEG3: DEPARTLEG3,
            ARRIVALEG3: ARRIVALEG3,
            BASICML3: BASICML3,
            CARR3: CARR3,
            DEPARTLEG4: DEPARTLEG4,
            ARRIVALEG4: ARRIVALEG4,
            BASICML4: BASICML4,
            CARR4: CARR4,
            DEPARTLEG5: DEPARTLEG5,
            ARRIVALEG5: ARRIVALEG5,
            BASICML5: BASICML5,
            CARR5: CARR5,
            DEPARTLEG6: DEPARTLEG6,
            ARRIVALEG6: ARRIVALEG6,
            BASICML6: BASICML6,
            CARR6: CARR6,
            DEPARTLEG7: DEPARTLEG7,
            ARRIVALEG7: ARRIVALEG7,
            BASICML7: BASICML7,
            CARR7: CARR7
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
        Ext.getCmp(prototype.id + '-flightDate').setValue('');
        Ext.getCmp(prototype.id + '-flightNumber').setValue('');
        Ext.getCmp(prototype.id + '-origin').setValue('');
        Ext.getCmp(prototype.id + '-destination').setValue('');
        Ext.getCmp(prototype.id + '-legSeq').setValue('');
        Ext.getCmp(prototype.id + '-mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg1Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg1Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg1Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg1Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg2Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg2Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg2Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg2Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg3Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg3Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg3Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg3Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg4Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg4Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg4Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg4Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg5Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg5Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg5Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg5Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg6Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg6Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg6Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg6Carrier').setValue('');
        Ext.getCmp(prototype.id + '-leg7Origin').setValue('');
        Ext.getCmp(prototype.id + '-leg7Destination').setValue('');
        Ext.getCmp(prototype.id + '-leg7Mileage').setValue('0');
        Ext.getCmp(prototype.id + '-leg7Carrier').setValue('');
    }
    , getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp(prototype.id + '-flightDate').setValue(rec.get('strFormatDate'));
        Ext.getCmp(prototype.id + '-flightNumber').setValue(rec.get('NFLIGHT'));

        Ext.getCmp(prototype.id + '-origin').setValue(rec.get('CDEPART'));
        Ext.getCmp(prototype.id + '-destination').setValue(rec.get('CARRIVA'));
        Ext.getCmp(prototype.id + '-legSeq').setValue(rec.get('LEGSEQ'));

        Ext.getCmp(prototype.id + '-mileage').setValue(rec.get('BASICML'));

        Ext.getCmp(prototype.id + '-leg1Origin').setValue(rec.get('DEPARTLEG1'));
        Ext.getCmp(prototype.id + '-leg1Destination').setValue(rec.get('ARRIVALEG1'));
        Ext.getCmp(prototype.id + '-leg1Mileage').setValue(rec.get('BASICML1'));
        Ext.getCmp(prototype.id + '-leg1Carrier').setValue(rec.get('CARR1'));

        Ext.getCmp(prototype.id + '-leg2Origin').setValue(rec.get('DEPARTLEG2'));
        Ext.getCmp(prototype.id + '-leg2Destination').setValue(rec.get('ARRIVALEG2'));
        Ext.getCmp(prototype.id + '-leg2Mileage').setValue(rec.get('BASICML2'));
        Ext.getCmp(prototype.id + '-leg2Carrier').setValue(rec.get('CARR2'));

        Ext.getCmp(prototype.id + '-leg3Origin').setValue(rec.get('DEPARTLEG3'));
        Ext.getCmp(prototype.id + '-leg3Destination').setValue(rec.get('ARRIVALEG3'));
        Ext.getCmp(prototype.id + '-leg3Mileage').setValue(rec.get('BASICML3'));
        Ext.getCmp(prototype.id + '-leg3Carrier').setValue(rec.get('CARR3'));

        Ext.getCmp(prototype.id + '-leg4Origin').setValue(rec.get('DEPARTLEG4'));
        Ext.getCmp(prototype.id + '-leg4Destination').setValue(rec.get('ARRIVALEG4'));
        Ext.getCmp(prototype.id + '-leg4Mileage').setValue(rec.get('BASICML4'));
        Ext.getCmp(prototype.id + '-leg4Carrier').setValue(rec.get('CARR4'));

        Ext.getCmp(prototype.id + '-leg5Origin').setValue(rec.get('DEPARTLEG5'));
        Ext.getCmp(prototype.id + '-leg5Destination').setValue(rec.get('ARRIVALEG5'));
        Ext.getCmp(prototype.id + '-leg5Mileage').setValue(rec.get('BASICML5'));
        Ext.getCmp(prototype.id + '-leg5Carrier').setValue(rec.get('CARR5'));

        Ext.getCmp(prototype.id + '-leg6Origin').setValue(rec.get('DEPARTLEG6'));
        Ext.getCmp(prototype.id + '-leg6Destination').setValue(rec.get('ARRIVALEG6'));
        Ext.getCmp(prototype.id + '-leg6Mileage').setValue(rec.get('BASICML6'));
        Ext.getCmp(prototype.id + '-leg6Carrier').setValue(rec.get('CARR6'));

        Ext.getCmp(prototype.id + '-leg7Origin').setValue(rec.get('DEPARTLEG7'));
        Ext.getCmp(prototype.id + '-leg7Destination').setValue(rec.get('ARRIVALEG7'));
        Ext.getCmp(prototype.id + '-leg7Mileage').setValue(rec.get('BASICML7'));
        Ext.getCmp(prototype.id + '-leg7Carrier').setValue(rec.get('CARR7'));

        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('HOUP'));

    }



});


