/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.ZoneMasterFile.DataEntryZoneMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryZoneMasterFileController',
    url: CONTEXTPATH + '/ZoneMasterFile',
    /**
     * Constructor
     */
    existAirport: false,
    init: function(view) {
        var me = this;

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        console.log("URL : " + this.url);
        var p = this.view.params;
        this.setStoreData();
        switch (p.action) {
            case 'I':
                this.onClearInputs();
                Ext.getCmp('vZoneMasterFile-btn-delete').hide();
                Ext.getCmp('vZoneMasterFile-btn-update').hide();
                Ext.getCmp('vZoneMasterFile-btn-save').show();
                Ext.getCmp('vZoneMasterFile-Airport').setDisabled(false);
                Ext.getCmp('vZoneMasterFile-Airport').focus(true);
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp('vZoneMasterFile-btn-delete').show();
                Ext.getCmp('vZoneMasterFile-btn-update').hide();
                Ext.getCmp('vZoneMasterFile-btn-save').hide();
                Ext.getCmp('vZoneMasterFile-Airport').setDisabled(true);
                Ext.getCmp('vZoneMasterFile-Zone').focus(true);


                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreData: function() {
        var Zone = Ext.getCmp('vZoneMasterFile-Zone');
        Zone.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AFR", 'AFR - AFRICA'],
                ["ASI", "ASI - ASIA"],
                ["CAN", "CAN - CANADA"],
                ["CAM", "CAM - CENTROAMERICA"],
                ["CAR", "CAR - CARIBE"],
                ["EUR", "EUR - EUROPA"],
                ["FRO", "FRO - FRONTERA"],
                ["LOC", "LOC - LOCAL"],
                ["OCE", "OCE - OCEANIA"],
                ["PLA", "PLA - PLAYA"],
                ["SUD", "SUD - SUDAMERICA"],
                ["USA", "USA - ESTADOS UNIDOS"]
            ]
        }));
        Zone.setValue("");
    },
    onFocusLeaveAirport: function() {
        Ext.getCmp('vZoneMasterFile-AirportName').setData("");
        var codeAir = Ext.getCmp('vZoneMasterFile-Airport').getValue();
        var aeropuertos = Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').getStore();
        var nameAirport;
        var exist = false;

        aeropuertos.each(function(record) {
            if (codeAir === record.data.A1007CTATO) {
                exist = true;
                nameAirport = record.data.A1007NOMBR.substring(6);
                return false;
            }
        });

        this.existAirport = exist;
        if (this.existAirport) {
            Ext.getCmp('vZoneMasterFile-AirportName').setData(nameAirport);
        } else {
            global.Msg({
                msg: 'This airport code is not registered in the master table of "Airports and cities"',
                fn: function() {
                }
            });
        }
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
                    this.save();
                }
            }
        });
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        var codeAir = Ext.getCmp('vZoneMasterFile-Airport').getValue();
        var codZone = Ext.getCmp('vZoneMasterFile-Zone').getValue();
        console.log("codAir : " + codeAir);
        console.log("codZone : " + codZone);
        if (codeAir === '' || codZone === '' || codZone.length !== 3) {
            global.Msg({
                msg: 'Complete all fields correctly',
                fn: function() {
                }
            });
        } else {
            if (this.existAirport) { //Si el codigo de aeropuerto ingresado  existe en el registro se procede con el insert
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
                            this.save();
                        }
                    }
                });
            } else {
                global.Msg({
                    msg: 'This airport code is not registered in the master table of "Airports and cities"',
                    fn: function() {
                        Ext.getCmp('vZoneMasterFile-Airport').focus(true);
                    }
                });
            }
        }






    },
    save: function() {
        var p = this.view.params;
        rec = p.rec;

        var strOption = p.action;
        //var TREG = rec.get("TREG");
        //var CCUST = rec.get("CCUST");
        var ZONA = Ext.String.trim(Ext.getCmp('vZoneMasterFile-Zone').getValue());
        var ATOS = Ext.String.trim(Ext.getCmp('vZoneMasterFile-Airport').getValue());
        var USCR = Ext.String.trim(Ext.getCmp('vZoneMasterFile-USCR').getValue());
        var FECR = Ext.String.trim(Ext.getCmp('vZoneMasterFile-FECR').getValue());
        var HOCR = Ext.String.trim(Ext.getCmp('vZoneMasterFile-HOCR').getValue());
        var USUP = Ext.String.trim(Ext.getCmp('vZoneMasterFile-USUP').getValue());
        var FEUP = Ext.String.trim(Ext.getCmp('vZoneMasterFile-FEUP').getValue());
        var HOUP = Ext.String.trim(Ext.getCmp('vZoneMasterFile-HOUP').getValue());

        console.log('opcion : ' + strOption);

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {
                strOption: strOption,
                TREG: "1",
                CCUST: "139",
                ZONA: ZONA,
                ATOS: ATOS,
                USCR: USCR,
                FECR: FECR,
                HOCR: HOCR,
                USUP: USUP,
                FEUP: FEUP,
                HOUP: HOUP
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg;

                if (parseInt(res.sql_code) === 0) {
                    if (strOption === 'I') {
                        msg = 'Added registry correctly';
                    } else if (strOption === 'D') {
                        msg = 'Deleted registry correctly'
                    }

                    global.Msg({
                        msg: msg,
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp('vZoneMasterFile-dataEntry-win').close(),
                                    Ext.getCmp('vZoneMasterFile-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    var msg;
                    if (parseInt(res.sql_code) === 2) {
                        msg = "Airport code duplicate";
                    } else {
                        msg = "Airport code duplicate."
                    }
                    global.Msg({
                        msg: msg, //res.response,
                        icon: 2,
                        fn: function() {
                        }
                    });
                }
            }
        });
    },
    onCancelClick: function(btn) {
        Ext.getCmp('vZoneMasterFile-dataEntry-win').close();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onClearInputs: function() {
        Ext.getCmp('vZoneMasterFile-Airport').setValue('');
        Ext.getCmp('vZoneMasterFile-Zone').setValue('');
    },
    getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp('vZoneMasterFile-Airport').setValue(rec.get('ATOS').trim());
        Ext.getCmp('vZoneMasterFile-Zone').setValue(rec.get('ZONA').trim());

        Ext.getCmp('vZoneMasterFile-USCR').setValue(rec.get('USCR'));
        Ext.getCmp('vZoneMasterFile-FECR').setValue(rec.get('FECR'));
        Ext.getCmp('vZoneMasterFile-HOCR').setValue(rec.get('HOCR'));
        Ext.getCmp('vZoneMasterFile-USUP').setValue(rec.get('USUP'));
        Ext.getCmp('vZoneMasterFile-FEUP').setValue(rec.get('FEUP'));
        Ext.getCmp('vZoneMasterFile-HOUP').setValue(rec.get('HOUP'));

    }



});

