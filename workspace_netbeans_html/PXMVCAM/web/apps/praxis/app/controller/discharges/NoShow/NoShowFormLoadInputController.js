/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormLoadInputController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id07 + '-noShowFormLoadInputController',
    url: CONTEXTPATH + '/NoShow', 
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
        var file = Ext.getCmp(prototype.id07 + '-file').getValue().trim();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "SELECCIONAR ARCHIVO ", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id07 + '-file').focus();", 100);
            });
            return;
        }            
        me.bean.VP_ACTION = strOption;        
        me.bean.fileName = file;
        me.bean.VP_FPROC = Ext.util.Format.date(Ext.getCmp(prototype.id07 + '-FPROC').getValue(), 'Ymd');
        
        //console.log(me.bean);
        
        if (me.bean.VP_FPROC === '') {
            Ext.MessageBox.alert('PRAXIS', "SELECCIONAR FECHA DEL INSUMO ", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id07 + '-FPROC').focus();", 100);
            });
            return;
        }
        
        var form = Ext.getCmp(prototype.id07 + '-form01').getForm();
        form.submit({
            url: prototype.url + '/setUploadInput',
            waitMsg: 'Uploading your sure to upload the file...',
            params: me.bean,
//            params: {
//                beanString:JSON.stringify(me.bean)
//            },            
            success: function (fp, o) {
                //var res = Ext.JSON.decode(response.responseText);
                var res = Ext.decode(o.response.responseText);                 
                //console.log(res);
                var objRtn = res.objRtn;
                //Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.MESSAGE,
                    icon: objRtn.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO                                                     
                        Ext.getCmp(prototype.id07 + '-NoShowFormLoadInput').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});                               
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
    onCancelClick07: function (btn) {
        Ext.getCmp(prototype.id07 + '-NoShowFormLoadInput').close();
    }, 
    cmbfiltro_clickHandler03:function(){
        
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
            //this function
        }
    }    
});



