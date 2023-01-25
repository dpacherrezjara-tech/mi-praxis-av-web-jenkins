/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterInvoiceForm.DataEntryAccountingMasterInvoiceFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterInvoiceFormController',
    urlWin01: '',
    beanTMP: {},
    beanMant: {},
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var p = this.view.params;
        this.onLoadCmbStatus();
        this.onLoadCmbMasterFG(p.action);
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id2 + '-btn-delete').hide();
                Ext.getCmp(prototype.id2 + '-btn-update').hide();
                Ext.getCmp(prototype.id2 + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id2 + '-btn-save').hide();
                Ext.getCmp(prototype.id2 + '-btn-update').show();
                Ext.getCmp(prototype.id2 + '-btn-delete').show();
                break;
        }
        global.AccessControlMaganer();

    },
    onLoadCmbMasterFG: function (opcion) {
        var me = this;
        var ComboAgru = Ext.getCmp(prototype.id2 + '-ComboAgru');
        me.beanTMP.VP_OPCION = '2';
        me.beanTMP.VP_CUENTA = '';
        me.beanTMP.VP_SUBCU = '';
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/searchMasterFG',
                extraParams: {
                    beanString: JSON.stringify(me.beanTMP)
                },
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    if(opcion==='I') {
                        ComboAgru.setValue('CARGOS CP');
                    }
     
                    
                }
            }
        });
        ComboAgru.setStore(store);
    },
    onCmbSearchAfterRecordRender: function (obj) {
        obj.setValue('P');
    },
    onCmbSearchAfterIvaRender: function (obj) {
        obj.setValue('');
    },
    onLoadCmbStatus: function () {
        var ComboRecord = Ext.getCmp(prototype.id2 + '-ComboRecord');
        var ComboIva = Ext.getCmp(prototype.id2 + '-ComboIva');
        //var ComboAgru = Ext.getCmp(prototype.id2 + '-ComboAgru');
        var ComboTypeCta = Ext.getCmp(prototype.id2 + '-ComboTypeCta');
        var ComboOal = Ext.getCmp(prototype.id2 + '-ComboOal');
        var ComboBillable = Ext.getCmp(prototype.id2 + '-ComboBillable');
        var ComboNoSale = Ext.getCmp(prototype.id2 + '-ComboNoSale');
        var ComboIndGrouping = Ext.getCmp(prototype.id2 + '-ComboIndGrouping');


        ComboRecord.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "P", "name": "P"},
                {"code": "M", "name": "M"},
                {"code": "A", "name": "A"},
                {"code": "I", "name": "I"},
                {"code": "O", "name": "O"},
                {"code": "X", "name": "X"}
            ]
        }));

        ComboIva.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": ""},
                {"code": "00", "name": "00"},
                {"code": "08", "name": "08"},
                {"code": "16", "name": "16"}
            ]
        }));

        ComboTypeCta.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": ""},
                {"code": "TNU", "name": "TNU"},
                {"code": "YQ", "name": "YQ"},
                {"code": "C", "name": "CHARGE"}
            ]
        }));

        ComboOal.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "N"},
                {"code": "Y", "name": "Y"}
            ]
        }));

        ComboBillable.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "0"},
                {"code": "1", "name": "1"},
                {"code": "2", "name": "2"}
            ]
        }));

        ComboNoSale.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "N"},
                {"code": "Y", "name": "Y"}
            ]
        }));

        ComboIndGrouping.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "0"},
                {"code": "1", "name": "1"}
            ]
        }));

    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id2 + '-txtAccount').setValue(Ext.String.trim(data.CUENT));
        Ext.getCmp(prototype.id2 + '-txtSubAccount').setValue(Ext.String.trim(data.SUBCU));
        Ext.getCmp(prototype.id2 + '-txtDESC').setValue(Ext.String.trim(data.DESCU));
        //combo
        Ext.getCmp(prototype.id2 + '-ComboRecord').setValue(Ext.String.trim(data.RECORD));
        Ext.getCmp(prototype.id2 + '-ComboIva').setValue(Ext.String.trim(data.IVA));
        Ext.getCmp(prototype.id2 + '-ComboTypeCta').setValue(Ext.String.trim(data.TCTA));
        Ext.getCmp(prototype.id2 + '-ComboOal').setValue(Ext.String.trim(data.OAL));
        Ext.getCmp(prototype.id2 + '-ComboBillable').setValue(Ext.String.trim(data.FACT));
        Ext.getCmp(prototype.id2 + '-ComboNoSale').setValue(Ext.String.trim(data.NVTA));
        Ext.getCmp(prototype.id2 + '-ComboIndGrouping').setValue(Ext.String.trim(data.INDAGRUP));
        console.log(data.DESCAGRUP);
        Ext.getCmp(prototype.id2+'-ComboAgru').setValue(Ext.String.trim(data.DESCAGRUP));
        //DESCAGRUP

        Ext.getCmp(prototype.id2 + '-txtUSCR').setValue(data.REGIS);
        Ext.getCmp(prototype.id2 + '-txtFECR').setValue(data.FREGI);
        Ext.getCmp(prototype.id2 + '-txtHOCR').setValue(data.HREGI);
        Ext.getCmp(prototype.id2 + '-txtUSUP').setValue(data.REVIS);
        Ext.getCmp(prototype.id2 + '-txtFEUP').setValue(data.FREVI);
        Ext.getCmp(prototype.id2 + '-txtHOUP').setValue(data.HREVI);




    },
    onSaveClick: function (btn) {

        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
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
        var me = this;
        var p = me.view.params;
        var strOption = p.action;
        me.beanMant.VP_OPCION = strOption;
        me.beanMant.CUENT = Ext.getCmp(prototype.id2 + '-txtAccount').getValue();
        me.beanMant.SUBCU = Ext.getCmp(prototype.id2 + '-txtSubAccount').getValue();
        me.beanMant.RECORD = Ext.getCmp(prototype.id2 + '-ComboRecord').getValue();
        me.beanMant.IVA = Ext.getCmp(prototype.id2 + '-ComboIva').getValue();
        me.beanMant.TCTA = Ext.getCmp(prototype.id2 + '-ComboTypeCta').getValue();
        me.beanMant.OAL = Ext.getCmp(prototype.id2 + '-ComboOal').getValue();
        me.beanMant.FACT = Ext.getCmp(prototype.id2 + '-ComboBillable').getValue();
        me.beanMant.DRFIC = "";
        me.beanMant.NVTA = Ext.getCmp(prototype.id2 + '-ComboNoSale').getValue();
        me.beanMant.INDAGRUP = Ext.getCmp(prototype.id2 + '-ComboIndGrouping').getValue();
        me.beanMant.DESCAGRUP = Ext.getCmp(prototype.id2 + '-ComboAgru').getValue();
        me.beanMant.DESCU = Ext.getCmp(prototype.id2 + '-txtDESC').getValue();
        //  Ext.getCmp(prototype.id2+'-ComboAgru').setValue(Ext.String.trim(data.DESCAGRUP));
        

        Ext.Ajax.request({
            url: this.urlWin01 + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanMant)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                global.Msg({
                    msg: msg,
                    icon: 1,
                    fn: function () {
                        //exito                       
                        if (msg !== 'RECORD EXISTS') {
                             me.view.close();
                            Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
                        }

                    }
                });
            }
        });
    },
    onUpdateClick: function (btn) {


        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
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
    }
    ,
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXISEX:.',
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
    validateForm: function () {

        var mensaje = "";
        var txtAccount = Ext.getCmp(prototype.id2 + '-txtAccount').getValue();
        var txtSubAccount = Ext.getCmp(prototype.id2 + '-txtSubAccount').getValue();

        if (txtAccount === '' || txtSubAccount === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;
    },
    onCancelClick: function (btn) {
        this.view.close();
    }

});




