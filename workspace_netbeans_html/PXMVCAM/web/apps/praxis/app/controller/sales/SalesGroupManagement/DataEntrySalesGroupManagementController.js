/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesGroupManagement.DataEntrySalesGroupManagementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/SalesGroupManagement',
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
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                if(this.p.rec.data.ESTADO === 'Error'){
                    Ext.getCmp(prototype.id+'-btn-delete').show();
                }else{
                    Ext.getCmp(prototype.id+'-btn-delete').hide();
                }
                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    }
    ,
    setStoreData: function() {
        var cbxModulo = Ext.getCmp(prototype.id + '-de-cbxModulo');
        cbxModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "(Select)"],
                ["PFLOWN", "Flown Accounting"],
                ["PPFLOWN", "Flown Accounting Pending"]
            ]}));
        cbxModulo.setValue("");
    },
    onUpdateClick: function(btn) {
    }
    ,
    onSaveClick: function(btn) {
        var module = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        var date = Ext.getCmp(prototype.id + '-de-txtProcessDate');
        var msj = '';
        if (module === '') {
            msj = 'Select Module.';
        } else {
            if (date.getValue() === null) {
                msj = 'Enter correct data';
            } else {
                if (!date.isValid()) {
                    msj = 'Enter correct data';
                }
            }
        }
        
        if (msj === '') {
            switch (module) {
                case "PFLOWN" : 
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
                case "PPFLOWN" :
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
                                this.crudPending();
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
        var cbxModulo = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        
        switch (cbxModulo) {
            case "PFLOWN" : 
                dataentryParams = {};
                dataentryParams.IN_MODULO = 'FLOWN';
                dataentryParams.IN_FECHA_PROCESO = this.p.rec.get('A1955FPROC');
                this.setReverse(this.p.rec);
                break;
            case "PPFLOWN" :
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
                            this.crudPending();
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
            url: this.url + '/mantenimiento',
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
                        Ext.getCmp('DataEntrySalesGroupManagementForm').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    },
    crudPending: function() {
        var rec = this.p.rec;
        var strOption = this.p.action;
        //console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/MaintancePendingFlown',
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
                        Ext.getCmp('DataEntrySalesGroupManagementForm').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    }
    ,
    getDataEntryValues: function(strOption) {

        var A1955MODUL = Ext.getCmp(prototype.id + '-de-cbxModulo').getValue();
        var IN_ENVIO = Ext.getCmp(prototype.id + '-de-chkConsistencia').getValue();
        var IN_FECHA_PROCESO = Ext.getCmp(prototype.id + '-de-txtProcessDate').getValue();
        IN_FECHA_PROCESO = Ext.util.Format.date(IN_FECHA_PROCESO, 'Ymd');

        console.log("A1955MODUL : " + A1955MODUL);
        console.log("IN_ENVIO : " + IN_ENVIO);
        console.log("IN_FECHA_PROCESO : " + IN_FECHA_PROCESO);

        return {
            strOption: strOption,
            A1955MODUL: A1955MODUL,
            IN_ENVIO: IN_ENVIO,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO
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

        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1955USRIN'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1955FECIN'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1955HORIN'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1955USRAC'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1955FECAC'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1955HORAC'));

    },    
    setReverse: function(objDT){
        //console.log(objDT.data);        
        
        /*Ext.create('Ext.Praxis.view.sales.SalesGroupManagementForm.DataEntryReverse', {
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
            //beforerequest: Ext.getCmp('DataEntrySalesGroupManagement2Form').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res);
                if (res.success) {                    
                    Ext.create('Ext.Praxis.view.sales.SalesGroupManagementForm.DataEntryReverse', {
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
                //Ext.getCmp('DataEntrySalesGroupManagement2Form').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                //Ext.getCmp('DataEntrySalesGroupManagement2Form').unmask();
            }
        });
    },
});


