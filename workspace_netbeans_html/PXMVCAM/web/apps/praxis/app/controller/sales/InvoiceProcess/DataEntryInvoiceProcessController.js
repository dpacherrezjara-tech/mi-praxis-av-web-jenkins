/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.InvoiceProcess.DataEntryInvoiceProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/InvoiceProcess',
    p: {},
    dataentryParams: {},
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
        this.p = this.view.params;
        this.setStoreData();
        
        switch (this.p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                this.view.setHeight(this.view.getHeight());
                break;
        }
    }
    ,
    setStoreData: function() {
        var cbxModulo = Ext.getCmp(prototype.id + '-de-cbxModulo');
        cbxModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "(Select)"],
                ["PINVOICE", "Invoice Process"]
            ]}));
        cbxModulo.setValue("");
    },
    onUpdateClick: function(btn) {
    }
    ,
    onSaveClick: function(btn) {
        var module = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        var date = Ext.getCmp(prototype.id + '-de-txtProcessDate');
        var IN_SEQ = Ext.getCmp(prototype.id + '-de-txtSEQ').getValue();
        var msj = '';
        if (module === '') {
            msj = 'Select Module.';
        } else {
            if (date.getValue() === null) {
                msj = 'Enter correct date';
            } else {
                if (!date.isValid()) {
                    msj = 'Enter correct date';
                } else {
                    if (IN_SEQ.trim() === '') {
                        msj = 'Enter SEQ';
                    }
                }
            }
        }
        
        if (msj === '') {
            switch (module) {
                case "PINVOICE" : 
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
                    break;          
            }                              
        } else {
            global.Msg({
                msg: msj
            });
        }
    }
    ,
    onDeleteClick: function(btn){
        var module = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        
        switch (module) {
            case "PINVOICE" : 
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
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
                break;          
        }                   
    },
    crud: function() {
        var rec = this.p.rec;
        var strOption = this.p.action;
        //console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.result;
                //console.log(result);
                global.Msg({
                    msg: result,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryInvoiceProcessForm').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    },
    getDataEntryValues: function(strOption) {

        var A1955MODUL = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        var IN_ENVIO = Ext.getCmp(prototype.id + '-de-chkConsistencia').getValue();
        var IN_FECHA_PROCESO = Ext.getCmp(prototype.id + '-de-txtProcessDate').getValue();
        
        var IN_SEQ = Ext.getCmp(prototype.id + '-de-txtSEQ').getValue();
        var IN_SEQREG = Ext.getCmp(prototype.id + '-de-txtSEQREG').getValue();
        
        IN_FECHA_PROCESO = Ext.util.Format.date(IN_FECHA_PROCESO, 'Ymd');

        console.log("A1955MODUL : " + A1955MODUL);
        console.log("IN_ENVIO : " + IN_ENVIO);
        console.log("IN_FECHA_PROCESO : " + IN_FECHA_PROCESO);
        console.log("IN_SEQ : " + IN_SEQ);
        console.log("IN_SEQREG : " + IN_SEQREG);

        return {
            strOption: strOption,
            A1955MODUL: A1955MODUL,
            IN_ENVIO: IN_ENVIO,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            IN_SEQ: IN_SEQ,
            IN_SEQREG: IN_SEQREG
        };
    }
    ,
    onCancelClick: function(btn) {
        this.view.close();
    }
    ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    getDataInputs: function() {
        var rec = this.p.rec;

        Ext.getCmp(prototype.id + '-de-cbxModulo').setValue(rec.get('A1955MODUL').trim());
        var fecha = rec.get('A1955FPROC');
        var fecha = fecha.substring(0, 4) + '/' + fecha.substring(4, 6) + '/' + fecha.substring(6, 8);
        Ext.getCmp(prototype.id + '-de-txtProcessDate').setValue(fecha);
        
        Ext.getCmp(prototype.id + '-de-chkConsistencia').setValue(rec.get('A1955FUENT').trim()==="1" ? true : false);
        Ext.getCmp(prototype.id + '-de-txtSEQ').setValue(rec.get('IN_SEQ').trim());
        Ext.getCmp(prototype.id + '-de-txtSEQREG').setValue(rec.get('IN_SEQREG').trim());

        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1955USRIN'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1955FECIN'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1955HORIN'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1955USRAC'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1955FECAC'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1955HORAC'));

    },    
    setReverse: function(objDT){
        //console.log(objDT.data);        
        
        /*Ext.create('Ext.Praxis.view.sales.InvoiceProcessForm.DataEntryReverse', {
            id: prototype.id + '-dataEntryReverse',
            params: {
                //rec: res.data,
                obj: objDT.data
            }
        }).show();  */
        Ext.Ajax.request({
            url: prototype.url + '/searchReversa',
            method: 'POST',
            timeout: 60000000,
            params: dataentryParams,
            //beforerequest: Ext.getCmp('DataEntryInvoiceProcess2Form').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res);
                if (res.success) {                    
                    Ext.create('Ext.Praxis.view.sales.InvoiceProcessForm.DataEntryReverse', {
                        id: prototype.id + '-dataEntryReverse',
                        params: {
                            rec: res.data,
                            obj: objDT.data
                        }
                    }).show();                   
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                //Ext.getCmp('DataEntryInvoiceProcess2Form').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                //Ext.getCmp('DataEntryInvoiceProcess2Form').unmask();
            }
        });
    },
});


