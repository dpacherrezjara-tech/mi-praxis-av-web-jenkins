/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.AplPayment.AplPaymentEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
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
        var p = this.view.params;        
        //console.log(p.rec_selected);        
        var vtitle = Ext.getCmp(prototype.id + '-AplPaymentEntry').getTitle();
        Ext.getCmp(prototype.id + '-AplPaymentEntry').setTitle( vtitle + ' - Reporte Nº: ' + p.rec_selected[0].A3957NRRPT );
        this.getDataInputs();        
    },
    handlerEvent_setDisabled: function (bflag) {        
        
    },
    getDataInputs: function () {
        var p = this.view.params;
        //var data = p.rec.data;
        Ext.getCmp(prototype.id + '-A3958NRRPT').setValue(p.rec_selected[0].A3957NRRPT);
        Ext.getCmp(prototype.id + '-A3958CDCLI').setValue(p.rec_selected[0].A3957CDCLI);        
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(p.rec_selected[0].A3953RSOCI.trim());
        Ext.getCmp(prototype.id + '-A3959BANCO').setValue(p.rec_selected[0].A3953BANCO.trim());
        Ext.getCmp(prototype.id + '-A3959CTABC').setValue(p.rec_selected[0].A3953CTABC.trim());
        Ext.getCmp(prototype.id + '-A3959REFPG').setValue(p.rec_selected[0].A3957REFBC.trim());  
        Ext.getCmp(prototype.id + '-A3959MDAPG').setValue(p.rec_selected[0].A3957MDLOC);
        this.get_selectedRows();
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
        var VL_CAPL       = Ext.getCmp(prototype.id + '-criterio_apl').getValue();  
        
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
            VP_CAPL:VL_CAPL
        };
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
                msg: 'Are you sure to insert?',
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
        Ext.Ajax.request({
            url: this.url + '/set_ApplyPayment',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))                
            },
            beforerequest: Ext.getCmp(prototype.id + '-AplPaymentEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-AplPaymentEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO                        
                        me.onCancelClick();
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
        Ext.getCmp(prototype.id + '-AplPaymentEntry').close();
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
        //APLICA PAGOS
//        var arrayRows = new Array();
//        var grid = Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto');
//        if (grid.getSelectionModel().hasSelection()) {
//            var selection = grid.getSelectionModel().getSelected();
//            for (var i = 0; i < selection.length; i++) {
//                var row = grid.getSelectionModel().getSelection()[i];                
//                //console.log(row);
//                row.data.A3958TOTAP = 100;
//                //arrayRows.push( row );
//                //row.get('A3958CCUST')
//            }
//            //Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto').getStore().setData(arrayRows);
//            //Ext.getCmp(prototype.id + '-infoGridAplPaymentBoleto').getStore().update();
//        }
    },
    validateForm: function (params) {
        var mensaje = "";
        
        if (params.A3959TOTPG === 0 ) {
            mensaje = 'Ingrese importe de pago';
            Ext.getCmp(prototype.id + '-A3959TOTPG').focus();
            return mensaje;
        }
        if (params.A3959FECPG === '') {
            mensaje = 'Ingrese la fecha de pago';
            Ext.getCmp(prototype.id + '-A3959FECPG').focus();
            return mensaje;
        }                                
//        var arrayRec = this.get_SelectedRecords();        
//        var vl_total_sel = arrayRec[1];        
//        if( params.A3959TOTPG > vl_total_sel ){
//            mensaje = 'El importe de pago aplicado no puede ser mayor al total seleccionado';
//            return mensaje;
//        }        
        return mensaje;
    },
    set_ClearField: function () {
       
    },    
    get_selectedRows: function () {
        var p = this.view.params;        
        //console.log(p.rec_selected);        
        Ext.getCmp(prototype.id + '-infoGridAplPayment').setStore(p.rec_selected);
        Ext.getCmp(prototype.id + '-infoGridAplPayment').getStore().reload();
    }
    
});



