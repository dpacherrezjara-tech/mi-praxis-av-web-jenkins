/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.AplPayment.AplPaymentBoletoEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-aplPaymentBoletoEntryController',
    url: CONTEXTPATH + '/AplPayment',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
            
        this.getDataInputs();        
        Ext.getCmp(prototype.id + '-A3959TOTPG').focus();        
    },
    handlerEvent_setDisabled: function (bflag) {        
        //boton logo
        //Ext.getCmp(prototype.id + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id + '-btn-upload').setDisabled(bflag);        
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        var vtitle = Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').getTitle();
        Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').setTitle( vtitle + ' Nº: ' + data.A3957NRRPT );
        Ext.getCmp(prototype.id + '-A3958NRRPT').setValue(data.A3957NRRPT);
        Ext.getCmp(prototype.id + '-A3958CDCLI').setValue(data.A3957CDCLI);        
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(data.A3953RSOCI.trim());
        Ext.getCmp(prototype.id + '-A3959BANCO').setValue(data.A3953BANCO.trim());
        Ext.getCmp(prototype.id + '-A3959CTABC').setValue(data.A3953CTABC.trim());
        Ext.getCmp(prototype.id + '-A3959REFPG').setValue(data.A3957REFBC.trim());  
        Ext.getCmp(prototype.id + '-A3959MDAPG').setValue(data.A3957MDLOC); 
        var VL_TKT = Ext.getCmp(prototype.id + '-TICKET_NUMBER').getValue();        
        Ext.getCmp(prototype.id + '-FILTER02').setValue(VL_TKT);        
        this.get_detalle_boleto();        
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A3959REFPG = Ext.getCmp(prototype.id + '-A3959REFPG').getValue();
        var VL_A3959FECPG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A3959FECPG').getValue(), 'Ymd');
        var VL_A3959TOTPG = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A3959TOTPG').getValue().replace(",", "").replace(",", ""));        
        var VL_A3959MDAPG = Ext.getCmp(prototype.id + '-A3959MDAPG').getValue();
        var VL_A3959TIPPG = "M";
        var VL_A3959NRRPT = Ext.getCmp(prototype.id + '-A3958NRRPT').getValue();
        var VL_A3959CDCLI = Ext.getCmp(prototype.id + '-A3958CDCLI').getValue();
        var VL_A3959BANCO = Ext.getCmp(prototype.id + '-A3959BANCO').getValue();
        var VL_A3959CTABC = Ext.getCmp(prototype.id + '-A3959CTABC').getValue(); 
        var VL_TICKET_NC = Ext.getCmp(prototype.id + '-TICKET_NC').getValue(); 
        
        return {
            VP_ACTION:VP_ACTION,
            A3959REFPG:VL_A3959REFPG,
            A3959FECPG:VL_A3959FECPG,
            A3959TOTPG:VL_A3959TOTPG,
            A3959MDAPG:VL_A3959MDAPG,
            A3959TIPPG:VL_A3959TIPPG,
            A3959NRRPT:VL_A3959NRRPT,
            A3959CDCLI:VL_A3959CDCLI,
            A3959BANCO:VL_A3959BANCO,
            A3959CTABC:VL_A3959CTABC,
            VP_TICKET_NC: VL_TICKET_NC
        };
    },
    get_SelectedRecords:function(){
        var vl_total_sel = 0;
        var arrayRows = new Array();
        var grid = Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];                
                //console.log(row.data);                
                vl_total_sel = vl_total_sel + Ext.Number.parseFloat(row.get('A3958SALDP'));
//                if ( Ext.Number.parseFloat(row.get('A3958SALDP')) > 0 ) {
//                    vl_total_sel = vl_total_sel + Ext.Number.parseFloat(row.get('A3958SALDP'));                    
//                }
                var rec_obj = {
                    A3958CCUST:row.get('A3958CCUST'),
                    A3958CIA:row.get('A3958CIA'),
                    A3958FORMA:row.get('A3958FORMA'), 
                    A3958SERIE:row.get('A3958SERIE'), 
                    A3958SEQ:row.get('A3958SEQ'),
                    A3958TRNCU:row.get('A3958TRNCU'), 
                    A3958GRUPO:row.get('A3958GRUPO'), 
                    A3958NRRPT:row.get('A3958NRRPT'), 
                    A3958SQRPT:row.get('A3958SQRPT'), 
                    A3958CDCLI:row.get('A3958CDCLI'), 
                    A3958TOT:row.get('A3958TOT'),
                    A3958SALDP:row.get('A3958SALDP')                    
                };
                arrayRows.push( rec_obj );
            }
        } 
        return [ arrayRows, vl_total_sel ];
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
                msg: '¿Seguro de procesar aplicacion de pago?',
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
        var me = this;
        var p = this.view.params;
        var strOption = p.action;        
        //var me = this;
        var arrayRec = this.get_SelectedRecords();        
        //console.log(arrayRec[0]);
        //console.log(arrayRec[1]); //total
        //return;        
        var VL_json_detail = arrayRec[0];                
        //console.log(VL_json_detail);
        //return;        
        Ext.Ajax.request({
            url: this.url + '/set_ApplyPayment_boleto',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                json_detail: JSON.stringify(VL_json_detail)
            },
            beforerequest: Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO                        
                        //Ext.getCmp(prototype.id + '-SalesListEntry').close();
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        me.get_detalle_boleto();
                        //Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto').getStore().reload();
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
                msg: '¿Seguro de realizar la actualizacion?',
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
            msg: '¿Seguro de borrar registro ?',
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
        Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').close();
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
        var grid = Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto');
        if (!grid.getSelectionModel().hasSelection()) {
            mensaje = 'Seleccione registros';
            return mensaje;
        }
        if (params.A3959TOTPG === '' || params.A3959TOTPG === 0 ) {
            mensaje = 'Ingrese importe de pago';
            Ext.getCmp(prototype.id + '-A3959TOTPG').focus();
            return mensaje;
        }
        //Fecha de pago para NC debe tomar del refund(fecha de emision) 
        if (params.VP_TICKET_NC === ''){
            if (params.A3959FECPG === '') {
                mensaje = 'Ingrese la fecha de pago';
                Ext.getCmp(prototype.id + '-A3959FECPG').focus();
                return mensaje;
            }                               
        }
        var arrayRec = this.get_SelectedRecords();        
        var vl_total_sel = arrayRec[1];        
        if( params.A3959TOTPG > vl_total_sel ){
            mensaje = 'El importe de pago aplicado no puede ser mayor al total seleccionado';
            return mensaje;
        }
        if (params.VP_TICKET_NC !== '' && params.VP_TICKET_NC.length !== 13  ) {
            mensaje = 'Ingrese Ticket(NC) valido de 13 digitos';
            Ext.getCmp(prototype.id + '-A3959FECPG').focus();
            return mensaje;
        } 
        
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress01: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.get_detalle_boleto();
        }
    },
    get_detalle_boleto: function () {
        var VL_CIA = Ext.getCmp(prototype.id + '-FILTER01').getValue();
        var VL_TKT = Ext.getCmp(prototype.id + '-FILTER02').getValue();
        var VL_SEQ = Ext.getCmp(prototype.id + '-FILTER03').getValue();        
        var VL_PARAM1 = '';
        if (VL_TKT !== '') VL_PARAM1 = VL_CIA + VL_TKT + VL_SEQ;
        
        var p = this.view.params;                
        var bean = {};        
        bean.VP_A3958NRRPT = p.rec.data.A3957NRRPT;
        bean.VP_A3958CDCLI = p.rec.data.A3957CDCLI;        
        bean.VP_TFILTTRO = '';
        if ( VL_PARAM1 !== '' ) bean.VP_TFILTTRO = '1';        
        bean.VP_PARAM1 = VL_PARAM1;        
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.AplPayment.GridData', {        
            proxy: {
                url: prototype.url + '/search_detalle_boleto'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto').getStore().reload();
    }
    
    
});



