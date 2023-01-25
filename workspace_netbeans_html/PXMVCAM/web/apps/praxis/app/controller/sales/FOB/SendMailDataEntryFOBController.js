/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.FOB.SendMailDataEntryFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-sendMailDataEntryController',
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

        Ext.Ajax.request({
            url: this.url + '/loadDataMail',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            beforerequest: Ext.getCmp(prototype.id + '-sendMailDataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                //console.log(data);
                Ext.getCmp(prototype.id + '-sendMailDataEntry').unmask('Loading...', '');
                var elemento = data[0];
                Ext.getCmp(prototype.id + '-sm-txtA1728IATA').setValue(elemento.A1728IATA.trim());
                Ext.getCmp(prototype.id + '-sm-txtA003KEY3').setValue(elemento.A003KEY1.trim());
                Ext.getCmp(prototype.id + '-sm-txtA1728LOTE').setValue(elemento.A1728LOTE.trim());
                Ext.getCmp(prototype.id + '-sm-txtA1728FUENT').setValue(elemento.A1728FUENT.trim());
                Ext.getCmp(prototype.id + '-sm-txtA1728FINI').setValue(elemento.A1728FINI.trim());
                Ext.getCmp(prototype.id + '-sm-txtA1728FFIN').setValue(elemento.A1728FFIN.trim());
                Ext.getCmp(prototype.id + '-sm-txtA003MAIL').setValue(elemento.A003MAIL.trim());
                Ext.getCmp(prototype.id + '-sm-txtEmailCcp').setValue(elemento.EmailCcp.trim());
                Ext.getCmp(prototype.id + '-sm-txtAsunto').setValue(elemento.Asunto.trim());

            }
        });
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
    onSendClick: function(btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send Mail?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.sendMail();
                }
            }
        });

    },
    sendMail: function() {

        var VP_ACTION = 'U';
        var VP_A1757CCUST = '139';
        var VP_A1757IATA = Ext.getCmp(prototype.id + '-sm' + '-txtA1728IATA').getValue();
        var VP_A1757LOTE = Ext.getCmp(prototype.id + '-sm' + '-txtA1728LOTE').getValue();
        var VP_TIPO_ENVIO = '2';

        Ext.Ajax.request({
            url: this.url + '/sendMail',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_ACTION: VP_ACTION,
                VP_A1757CCUST: VP_A1757CCUST,
                VP_A1757IATA: VP_A1757IATA,
                VP_A1757LOTE: VP_A1757LOTE,
                VP_TIPO_ENVIO: VP_TIPO_ENVIO
            },
            beforerequest: Ext.getCmp(prototype.id + '-sendMailDataEntry').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-sendMailDataEntry').unmask('Loading...', '');

                var res = Ext.JSON.decode(response.responseText);
                global.Msg({
                    msg: res.MESSAGE,
                    icon: 1,
                    fn: function() {
                        Ext.getCmp(prototype.id + '-sendMailDataEntry').close();
                    }
                });
            }
        });
    },
    onCancelClick: function() {
        Ext.getCmp(prototype.id + '-sendMailDataEntry').close();
    }


});


