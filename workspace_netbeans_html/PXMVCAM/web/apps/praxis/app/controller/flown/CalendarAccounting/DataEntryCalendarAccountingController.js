/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.CalendarAccounting.DataEntryCalendarAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/CalendarAccounting',
    aeropuertos: {},
    existAirport: false,
    aux: false,
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        console.log("URL : " + this.url);
        var p = this.view.params;
        this.setStoreData();

        switch (p.action) {
            case 'I':
                this.onClearInputs();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-txtA1980GL');
                Ext.getCmp(prototype.id + '-txtA1980GL').setValue(0);
                Ext.getCmp(prototype.id + '-txtA1980AR').setValue(0);
                Ext.getCmp(prototype.id + '-txtA1980AP').setValue(0);

                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();



                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreData: function () {

        var data = Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["0", "OPEN"],
                ["1", "CLOSED"]
            ]

        });
        var cmbGL = Ext.getCmp(prototype.id + '-txtA1980GL');
        cmbGL.bindStore(data);


        var cmbAR = Ext.getCmp(prototype.id + '-txtA1980AR');
        cmbAR.bindStore(data);
        cmbAR.setValue('0');

        var cmbAP = Ext.getCmp(prototype.id + '-txtA1980AP');
        cmbAP.bindStore(data);
        cmbAP.setValue('0');
    }

    ,
    onUpdateClick: function (btn) {
        var p = this.view.params;
        var params = this.validateFields();

        if (params.msj.trim() === '') {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        } else {
            global.Msg({
                msg: params.msj.trim(),
                fn: function () {
                    Ext.getCmp(prototype.id + params.focusCmp.trim()).focus(true);
                }
            });
        }



    }
    ,
    onDeleteClick: function (btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    validateFields: function () {
        console.clear();
        console.log(this.view.params)
        var params = {msj: '', focusCmp: ''};

        var action = this.view.params.action;
        if (action === 'U') {
            var data = this.view.params.rec.data;

            var A1980FECMX = data.A1980FECMX;
            var A1980FECPR = data.A1980FECPR;
            var A1980FECCO = data.A1980FECCO;
            var A1980HMXGL = data.A1980HMXGL;
            var A1980HPRGL = data.A1980HPRGL;
            var A1980HMXAR = data.A1980HMXAR;
            var A1980HPRAR = data.A1980HPRAR;
            var A1980HMXAP = data.A1980HMXAP;
            var A1980HPRAP = data.A1980HPRAP;


            var A1980GL = data.A1980GL;
            var A1980AR = data.A1980AR;
            var A1980AP = data.A1980AP;

            A1980GL = A1980GL === 'CLOSED' ? '1' : '0';
            A1980AR = A1980AR === 'CLOSED' ? '1' : '0';
            A1980AP = A1980AP === 'CLOSED' ? '1' : '0';

        } else {

            var A1980FECMX = Ext.getCmp(prototype.id + '-txtA1980FECMX').getValue();
            var A1980FECPR = Ext.getCmp(prototype.id + '-txtA1980FECPR').getValue();
            var A1980FECCO = Ext.getCmp(prototype.id + '-txtA1980FECCO').getValue();
            var A1980GL = Ext.getCmp(prototype.id + '-txtA1980GL').getValue();
            var A1980HMXGL = Ext.getCmp(prototype.id + '-txtA1980HMXGL').getValue();
            var A1980HPRGL = Ext.getCmp(prototype.id + '-txtA1980HPRGL').getValue();
            var A1980AR = Ext.getCmp(prototype.id + '-txtA1980AR').getValue();
            var A1980HMXAR = Ext.getCmp(prototype.id + '-txtA1980HMXAR').getValue();
            var A1980HPRAR = Ext.getCmp(prototype.id + '-txtA1980HPRAR').getValue();
            var A1980AP = Ext.getCmp(prototype.id + '-txtA1980AP').getValue();
            var A1980HMXAP = Ext.getCmp(prototype.id + '-txtA1980HMXAP').getValue();
            var A1980HPRAP = Ext.getCmp(prototype.id + '-txtA1980HPRAP').getValue();

        }
        var A1980FECIN = Ext.getCmp(prototype.id + '-txtA1980FECIN');
        var A1980FECFN = Ext.getCmp(prototype.id + '-txtA1980FECFN');

        if (A1980FECMX === null || A1980FECMX === '') {
            params.msj = 'Required Field, Calendar Date Mexico';
            params.focusCmp = '-txtA1980FECMX';
            return params;
        }
        if (A1980FECPR === null || A1980FECPR === '') {
            params.msj = 'Required Field, Calendar Date Praxis';
            params.focusCmp = '-txtA1980FECPR';
            return params;
        }
        if (A1980FECCO === null || A1980FECCO === '') {

            params.msj = 'Required Field, Accounting Date';
            params.focusCmp = '-txtA1980FECCO';
            return params;
        }

        //---------------------------- VALIDATE HOUR GL -------------------------------------------------------------------------
        if (A1980HMXGL !== null) {
            if (A1980HMXGL.length > 0) {
                if (A1980HMXGL.substr(2, 1) === ':' && A1980HMXGL.substr(5, 1) === ':' && A1980HMXGL.indexOf(":") === 2 && A1980HMXGL.lastIndexOf(":") === 5) {
                    A1980HMXGL = A1980HMXGL.replace(':', '').replace(':', '');
                    if (A1980HMXGL.length === 6) {
                        if (A1980HMXGL.substr(0, 2) > 23 || A1980HMXGL.substr(2, 2) > 59 || A1980HMXGL.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, Gl - Mexico';
                            params.focusCmp = '-txtA1980HMXGL';
                            return params;
                        }
                    } else {
                        params.msj = 'Time Invalid, Gl - Mexico';
                        params.focusCmp = '-txtA1980HMXGL';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, Gl - Mexico';
                    params.focusCmp = '-txtA1980HMXGL';
                    return params;
                }
            }
        }
        if (A1980HPRGL !== null) {
            if (A1980HPRGL.length > 0) {
                if (A1980HPRGL.substr(2, 1) === ':' && A1980HPRGL.substr(5, 1) === ':' && A1980HPRGL.indexOf(":") === 2 && A1980HPRGL.lastIndexOf(":") === 5) {
                    A1980HPRGL = A1980HPRGL.replace(':', '').replace(':', '');
                    if (A1980HPRGL.length === 6) {
                        if (A1980HPRGL.substr(0, 2) > 23 || A1980HPRGL.substr(2, 2) > 59 || A1980HPRGL.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, Gl - Praxis Local';
                            params.focusCmp = '-txtA1980HPRGL';
                            return params;

                        }
                    } else {
                        params.msj = 'Time Invalid, Gl - Praxis Local';
                        params.focusCmp = '-txtA1980HPRGL';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, Gl - Praxis Local';
                    params.focusCmp = '-txtA1980HPRGL';
                    return params;
                }
            }
        }
        if ((A1980HMXGL !== '' && A1980HPRGL === '') || (A1980HMXGL === '' && A1980HPRGL !== '')) {
            params.msj = 'Time Invalid Gl';
            params.focusCmp = '-txtA1980HMXGL';
            return params;
        }

        //---------------------------- VALIDATE HOUR AR -------------------------------------------------------------------------

        if (A1980HMXAR !== null) {
            if (A1980HMXAR.length > 0) {
                if (A1980HMXAR.substr(2, 1) === ':' && A1980HMXAR.substr(5, 1) === ':' && A1980HMXAR.indexOf(":") === 2 && A1980HMXAR.lastIndexOf(":") === 5) {
                    A1980HMXAR = A1980HMXAR.replace(':', '').replace(':', '');
                    if (A1980HMXAR.length === 6) {
                        if (A1980HMXAR.substr(0, 2) > 23 || A1980HMXAR.substr(2, 2) > 59 || A1980HMXAR.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, AR - Mexico';
                            params.focusCmp = '-txtA1980HMXAR';
                            return params;
                        }
                    } else {
                        params.msj = 'Time Invalid, AR - Mexico';
                        params.focusCmp = '-txtA1980HMXAR';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, AR - Mexico';
                    params.focusCmp = '-txtA1980HMXAR';
                    return params;
                }
            }
        }
        if (A1980HPRAR !== null) {
            if (A1980HPRAR.length > 0) {
                if (A1980HPRAR.substr(2, 1) === ':' && A1980HPRAR.substr(5, 1) === ':' && A1980HPRAR.indexOf(":") === 2 && A1980HPRAR.lastIndexOf(":") === 5) {
                    A1980HPRAR = A1980HPRAR.replace(':', '').replace(':', '');
                    if (A1980HPRAR.length === 6) {
                        if (A1980HPRAR.substr(0, 2) > 23 || A1980HPRAR.substr(2, 2) > 59 || A1980HPRAR.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, AR - Praxis Local';
                            params.focusCmp = '-txtA1980HPRAR';
                            return params;
                        }
                    } else {
                        params.msj = 'Time Invalid, AR - Praxis Local';
                        params.focusCmp = '-txtA1980HPRAR';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, AR - Praxis Local';
                    params.focusCmp = '-txtA1980HPRAR';
                    return params;
                }
            }
        }
        if ((A1980HMXAR !== '' && A1980HPRAR === '') || (A1980HMXAR === '' && A1980HPRAR !== '')) {
            params.msj = 'Time Invalid  AR ';
            params.focusCmp = '-txtA1980HMXAR';
            return params;
        }

        //---------------------------- VALIDATE HOUR AP -------------------------------------------------------------------------

        if (A1980HMXAP !== null) {
            if (A1980HMXAP.length > 0) {
                if (A1980HMXAP.substr(2, 1) === ':' && A1980HMXAP.substr(5, 1) === ':' && A1980HMXAP.indexOf(":") === 2 && A1980HMXAP.lastIndexOf(":") === 5) {
                    A1980HMXAP = A1980HMXAP.replace(':', '').replace(':', '');
                    if (A1980HMXAP.length === 6) {
                        if (A1980HMXAP.substr(0, 2) > 23 || A1980HMXAP.substr(2, 2) > 59 || A1980HMXAP.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, AP - Mexico';
                            params.focusCmp = '-txtA1980HMXAP';
                            return params;
                        }
                    } else {
                        params.msj = 'Time Invalid, AP - Mexico';
                        params.focusCmp = '-txtA1980HMXAP';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, AP - Mexico';
                    params.focusCmp = '-txtA1980HMXAP';
                    return params;
                }
            }
        }
        if (A1980HPRAP !== null) {
            if (A1980HPRAP.length > 0) {
                if (A1980HPRAP.substr(2, 1) === ':' && A1980HPRAP.substr(5, 1) === ':' && A1980HPRAP.indexOf(":") === 2 && A1980HPRAP.lastIndexOf(":") === 5) {
                    A1980HPRAP = A1980HPRAP.replace(':', '').replace(':', '');
                    if (A1980HPRAP.length === 6) {
                        if (A1980HPRAP.substr(0, 2) > 23 || A1980HPRAP.substr(2, 2) > 59 || A1980HPRAP.substr(4, 2) > 59) {
                            params.msj = 'Time Invalid, AP - Praxis Local';
                            params.focusCmp = '-txtA1980HPRAP';
                            return params;
                        }
                    } else {
                        params.msj = 'Time Invalid, AP - Praxis Local';
                        params.focusCmp = '-txtA1980HPRAP';
                        return params;
                    }
                } else {
                    params.msj = 'Time Invalid, AP - Praxis Local';
                    params.focusCmp = '-txtA1980HPRAP';
                    return params;
                }
            }
        }
        if ((A1980HMXAP !== '' && A1980HPRAP === '') || (A1980HMXAP === '' && A1980HPRAP !== '')) {
            params.msj = 'Time Invalid  AP ';
            params.focusCmp = '-txtA1980HMXAP';
            return params;
        }
        //---------------------------- VALIDATE PENDING DATE -------------------------------------------------------------------------
        console.log("---A1980FECIN :" + A1980FECIN.isValid());
        console.log("---A1980FECFN :" + A1980FECFN);



        if (A1980FECIN.isValid() === false || A1980FECFN.isValid() === false) {
            params.msj = 'Pending Date Invalid 1';
            params.focusCmp = '-txtA1980FECIN';
            return params;
        }

        A1980FECIN = Ext.getCmp(prototype.id + '-txtA1980FECIN').getValue();
        A1980FECFN = Ext.getCmp(prototype.id + '-txtA1980FECFN').getValue();

        console.log("---A1980FECIN :" + A1980FECIN);
        console.log("---A1980FECFN :" + A1980FECFN);
        if ((A1980FECIN !== null && A1980FECFN === null) || (A1980FECIN === null && A1980FECFN !== null)) {
            params.msj = 'Pending Date Invalid ';
            params.focusCmp = '-txtA1980FECIN';
            return params;
        }
            
//            COMENTADO A SOLICITUD DE AM - ROSAURA
//        if (A1980GL === '0' && A1980AR === '0' && A1980AP === '0' && A1980HMXGL !== '' &&
//                A1980HPRAR !== '' && A1980HMXAP !== '' && A1980FECIN === null && A1980FECFN === null) {
//            params.msj = 'The 3 Status are OPENED!!! Enter Pending Date';
//            params.focusCmp = '-txtA1980FECIN';
//            return params;
//
//        }

        if ((A1980GL === '1' || A1980AR === '1' || A1980AP === '1') && (A1980FECIN !== null || A1980FECFN !== null)) {
            params.msj = 'If any Status is CLOSED, Pending Date can not be enter';
            params.focusCmp = '-txtA1980FECIN';
            return params;
        }

        return params;
    }
    ,
    onSaveClick: function (btn) {


        var p = this.view.params;
        var params = this.validateFields();

        if (params.msj.trim() === '') {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        } else {
            global.Msg({
                msg: params.msj.trim(),
                fn: function () {
                    Ext.getCmp(prototype.id + params.focusCmp.trim()).focus(true);
                }
            });
        }
    }
    ,
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;

        console.log('opcion : ' + strOption);
        console.log(this.getDataEntryValues(strOption));
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                var icon = 1;
                if (msg.endsWith('Already Exists')) {
                    icon = 2;
                }
                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function () {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close()
                    }
                });
            }
        });
    },
    getDataEntryValues: function (strOption) {

        var A1980FECMX = Ext.getCmp(prototype.id + '-txtA1980FECMX').getRawValue();
        var A1980FECPR = Ext.getCmp(prototype.id + '-txtA1980FECPR').getRawValue();
        var A1980FECCO = Ext.getCmp(prototype.id + '-txtA1980FECCO').getRawValue();
        var A1980GL = Ext.getCmp(prototype.id + '-txtA1980GL').getValue();
        var A1980HMXGL = Ext.getCmp(prototype.id + '-txtA1980HMXGL').getValue();
        var A1980HPRGL = Ext.getCmp(prototype.id + '-txtA1980HPRGL').getValue();
        var A1980AR = Ext.getCmp(prototype.id + '-txtA1980AR').getValue();
        var A1980HMXAR = Ext.getCmp(prototype.id + '-txtA1980HMXAR').getValue();
        var A1980HPRAR = Ext.getCmp(prototype.id + '-txtA1980HPRAR').getValue();
        var A1980AP = Ext.getCmp(prototype.id + '-txtA1980AP').getValue();
        var A1980HMXAP = Ext.getCmp(prototype.id + '-txtA1980HMXAP').getValue();
        var A1980HPRAP = Ext.getCmp(prototype.id + '-txtA1980HPRAP').getValue();
        var A1980FECIN = Ext.getCmp(prototype.id + '-txtA1980FECIN').getRawValue();
        var A1980FECFN = Ext.getCmp(prototype.id + '-txtA1980FECFN').getRawValue();
        
        if(A1980HMXGL==='00:00:00') A1980HMXGL = '';
        if(A1980HPRGL==='00:00:00') A1980HPRGL = '';
        if(A1980HMXAR==='00:00:00') A1980HMXAR = '';
        if(A1980HPRAR==='00:00:00') A1980HPRAR = '';
        if(A1980HMXAP==='00:00:00') A1980HMXAP = '';
        if(A1980HPRAP==='00:00:00') A1980HPRAP = '';
        
        console.log(A1980GL);
        if (A1980GL === 'OPEN' || A1980GL==='0' ) {
            A1980GL = '0';
        } else {
            A1980GL = '1';
        }
        if (A1980AR === 'OPEN' || A1980AR==='0') {
            A1980AR = '0';
        } else {
            A1980AR = '1';
        }
        if (A1980AP === 'OPEN'|| A1980AP==='0') {
            A1980AP = '0';
        } else {
            A1980AP = '1';
        }
        return {
            strOption: strOption,
            A1980FECMX: A1980FECMX,
            A1980FECPR: A1980FECPR,
            A1980FECCO: A1980FECCO,
            A1980GL: A1980GL,
            A1980HMXGL: A1980HMXGL,
            A1980HPRGL: A1980HPRGL,
            A1980AR: A1980AR,
            A1980HMXAR: A1980HMXAR,
            A1980HPRAR: A1980HPRAR,
            A1980AP: A1980AP,
            A1980HMXAP: A1980HMXAP,
            A1980HPRAP: A1980HPRAP,
            A1980FECIN: A1980FECIN,
            A1980FECFN: A1980FECFN
        };
    }
    ,
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    onClearInputs: function () {
        Ext.getCmp(prototype.id + '-txtA1980FECMX').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980FECPR').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980FECCO').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980GL').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HMXGL').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HPRGL').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980AR').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HMXAR').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HPRAR').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980AP').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HMXAP').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980HPRAP').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980FECIN').setValue('');
        Ext.getCmp(prototype.id + '-txtA1980FECFN').setValue('');

    }
    , getDataInputs: function () {
        var p = this.view.params;
        var rec = p.rec;


        Ext.getCmp(prototype.id + '-txtA1980FECMX').setValue(rec.get('A1980FECMX'));
        Ext.getCmp(prototype.id + '-txtA1980FECPR').setValue(rec.get('A1980FECPR'));

        Ext.getCmp(prototype.id + '-txtA1980FECCO').setValue(rec.get('A1980FECCO'));
        Ext.getCmp(prototype.id + '-txtA1980GL').setValue(rec.get('A1980GL'));
        Ext.getCmp(prototype.id + '-txtA1980HMXGL').setValue(rec.get('A1980HMXGL'));

        Ext.getCmp(prototype.id + '-txtA1980HPRGL').setValue(rec.get('A1980HPRGL'));

        Ext.getCmp(prototype.id + '-txtA1980AR').setValue(rec.get('A1980AR'));
        Ext.getCmp(prototype.id + '-txtA1980HMXAR').setValue(rec.get('A1980HMXAR'));
        Ext.getCmp(prototype.id + '-txtA1980HPRAR').setValue(rec.get('A1980HPRAR'));
        Ext.getCmp(prototype.id + '-txtA1980AP').setValue(rec.get('A1980AP'));

        Ext.getCmp(prototype.id + '-txtA1980HMXAP').setValue(rec.get('A1980HMXAP'));
        Ext.getCmp(prototype.id + '-txtA1980HPRAP').setValue(rec.get('A1980HPRAP'));
        Ext.getCmp(prototype.id + '-txtA1980FECIN').setValue(rec.get('A1980FECIN'));
        Ext.getCmp(prototype.id + '-txtA1980FECFN').setValue(rec.get('A1980FECFN'));



        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1980REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1980FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1980HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1980REVIS'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1980FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1980HREVI'));

    }



});


