/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.ControlUATP.ControlUATPProcesarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-controlUATPProcesarController',
    url: CONTEXTPATH + '/ControlUATP', 
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
        var vl_OP01 = Ext.getCmp(prototype.id02 + '-op01').getValue();
        var vl_OP02 = Ext.getCmp(prototype.id02 + '-op02').getValue();
        var vl_OP03 = Ext.getCmp(prototype.id02 + '-op03').getValue();
        var VL_PROCESO = '';
        if(vl_OP01)VL_PROCESO = 'UATP';
        if(vl_OP02)VL_PROCESO = 'REPT';
        if(vl_OP03)VL_PROCESO = 'EECC'; 
        
        var VL_ACTION = strOption;  
        var VL_FECHA1 = '';
        var VL_FECHA2 = '';
        var VP_FEJEC  = '';
        var VP_CDCLI  = '';
        if (VL_PROCESO==='UATP'){
            VL_FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-FECHA1').getValue(), 'Ymd');
            VL_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-FECHA2').getValue(), 'Ymd');
        }   
        if (VL_PROCESO==='REPT')
        VP_FEJEC = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-FECHEJE01').getValue(), 'Ymd');            
        
        if (VL_PROCESO==='EECC'){
            VP_FEJEC = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-FECHEJE02').getValue(), 'Ymd');            
            VP_CDCLI = '';            
        }                       
        return {
            VP_ACTION:VL_ACTION,
            VP_FDATE1:VL_FECHA1,
            VP_FDATE2:VL_FECHA2,
            VP_FEJEC:VP_FEJEC,
            VP_CDCLI:VP_CDCLI,
            VP_PROCESO:VL_PROCESO
        };
    },    
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        var StrMsgConfirm = ''; 
        if (params.VP_PROCESO === 'UATP') StrMsgConfirm = '¿Procesar Carga de boletos UATP?';
        if (params.VP_PROCESO === 'REPT') StrMsgConfirm = '¿Procesar emisión de Reporte de Ventas?';
        if (params.VP_PROCESO === 'EECC') StrMsgConfirm = '¿Procesar emisión de Estados de Cuenta?';
        
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: StrMsgConfirm,
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
        var params = this.getDataEntryValues(strOption);
//        console.log(this.getDataEntryValues(strOption));
//        return;        
        Ext.Ajax.request({
            url: this.url + '/set_procesar',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(params)                
            },
            beforerequest: Ext.getCmp(prototype.id02 + '-ControlUATPProcesarForm').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id02 + '-ControlUATPProcesarForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //culmino PROCESO   
                        if(params.VP_PROCESO==='UATP')
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
                        var elem = document.getElementById('ControlUATPProcesarForm_Msg');
                        elem.innerHTML = objRtn.dbException.MESSAGE;                        
                        //me.onCancelClick();   
                        
                    }
                });
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
        Ext.getCmp(prototype.id02 + '-ControlUATPProcesarForm').close();
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
        if (params.VP_PROCESO === 'UATP') {
            if(params.VP_FDATE1 === '' || params.VP_FDATE2 === '' )
            mensaje = 'INGRESAR RANGO DE FECHAS ';
            Ext.getCmp(prototype.id02 + '-FECHA1').focus();
            return mensaje;
        }
        if (params.VP_PROCESO === 'REPT') {
            if(params.VP_FEJEC === '' )
            mensaje = 'INGRESAR FECHA DE EMISION ';
            Ext.getCmp(prototype.id02 + '-FECHEJE01').focus();
            return mensaje;
        }
         if (params.VP_PROCESO === 'EECC') {
            if(params.VP_FEJEC === '' )
            mensaje = 'INGRESAR FECHA DE EMISION ';
            Ext.getCmp(prototype.id02 + '-FECHEJE02').focus();
            return mensaje;
        }
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



