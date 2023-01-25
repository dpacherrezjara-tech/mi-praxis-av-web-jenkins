/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.FOB.DataEntryAcuseFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-acuseFOBDataEntryController',
    url: CONTEXTPATH + '/FOB',
    meSm: '',
    /**
     * Constructor
     */
    init: function(view) {
        prototype.id = 'FOBForm';
        prototype.url = CONTEXTPATH + '/FOB';
        meSm = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        var data = p.rec;

        Ext.getCmp(prototype.id + '-ar-txtA1728IATA').setValue(data.A1728IATA.trim());
        Ext.getCmp(prototype.id + '-ar-txtA003KEY3').setValue(data.A003KEY3.trim());
        Ext.getCmp(prototype.id + '-ar-txtA1728LOTE').setValue(data.A1728LOTE.trim());
        Ext.getCmp(prototype.id + '-ar-txtA1728FUENT').setValue(data.A1728FUENT.trim());


    },
    getDataEntryValues: function() {

        var p = this.view.params;
        var data = p.rec;
        var VP_A1728CCUST = data.A1728CCUST;
        var VP_A1728IATA = data.A1728IATA;
        var VP_A1728LOTE = data.A1728LOTE;

        return {
            VP_A1728CCUST: VP_A1728CCUST,
            VP_A1728IATA: VP_A1728IATA,
            VP_A1728LOTE: VP_A1728LOTE
        };
    },
    onUpdateClick: function(btn) {



        var VP_ACTION = 'U';
        var VP_A1728CCUST = '139';
        var VP_A1728IATA = Ext.getCmp(prototype.id + '-ar-txtA1728IATA').getValue();
        var VP_A1728LOTE = Ext.getCmp(prototype.id + '-ar-txtA1728LOTE').getValue();
        var VP_A1728FACUS = Ext.util.Format.date(Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').getValue(), 'Ymd');
        var VP_A1728HACUS = Ext.getCmp(prototype.id + '-ar-txtA1728HACUS').getValue();

        if (VP_A1728FACUS.trim() === '') {
            Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').focus();
            global.Msg({
                msg: 'Required Field, DATE '
            });
            return;
        }
        if (VP_A1728HACUS.trim() === '') {
            Ext.getCmp(prototype.id + '-ar-txtA1728HACUS').focus();
            global.Msg({
                msg: 'Required Field, Time '
            });
            return;

        }
        var params = {
            VP_ACTION: VP_ACTION,
            VP_A1728CCUST: VP_A1728CCUST,
            VP_A1728LOTE: VP_A1728LOTE,
            VP_A1728IATA: VP_A1728IATA,
            VP_A1728FACUS: VP_A1728FACUS,
            VP_A1728HACUS: VP_A1728HACUS
        };

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Update Record?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.update(params);
                }
            }
        });

    },
    update: function(parameters) {

        Ext.Ajax.request({
            url: this.url + '/updateAcuse',
            method: 'POST',
            timeout: 60000000,
            params: parameters,
            beforerequest: Ext.getCmp(prototype.id + '-acuseFOBDataEntry').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-acuseFOBDataEntry').unmask('Loading...', '');

                var res = Ext.JSON.decode(response.responseText);
                global.Msg({
                    msg: res.MESSAGE,
                    icon: 1,
                    fn: function() {
                        Ext.getCmp(prototype.id + '-acuseFOBDataEntry').close();
                    }
                });
            }
        });
    },
    validarFechaAcuse: function() {
        var p = this.view.params;
        var data = p.rec;

        var FechaAcuse = Ext.util.Format.date(Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').getValue(), 'Ymd');
        var FechaEnvio = data.A1728FENV;
        var FechaEnvio = data.A1728FENV;
        var fecha = new Date();
        var fechaHoy = Ext.util.Format.date(fecha, 'Ymd');

        console.log(FechaAcuse);
        console.log(FechaEnvio);
        console.log(fechaHoy);


        if (FechaEnvio > FechaAcuse || FechaAcuse > fechaHoy) {
            if (FechaAcuse !== '') {
                global.Msg({
                    msg: "Invalid date, enter later or equal to the date of shipment date or a date not more today"
                });
                Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').setValue('');
                Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').focus();
            }
        }
    },
    validarHora: function() {
        var p = this.view.params;
        var data = p.rec;

        var txtA1728HACUS = Ext.getCmp(prototype.id + '-ar' + '-txtA1728HACUS').getValue();
        var FechaAcuse = Ext.util.Format.date(Ext.getCmp(prototype.id + '-ar-txtA1728FACUS').getValue(), 'Ymd');
        var hourAcuse = Ext.getCmp(prototype.id + '-ar' + '-txtA1728HACUS').getValue().replace(":", "").replace(":", "").replace(":", "");
        var FechaEnvio = data.A1728FENV;
        var hourSend = data.A1728HENV;
        hourAcuse = Ext.Number.parseInt(hourAcuse);
        hourSend = Ext.Number.parseInt(hourSend);


        if (txtA1728HACUS !== '') {
            if (FechaAcuse === FechaEnvio) {
                if (hourAcuse < hourSend) {
                    global.Msg({
                        msg: "Invalid Hour, enter later or equal to the Hour of send"
                    });
                }
            }
        }
    },
    onCancelClick: function() {
        Ext.getCmp(prototype.id + '-acuseFOBDataEntry').close();
    }


});


