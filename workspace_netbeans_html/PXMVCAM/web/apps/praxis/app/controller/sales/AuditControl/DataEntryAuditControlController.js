/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AuditControl.DataEntryAuditControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AuditControl',
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
            case 'U':
                this.getDataInputs();
                
                Ext.getCmp(prototype.id+'-de-cboModulo').disable(true);
                Ext.getCmp(prototype.id+'-de-txtProcessDate').disable(true);
                Ext.getCmp(prototype.id+'-de-txtSEQ').disable(true);
                
                Ext.getCmp(prototype.id + '-de-btn-save').show();
                Ext.getCmp(prototype.id + '-de-btn-delete').hide();
                this.view.setHeight(this.view.getHeight());
                break;
        }
        global.AccessControlMaganer();
    },
    setStoreData: function() {
        this.loadCombo();
        Ext.getCmp(prototype.id+'-de-cboModulo').setValue("");
        var cboEstado = Ext.getCmp(prototype.id + '-de-cboEstado');
        cboEstado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["1", "ACTIVE"],
                ["2", "COMPLEMENT"],
                ["3", "REPLACED"]
            ]}));
        cboEstado.setValue("1");
    },
    //<editor-fold defaultstate="collapsed" desc="loadCombo">
    loadCombo: function () {
        Ext.Ajax.request({
            url: prototype.url + '/loadModulo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask(),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                Ext.getBody().unmask();
                
                var lstModule = res.lstModule;
                //<editor-fold defaultstate="collapsed" desc="cboModulo">
                var module = new Array();
                module.push(['', 'All']);
                lstModule.forEach(function callback(currentValue, index, array) {
                    module.push([currentValue.SUB_MODULE, currentValue.LABEL]);
                });
                var store1 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'module', autoLoad: true, data: module, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-de-cboModulo').bindStore(store1);
                //</editor-fold>

            }
        });
    },
    //</editor-fold>
    onUpdateClick: function(btn) {
    },
    onSaveClick: function(btn) {
        var module = Ext.getCmp(prototype.id + '-de-cboModulo').getValue();
        var date = Ext.getCmp(prototype.id + '-de-txtProcessDate');
        var estado = Ext.getCmp(prototype.id + '-de-cboEstado').getValue();
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
                    if (estado.trim() === '') {
                        msj = 'Enter SEQ';
                    }
                }
            }
        }
        
        if (msj === '') {
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
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
        } else {
            global.Msg({
                msg: msj
            });
        }
    }
    ,
    onDeleteClick: function(btn){
                      
    },
    crud: function() {
        var rec = this.p.rec;
        var strOption = this.p.action;
        //console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption,rec),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.result;
                //console.log(result);
                global.Msg({
                    msg: result,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryAuditControlForm').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    },
    getDataEntryValues: function(strOption, rec) {
        var IN_MODULE = Ext.getCmp(prototype.id + '-de-cboModulo').getValue();
        var IN_PROC_DATE = Ext.getCmp(prototype.id + '-de-txtProcessDate').getValue();
        IN_PROC_DATE = Ext.util.Format.date(IN_PROC_DATE, 'Ymd');
        var IN_SEQ = Ext.getCmp(prototype.id + '-de-txtSEQ').getValue();
        var IN_STATUS = Ext.getCmp(prototype.id + '-de-cboEstado').getValue();

        console.log("IN_MODULE : " + rec.MODULE);
        console.log("IN_PROC_DATE : " + rec.PROC_DATE);
        console.log("IN_SEQ : " + rec.SEQ);
        
        return {
            strOption: strOption,
            IN_MODULE: rec.get('MODULE').trim(),
            IN_PROC_DATE: rec.get('PROC_DATE').trim(),
            IN_SEQ: rec.get('SEQ').trim(),
            IN_STATUS: IN_STATUS
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

        Ext.getCmp(prototype.id + '-de-cboModulo').setValue(rec.get('SUB_MODULE').trim());
        Ext.getCmp(prototype.id + '-de-txtSEQ').setValue(rec.get('SEQ').trim());
        var fecha = rec.get('PROC_DATE');
        var fecha = fecha.substring(0, 4) + '/' + fecha.substring(4, 6) + '/' + fecha.substring(6, 8);
        Ext.getCmp(prototype.id + '-de-txtProcessDate').setValue(fecha);
        
        Ext.getCmp(prototype.id + '-de-cboEstado').setValue(rec.get('STATUS').trim());
        
        Ext.getCmp(prototype.id + '-de-USCR').setValue(rec.get('USRIN'));
        Ext.getCmp(prototype.id + '-de-FECR').setValue(rec.get('DATE_CREATE'));
        Ext.getCmp(prototype.id + '-de-USUP').setValue(rec.get('USRAC'));
        Ext.getCmp(prototype.id + '-de-FEUP').setValue(rec.get('FECAC')==='1900-01-01 00:00:00.0' ? '' : rec.get('FECAC'));
        
    },        
});


