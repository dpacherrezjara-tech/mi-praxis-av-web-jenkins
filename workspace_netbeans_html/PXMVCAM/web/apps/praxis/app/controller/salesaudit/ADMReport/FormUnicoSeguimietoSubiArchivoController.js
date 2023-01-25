/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.FormUnicoSeguimietoSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormUnicoSeguimietoSubiArchivoController',
    BeanSave: {},
    BeanInitial: {},
    Combo: '',
    Botones: '',
    urlWin01: CONTEXTPATH + '/ADMReport',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
        //me.setStoresFilters();
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        if (String(this.view.params.action) === 'CAMBIOS') {
            me.cargaIniDatos();
        } else {
            me.cargaDatos();
        }

        //alert('novo '+rec.get('A2548FTE'));
        // console.log(this.view.params)
        //this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        me.BeanInitial = rec;
        var cmbStatus = Ext.getCmp(prototype.id5 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id5 + '-ComboStatus2');
        var cmbStatus3 = Ext.getCmp(prototype.id5 + '-ComboStatus3');
        var cmbStatus4 = Ext.getCmp(prototype.id5 + '-ComboStatus4');
        var cmbStatus5 = Ext.getCmp(prototype.id5 + '-ComboStatus5');
        var cmbStatus6 = Ext.getCmp(prototype.id5 + '-ComboStatus6');
        var cmbStatus7 = Ext.getCmp(prototype.id5 + '-ComboStatus6');

        Ext.getCmp(prototype.id5 + '-MemoNumber').setValue(rec.A2548NMEMO);
        Ext.getCmp(prototype.id5 + '-Service').setValue(rec.A2548REGIS);
        Ext.getCmp(prototype.id5 + '-Save').show();

        if (Ext.String.trim(rec.A2548NMEMO) !== '') {
            if (Ext.String.trim(rec.A2548FTE) === 'BSP') {
                if (Ext.String.trim(rec.A2548FLAG) === 'P' || Ext.String.trim(rec.A2548FLAG) === 'I') {
                    cmbStatus.hide();
                    cmbStatus2.hide();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.show();
                    cmbStatus7.hide();
                    me.Combo = '6';
                } else if (Ext.String.trim(rec.A2548FLAG) === 'E' || Ext.String.trim(rec.A2548FLAG) === 'W') {
                    cmbStatus.hide();
                    cmbStatus2.hide();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.hide();
                    cmbStatus7.hide();
                    me.Combo = '';
                } else if (Ext.String.trim(rec.A2548FLAG) !== 'D') {
                    cmbStatus.hide();
                    cmbStatus2.show();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.hide();
                    cmbStatus7.hide();
                    me.Combo = '2';
                }
            } else if (Ext.String.trim(rec.A2548FTE) === 'ARC') {
                cmbStatus.hide();
                cmbStatus2.show();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '2';

            } else if (Ext.String.trim(rec.A2548FTE) === 'ASR' || Ext.String.trim(rec.A2548FTE) === 'MAN') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '';
            }
        } else {
            if (Ext.String.trim(rec.A2548FTE) === 'BSP') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.show();
                me.Combo = '7';
            } else if (Ext.String.trim(rec.A2548FTE) === 'ARC') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.show();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '3';
            } else if (Ext.String.trim(rec.A2548FTE) === 'ASR' || Ext.String.trim(rec.A2548FTE) === 'MAN') {
                cmbStatus.show();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '1';
            }
        }


        if (Ext.String.trim(rec.A2548FLAG) === 'X' || Ext.String.trim(rec.A2548FLAG) === 'R' || Ext.String.trim(rec.A2548FLAG) === 'N' || Ext.String.trim(rec.A2548FLAG) === 'B' || Ext.String.trim(rec.A2548FLAG) === 'C') {
            cmbStatus.hide();
            cmbStatus2.hide();
            cmbStatus3.hide();
            cmbStatus4.hide();
            cmbStatus5.hide();
            cmbStatus6.hide();
            cmbStatus7.hide();
            me.Combo = '';
            Ext.getCmp(prototype.id5 + '-Save').hide();
        }
        if (Ext.String.trim(rec.A2548NMEMO) !== '' && Ext.String.trim(rec.A2548FTE) === 'BSP' && Ext.String.trim(rec.A2548NMERF) !== '') {
            if ((Ext.String.trim(rec.A2548FLAG) === 'E' || Ext.String.trim(rec.A2548FLAG) === 'W' || Ext.String.trim(rec.A2548FLAG) === 'A')) {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.show();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '5';
                Ext.getCmp(prototype.id5 + '-Save').show();
            }

        }




    },
    cargaIniDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        me.BeanInitial = rec;
        var cmbStatus = Ext.getCmp(prototype.id5 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id5 + '-ComboStatus2');
        var cmbStatus3 = Ext.getCmp(prototype.id5 + '-ComboStatus3');
        var cmbStatus4 = Ext.getCmp(prototype.id5 + '-ComboStatus4');
        var cmbStatus5 = Ext.getCmp(prototype.id5 + '-ComboStatus5');
        var cmbStatus6 = Ext.getCmp(prototype.id5 + '-ComboStatus6');
        var cmbStatus7 = Ext.getCmp(prototype.id5 + '-ComboStatus6');

        Ext.getCmp(prototype.id5 + '-MemoNumber').setValue(rec.get('A2548NMEMO'));
        Ext.getCmp(prototype.id5 + '-Service').setValue(rec.get('A2548REGIS'));
        Ext.getCmp(prototype.id5 + '-Save').show();

        if (Ext.String.trim(rec.get('A2548NMEMO')) !== '') {
            if (Ext.String.trim(rec.get('A2548FTE')) === 'BSP') {
                if (Ext.String.trim(rec.get('A2548FLAG')) === 'P' && Ext.String.trim(rec.get('A2548FLAG')) === 'I' && Ext.String.trim(rec.get('A2548FLAG')) === 'D') {
                    cmbStatus.hide();
                    cmbStatus2.hide();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.show();
                    cmbStatus7.hide();
                    me.Combo = '6';
                } else if (Ext.String.trim(rec.get('A2548FLAG')) === 'E' || Ext.String.trim(rec.get('A2548FLAG')) === 'W') {
                    cmbStatus.hide();
                    cmbStatus2.hide();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.hide();
                    cmbStatus7.hide();
                    me.Combo = '';
                } else {
                    cmbStatus.hide();
                    cmbStatus2.show();
                    cmbStatus3.hide();
                    cmbStatus4.hide();
                    cmbStatus5.hide();
                    cmbStatus6.hide();
                    cmbStatus7.hide();
                    me.Combo = '2';
                }
            } else if (Ext.String.trim(rec.get('A2548FTE')) === 'ARC') {
                cmbStatus.hide();
                cmbStatus2.show();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '2';

            } else if (Ext.String.trim(rec.get('A2548FTE')) === 'ASR' || Ext.String.trim(rec.get('A2548FTE')) === 'MAN') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '';
            }
        } else {
            if (Ext.String.trim(rec.get('A2548FTE')) === 'BSP') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.show();
                me.Combo = '7';
            } else if (Ext.String.trim(rec.get('A2548FTE')) === 'ARC') {
                cmbStatus.hide();
                cmbStatus2.hide();
                cmbStatus3.show();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '3';
            } else if (Ext.String.trim(rec.get('A2548FTE')) === 'ASR' || Ext.String.trim(rec.get('A2548FTE')) === 'MAN') {
                cmbStatus.show();
                cmbStatus2.hide();
                cmbStatus3.hide();
                cmbStatus4.hide();
                cmbStatus5.hide();
                cmbStatus6.hide();
                cmbStatus7.hide();
                me.Combo = '1';
            }
        }


        if (Ext.String.trim(rec.get('A2548FLAG')) === 'X' || Ext.String.trim(rec.get('A2548FLAG')) === 'R' || Ext.String.trim(rec.get('A2548FLAG')) === 'N' || Ext.String.trim(rec.get('A2548FLAG')) === 'B' || Ext.String.trim(rec.get('A2548FLAG')) === 'C') {
            cmbStatus.hide();
            cmbStatus2.hide();
            cmbStatus3.hide();
            cmbStatus4.hide();
            cmbStatus5.hide();
            cmbStatus6.hide();
            cmbStatus7.hide();
            me.Combo = '';
            Ext.getCmp(prototype.id5 + '-Save').hide();
        }
        if (Ext.String.trim(rec.get('A2548NMEMO')) !== '' && Ext.String.trim(rec.get('A2548FTE')) === 'BSP' && Ext.String.trim(rec.get('A2548NMERF')) !== '' && (Ext.String.trim(rec.get('A2548FLAG')) === 'D' || Ext.String.trim(rec.get('A2548FLAG')) === 'E' || Ext.String.trim(rec.get('A2548FLAG')) === 'W' || Ext.String.trim(rec.get('A2548FLAG')) === 'A')) {
            cmbStatus.hide();
            cmbStatus2.hide();
            cmbStatus3.hide();
            cmbStatus4.hide();
            cmbStatus5.show();
            cmbStatus6.hide();
            cmbStatus7.hide();
            me.Combo = '5';
            Ext.getCmp(prototype.id5 + '-Save').show();
        }




    },
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.id5 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id5 + '-ComboStatus2');
        var cmbStatus3 = Ext.getCmp(prototype.id5 + '-ComboStatus3');
        var cmbStatus4 = Ext.getCmp(prototype.id5 + '-ComboStatus4');
        var cmbStatus5 = Ext.getCmp(prototype.id5 + '-ComboStatus5');
        var cmbStatus6 = Ext.getCmp(prototype.id5 + '-ComboStatus6');
        var cmbStatus7 = Ext.getCmp(prototype.id5 + '-ComboStatus7');

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "AP", "name": "Approved"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"},
                {"code": "PA", "name": "Billed"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"},
                {"code": "JU", "name": "Justified"},
                {"code": "AI", "name": "Reaudited"}
            ]
        }));

        cmbStatus2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"},
                {"code": "PA", "name": "Billed"},
                {"code": "PI", "name": "Billed GDS"},
                {"code": "DI", "name": "Disputed"}
            ]
        }));

        cmbStatus3.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "AP", "name": "Approved"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"},
                {"code": "JU", "name": "Justified"},
                {"code": "AI", "name": "Reaudited"}
            ]
        }));

        cmbStatus4.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "AP", "name": "Approved"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"},
                {"code": "JU", "name": "Justified"},
                {"code": "AI", "name": "Reaudited"}
            ]
        }));

        cmbStatus5.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "JU", "name": "Justified"}
            ]
        }));

        cmbStatus6.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"}
                
            ]
        }));
        cmbStatus7.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"},
                {"code": "JU", "name": "Justified"},
                {"code": "AI", "name": "Reaudited"}
            ]
        }));


    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onClickSave: function (btn) {
        var me = this;
        var cmbStatus1 = Ext.getCmp(prototype.id5 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id5 + '-ComboStatus2');
        var cmbStatus3 = Ext.getCmp(prototype.id5 + '-ComboStatus3');
        var cmbStatus4 = Ext.getCmp(prototype.id5 + '-ComboStatus4');
        var cmbStatus5 = Ext.getCmp(prototype.id5 + '-ComboStatus5');
        var cmbStatus6 = Ext.getCmp(prototype.id5 + '-ComboStatus6');
        var cmbStatus7 = Ext.getCmp(prototype.id5 + '-ComboStatus7');
        var ComboStatus = '';
        if (me.Combo !== '') {
            if (me.Combo === '1') {
                ComboStatus = cmbStatus1.getValue();
            }
            if (me.Combo === '2') {
                ComboStatus = cmbStatus2.getValue();
            }
            if (me.Combo === '3') {
                ComboStatus = cmbStatus3.getValue();
            }
            if (me.Combo === '4') {
                ComboStatus = cmbStatus4.getValue();
            }
            if (me.Combo === '5') {
                ComboStatus = cmbStatus5.getValue();
            }
            if (me.Combo === '6') {
                ComboStatus = cmbStatus6.getValue();
            }
            if (me.Combo === '7') {
                ComboStatus = cmbStatus7.getValue();
            }
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Status');
            return;
        }
        if (Ext.getCmp(prototype.id5 + '-Argument').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter issue reason", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id5 + '-Argument').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.id5 + '-Argument').getValue() !== '') {
            if (Ext.getCmp(prototype.id5 + '-Argument').getValue().length > 200) {
                Ext.MessageBox.alert('PRAXIS', "The Argument must not exceed 500 characters", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id5 + '-Argument').focus();", 100);
                });
                return;
            }

        }

        if (String(this.view.params.action) === 'CAMBIOS') {

            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'A' && ComboStatus === 'AP') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'D' && ComboStatus === 'DI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'J' && ComboStatus === 'JU') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'N' && ComboStatus === 'RE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'R' && ComboStatus === 'AI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'E' && ComboStatus === 'DE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'Z' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'Y' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'C' && ComboStatus === 'CO') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'I' && ComboStatus === 'PI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'P' && ComboStatus === 'PI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.get('A2548FLAG')) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }

            me.BeanSave.A2553NMEMO = me.BeanInitial.get('A2548CNXPA');
            me.BeanSave.A2553DESCR = Ext.getCmp(prototype.id5 + '-Argument').getValue();
            me.BeanSave.A2553PAIS = me.BeanInitial.get('A2548PAIS');
            me.BeanSave.A2553STAT = ComboStatus;
            me.BeanSave.A2553TRNCU = "ADM";
            me.BeanSave.A2553FOLIO = Ext.getCmp(prototype.id5 + '-Folio').getValue();
        } else {
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'A' && ComboStatus === 'AP') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'D' && ComboStatus === 'DI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'J' && ComboStatus === 'JU') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'N' && ComboStatus === 'RE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'R' && ComboStatus === 'AI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'E' && ComboStatus === 'DE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'Z' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'Y' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'C' && ComboStatus === 'CO') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'I' && ComboStatus === 'PI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'P' && ComboStatus === 'PI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (Ext.String.trim(me.BeanInitial.A2548FLAG) === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }


            me.BeanSave.A2553NMEMO = me.BeanInitial.A2548CNXPA;
            me.BeanSave.A2553DESCR = Ext.getCmp(prototype.id5 + '-Argument').getValue();
            me.BeanSave.A2553PAIS = me.BeanInitial.A2548PAIS;
            me.BeanSave.A2553STAT = ComboStatus;
            me.BeanSave.A2553TRNCU = "ADM";
            me.BeanSave.A2553FOLIO = Ext.getCmp(prototype.id5 + '-Folio').getValue();
        }




        if (Ext.getCmp(prototype.id5 + '-File').getValue() !== '' || Ext.getCmp(prototype.id5 + '-File2').getValue() !== '' || Ext.getCmp(prototype.id5 + '-File3').getValue() !== '') {

            var File = Ext.getCmp(prototype.id5 + '-File').getValue();
            if (File !== '') {
                File = File.replace(/C:\\fakepath\\/g, '');
                if (File.length > 40) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The file name total must not exceed 40 characters');
                    return;
                }
            }
            var form = Ext.getCmp(prototype.id5 + '-form-01').getForm();
            form.submit({
                url: me.urlWin01 + '/insertTracingFile/',
                waitMsg: 'Uploading your sure to upload the file...',
                params: {beanString: JSON.stringify(me.BeanSave)},
                success: function (fp, o) {
                    var res = Ext.decode(o.response.responseText);
                    Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.result + '" has been uploaded.');
                    var vp_icon = 0;
                    if (res.result === 'The record was saved successfully.') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                            if (vp_icon === 1) {
                                Ext.getCmp(prototype.id4 + '-win').getController().SerechDatos();
                                Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                Ext.getCmp(prototype.id5 + '-win').close();

                            }


                        }});
                }
            });
        } else {
            global.Msg({
                msg: 'Insert Data?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id5 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/insertTracing/',
                            params: {beanString: JSON.stringify(me.BeanSave)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.result === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id4 + '-win').getController().SerechDatos();
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                            Ext.getCmp(prototype.id5 + '-win').close();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });

        }


    }
});

