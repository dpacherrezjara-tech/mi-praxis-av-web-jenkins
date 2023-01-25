/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.ControlUATP.ControlUATPErroresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id04 + '-controlUATPErroresController',
    url: CONTEXTPATH + '/ControlUATP', 
    bean: {},
    init: function (view) {
        var me = this;
    },    
    afterRender: function () {    
        Ext.getCmp(prototype.id04 + '-FECHA1').setValue(Ext.getCmp(prototype.id + '-FCONT').getValue());
        Ext.getCmp(prototype.id04 + '-FECHA2').setValue(Ext.getCmp(prototype.id + '-FCONT').getValue());
        this.Onsearch();
    },
    handlerEvent_setDisabled: function () {
        
    },                
    getDataInputs: function () {
        
    },
    cmbfiltroSTSUUID_clickHandler:function(){
        this.Onsearch();
    },
    getDataEntryValues: function (strOption) {
        
        var VL_ACTION = strOption;  
        var VL_FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id04 + '-FECHA1').getValue(), 'Ymd');
        var VL_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id04 + '-FECHA2').getValue(), 'Ymd');                     
        return {
            VP_ACTION:VL_ACTION,
            VP_FDATE1:VL_FECHA1,
            VP_FDATE2:VL_FECHA2
        };
    },  
    Onsearch: function () {
        this.search();
    },
    search: function ()
    {
        me = this;
        var bean = {};
        var VL_OPCION = '';  
        var VL_FDATE1 = Ext.util.Format.date(Ext.getCmp(prototype.id04 + '-FECHA1').getValue(), 'Ymd');
        var VL_FDATE2 = Ext.util.Format.date(Ext.getCmp(prototype.id04 + '-FECHA2').getValue(), 'Ymd');
        var VL_STAT = Ext.getCmp(prototype.id04 + '-STSERR').getValue();
        var VL_TICKET = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id04 + '-FECHA2').getValue(), 'Ymd');
        bean.VP_OPCION = VL_OPCION; 
        bean.VP_FECHA1 = VL_FDATE1;
        bean.VP_FECHA2 = VL_FDATE2;
        bean.VP_STAT   = VL_STAT;
        bean.VP_TICKET = VL_TICKET;
        bean.limit = "-1";
        bean.page = "-1";
        if(VL_FDATE1==='' || VL_FDATE2 ==='' ){
            console.log('return fecha null');
            return;
        };
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search_err'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id04 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id04 + '-paggin').setStore(storeGridDatas);
        
    },
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        var StrMsgConfirm = '¿Procesar Carga de UUID?'; 
                
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
        Ext.Ajax.request({
            url: this.url + '/set_procesarUUID',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(params)                
            },
            beforerequest: Ext.getCmp(prototype.id04 + '-ControlUATPUUIDForm').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id04 + '-ControlUATPUUIDForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //culmino PROCESO                           
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
                        //var elem = document.getElementById('ControlUATPProcesarForm_Msg');
                        //elem.innerHTML = objRtn.dbException.MESSAGE;                        
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
        Ext.getCmp(prototype.id04 + '-ControlUATPUUIDForm').close();
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
        if(params.VP_FDATE1 === '' || params.VP_FDATE2 === '' ){
            mensaje = 'INGRESAR RANGO DE FECHAS ';
            Ext.getCmp(prototype.id04 + '-FECHA1').focus();
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



