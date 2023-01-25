/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.AplPayment.AplPaymentBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id03 + '-aplPaymentBatchController',
    url: CONTEXTPATH + '/AplPayment', 
    bean: {},
    init: function (view) {
        var me = this;
    },    
    afterRender: function () {            
        //this.search_det_loadbatch('2021062311');
    },
    handlerEvent_setDisabled: function () {
        
    },                
    getDataInputs: function () {
//        var p = this.view.params;
//        var data = p.rec.data;
//        //console.log(data);
//        var vtitle = Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').getTitle();
//        Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').setTitle( vtitle + ' Nº: ' + data.A3957NRRPT );
//        Ext.getCmp(prototype.id + '-A3958NRRPT').setValue(data.A3957NRRPT);
//        Ext.getCmp(prototype.id + '-A3959MDAPG').setValue(data.A3957MDLOC); 
//        var VL_TKT = Ext.getCmp(prototype.id + '-TICKET_NUMBER').getValue();        
//        Ext.getCmp(prototype.id + '-FILTER02').setValue(VL_TKT);        
//        this.get_detalle_boleto();        
    },
    getDataEntryValues: function (strOption) {
//        var VP_ACTION = strOption;              
//        return {
//            VP_ACTION:VP_ACTION                     
//        };
    },    
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: '¿Cargar archivo?',
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
        }
    },
    
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
        
        var me = this;
        var file = Ext.getCmp(prototype.id03 + '-file').getValue().trim();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "SELECCIONAR ARCHIVO ", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id03 + '-file').focus();", 100);
            });
            return;
        }            
        me.bean.VP_ACTION = strOption;        
        me.bean.fileName = file;
        var form = Ext.getCmp(prototype.id03 + '-form01').getForm();
        form.submit({
            url: prototype.url + '/setAplPaymentBatch',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {
                beanString:JSON.stringify(me.bean)
            },
            success: function (fp, o) {
                //var res = Ext.JSON.decode(response.responseText);
                var res = Ext.decode(o.response.responseText);                 
                //console.log(res);
                var objRtn = res.objRtn;
                //Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO 
                        if(objRtn.OU_A4021LOTE !== ""){
                            Ext.getCmp(prototype.id03 + '-A4021LOTE').setValue(objRtn.OU_A4021LOTE);
                            me.search_det_loadbatch();
                            //Ext.getCmp(prototype.id03 + '-AplPaymentBatch').close();
                            //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }                        
                    }
                });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
    },
    onUpdateClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {

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
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id03 + '-AplPaymentBatch').close();
    }, 
    cmbfiltro_clickHandler03:function(){
        this.search_det_loadbatch();
    },
    search_det_loadbatch:function( ){
        me = this;
        var bean = {};        
        bean.VP_A4021LOTE = Ext.getCmp(prototype.id03 + '-A4021LOTE').getValue();
        bean.VP_BOLETO  = Ext.getCmp(prototype.id03 + '-A4021BOLETO').getValue();
        bean.VP_A4021STAT  = Ext.getCmp(prototype.id03 + '-A4021STAT').getValue();
        if (bean.VP_A4021STAT !== '' ){
            if (bean.VP_BOLETO === '' && bean.VP_A4021LOTE === '' ){
                global.Msg({msg: 'Ingrese Nº lote y/o Boleto'});
                return;
            }
        };
        if (bean.VP_A4021STAT === '' ){
            if (bean.VP_BOLETO === '' && bean.VP_A4021LOTE === '' ){
                global.Msg({msg: 'Ingrese Nº lote y/o Boleto **'});
                return;
            }
        };
        Ext.Ajax.request({
            url: prototype.url + '/search_det_loadbatch',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id03 + '-AplPaymentBatch').mask('Cargando...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                Ext.getCmp(prototype.id03 + '-AplPaymentBatch').unmask('Loading...', '');
                if (res.total === 0) {
                        global.Msg({
                            msg: 'No hay registros'
                        });
                    return;
                }  
                Ext.getCmp(prototype.id03 + '-infoGridAplPaymentBatch').setStore(res.data);
                Ext.getCmp(prototype.id03 + '-infoGridAplPaymentBatch').getStore().reload();           
            }
        }); 
    },
    onExportXlsClick: function(){
        var bean = {};         
        bean.VP_A4021LOTE = Ext.getCmp(prototype.id03 + '-A4021LOTE').getValue();
        bean.VP_BOLETO  = Ext.getCmp(prototype.id03 + '-A4021BOLETO').getValue();
        bean.VP_A4021STAT  = Ext.getCmp(prototype.id03 + '-A4021STAT').getValue();        
        if (bean.VP_A4021STAT !== '' ){
            if (bean.VP_BOLETO === '' || bean.VP_A4021LOTE === '' ){
                global.Msg({msg: 'Ingrese Nº lote y/o Boleto'});
                return;
            }
        };
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel File ?',            
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/det_loadbatchExcel?beanString='+encodeURI(JSON.stringify(bean)));
                }
            }
        });
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    onfocusleaveNumberfield:function(obj, error, eOpts){        
        var val =  obj.getValue().replace(",", "").replace(",", "");
        obj.setValue( Ext.util.Format.number( val , '0,000.00'));
       
    },
    validateForm: function (params) {
        var mensaje = "";               
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_det_loadbatch();
        }
    }
    
    
});



