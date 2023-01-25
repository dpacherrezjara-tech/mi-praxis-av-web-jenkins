/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.DeliveryFileARC.DeliveryFileARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeliveryFileARCController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'DeliveryFileARCForm';
        prototype.url = CONTEXTPATH + '/DeliveryFileARC';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#DeliveryFileARCForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DeliveryFileARCForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DeliveryFileARCForm-btnClear': {
                click: this.btnClear_click
            },
            '#DeliveryFileARCForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DeliveryFileARCForm-btnBack': {
                click: this.btnBack_click
            },
            '#DeliveryFileARCForm-btnTxt': {
                click: this.btnTxt_click
            },
            //-----------------Eventos Especificos -------------------            

            '#DeliveryFileARCForm-btnDowload': {
                click: this.pagNext
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
    },
    setStoreData: function() {

        var cmbBanco = Ext.getCmp(prototype.id + '-cmbBanco');

        cmbBanco.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["ELW", "ELW"],
                ["IAR", "IAR"],
                ["IAP", "IAP"]
            ]}));
        cmbBanco.setValue("ELW");
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setData(obj, e);
    },
    setFormatParameter: function() {
        var IN_CCUST = '139';
        var IN_SOURCEINF = Ext.getCmp(prototype.id + '-cmbBanco').getValue();
        var IN_PRDA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtCampo').getValue(), 'Ymd');

        searchParams = {
            IN_CCUST: IN_CCUST,
            IN_SOURCEINF: IN_SOURCEINF,
            IN_PRDA: IN_PRDA
        };
        console.log(searchParams);
    },
    setData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1347");
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {

            var storeData = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/loadSearch'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                        Ext.getCmp(prototype.id + '-regionCenterGrid01').mask('Loading...', '');
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-regionCenterGrid01').unmask('Loading...', '');
                        var txtDelivery = Ext.getCmp(prototype.id + '-txaDelivery').getValue();

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var lines = obj.data.items;
                            Ext.getCmp(prototype.id + '-txtCampo2').setValue(lines[0].data.TRADM.substr(0, 4) + '/' + lines[0].data.TRADM.substr(4, 2) + '/' + lines[0].data.TRADM.substr(6, 2));
                            for (var i = 0; i < lines.length; i++) {
                                txtDelivery = txtDelivery + ' \n' + lines[i].data.DELIVERY;
                            }
                            Ext.getCmp(prototype.id + '-txaDelivery').setValue(txtDelivery);
                        }
                    }
                }
            });

            Ext.getCmp(prototype.id + '-paggin').bindStore(storeData);
            global.clear();

//            Ext.Ajax.request({
//                url: prototype.url + '/loadSearch',
//                method: 'POST',
//                timeout: 60000000,
//                params: searchParams,
//                beforerequest: Ext.getCmp(prototype.id + '-txtCampo').mask('Loading...', ''),
//                success: function(response, options) {
//                    var res = Ext.JSON.decode(response.responseText);
//                    console.log(res);
////                    var objRtn = res.objRtn;
////                   
////                    Ext.getCmp(prototype.id + '-txtCampo').unmask('Loading...', '');
////                    global.Msg({
////                        msg: objRtn.dbException.MESSAGE,
////                        icon: 1,
////                        fn: function() {
////                            //exito
////                            Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').close();
////                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
////                        }
////                    });
//                }
//            });

        }
    },
    validateFields: function() {
        var msj = '';
        if (searchParams.IN_PRDA.trim() === '') {
            msj = 'Enter Scheduled Output Date';
        }
        return msj;
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtCampo').setValue('');
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnTxt_click: function() {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'The process will take a few minutes. Do you want continue ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getFileTxt?IN_CCUST=' + searchParams.IN_CCUST
                                + '&IN_SOURCEINF=' + searchParams.IN_SOURCEINF
                                + '&IN_PRDA=' + searchParams.IN_PRDA);
                    }
                }
            });
        }
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    }
});
