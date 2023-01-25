/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.ConciliationDifferences.DataEntryConciliationDifferencesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ConciliationDifferences',
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
        var p = this.view.params;
        this.getDataInputs();
        // global.AccessControlMaganer();
    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-de-txtA1698FFILE').setValue(data.A1698FFILE);
        Ext.getCmp(prototype.id + '-de-txtA1698FPRDA').setValue(data.A1698FPRDA);
        Ext.getCmp(prototype.id + '-de-txtA1698CURR').setValue(data.CURRENCY);
        Ext.getCmp(prototype.id + '-de-txtA1698GROS').setValue(Ext.util.Format.number(data.TOT_GROSS, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698REMM').setValue(Ext.util.Format.number(data.TOT_REMITTENCE, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698TAX').setValue(Ext.util.Format.number(data.BSP_TAX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698COMM').setValue(Ext.util.Format.number(data.BSP_COMM, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698GROSP').setValue(Ext.util.Format.number(data.TOT_GROSS_PX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698REMMP').setValue(Ext.util.Format.number(data.TOT_REMITTENCE_PX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698TAXP').setValue(Ext.util.Format.number(data.PRAXIS_TAX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698COMMP').setValue(Ext.util.Format.number(data.PRAXIS_COMM, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtCASH').setValue(Ext.util.Format.number(data.TOT_CASH_BSP, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtCASHP').setValue(Ext.util.Format.number(data.TOT_CASH_PX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtCREDIT').setValue(Ext.util.Format.number(data.TOT_CREDIT_BSP, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtCREDITP').setValue(Ext.util.Format.number(data.TOT_CREDIT_PX, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698COMEN').setValue(data.A1698COMEN.trim());
        //console.log(data);
        Ext.getCmp(prototype.id + '-de-txtA1698UCONC').setValue(data.A1698UCONC);
        Ext.getCmp(prototype.id + '-de-txtA1698FCONC').setValue(data.A1698FCONC);
        Ext.getCmp(prototype.id + '-HOCR').setValue(data.A1698HCONC);
               
                
        var dif = data.TOT_GROSS - data.TOT_GROSS_PX;
        var dif2 = data.TOT_REMITTENCE - data.TOT_REMITTENCE_PX;
        var dif3 = data.BSP_TAX - data.PRAXIS_TAX;
        var dif4 = data.BSP_COMM - data.PRAXIS_COMM;
        Ext.getCmp(prototype.id + '-de-txtA1698GROSD').setValue(Ext.util.Format.number(dif, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698REMMD').setValue(Ext.util.Format.number(dif2, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698TAXD').setValue(Ext.util.Format.number(dif3, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtA1698COMMD').setValue(Ext.util.Format.number(dif4, '0,000.00'));

        var num1 = data.TOT_REMITTENCE + data.BSP_COMM;
        var num2 = data.TOT_REMITTENCE_PX + data.PRAXIS_COMM;
        var dif = num1 - num2;
        Ext.getCmp(prototype.id + '-de-txtCASHD').setValue(Ext.util.Format.number(dif, '0,000.00'));

        var num1 = data.TOT_GROSS - (data.TOT_REMITTENCE + data.BSP_COMM);
        var num2 = data.TOT_GROSS_PX - (data.TOT_REMITTENCE_PX + data.PRAXIS_COMM);
        var dif = num1 - num2;
        Ext.getCmp(prototype.id + '-de-txtCREDITD').setValue(Ext.util.Format.number(dif, '0,000.00'));


        if (data.A1698STCON === 'A') {
            Ext.getCmp(prototype.id + '-de-txtA1698STCON').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.id + '-de-txtA1698STCON').setReadOnly(false);
        }
        Ext.getCmp(prototype.id + '-de-txtA1698STCON').setValue(data.A1698STCON);
    },
    getDataEntryValues: function(data) {
//        var option = 'U';
//        var VP_A1698CCUST = data.A1698CCUST;
//        var VP_A1698SOURC = data.A1698SOURC;
//        var VP_A1698PAIS = data.A1698PAIS;
//        var VP_A1698BANK = data.A1698BANK;
//        var VP_A1698FPRDA = data.A1698FPRDA;
//        var VP_A1698FFILE = data.A1698FFILE;
//        var VP_A1698HFILE = data.A1698HFILE;
//        var VP_IND_CUR = data.IND_CUR;
//        var VP_A1698COMEN = Ext.getCmp(prototype.id + '-de-txtA1698COMEN').getValue();
//        var VP_A1698STCON = Ext.getCmp(prototype.id + '-de-txtA1698STCON').getValue();
//
//        return {
//            option: option,
//            VP_A1698CCUST: VP_A1698CCUST,
//            VP_A1698SOURC: VP_A1698SOURC,
//            VP_A1698PAIS: VP_A1698PAIS,
//            VP_A1698BANK: VP_A1698BANK,
//            VP_A1698FPRDA: VP_A1698FPRDA,
//            VP_A1698FFILE: VP_A1698FFILE,
//            VP_A1698HFILE: VP_A1698HFILE,
//            VP_IND_CUR: VP_IND_CUR,
//            VP_A1698COMEN: VP_A1698COMEN,
//            VP_A1698STCON: VP_A1698STCON
//        };
    },
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert?',            
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "I";
                    this.crud();
                }
            }
        });
    },
    onUpdateClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',            
            msg: 'Are you sure to update',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "U";
                    this.crud();
                }
            }
        });
    },
    crud: function() {
        var p = this.view.params;
        var data = p.rec.data;

        Ext.Ajax.request({
            url: this.url + '/setConciliacionBSP',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(data),
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                //console.log(objRtn);
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        //NO ACTUALIZAR EN AUTOMATICO A PEDIDO DE BPO, SE HARA DE FORMA MANUAL AL FINALIZAR.
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCancelClick: function(){
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }



});


