/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryTAXCOMMRfndController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTAXCOMMRfndController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    paramsTAXCOMM: {},
    init: function (view) {
        var me = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrids();
        this.getDataInputs();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfndFOP + '-store-gridTAXCOMMRfnd'
        });

        grid01.setStore(store01);
    },
    getDataInputs: function () {
        var me = this;
        
        var gridDataTAXCOMMRfnd = Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd');
        var gridAddTAXCOMMRfnd = Ext.getCmp(prototype.idRfndTAXCOMM + '-gridAddTAXCOMMRfnd');
        var gridTAXCOMMSave = Ext.getCmp(prototype.idRfndTAXCOMM + '-gridTAXCOMMSave');
        switch (String(me.view.params.action)) {
            case 'CLOSED':
                gridTAXCOMMSave.hide();
                gridAddTAXCOMMRfnd.hide();
                gridDataTAXCOMMRfnd.columns[5].setVisible(false);
                break;
            case 'OPEN':

                gridTAXCOMMSave.show();
                gridAddTAXCOMMRfnd.show();
                gridDataTAXCOMMRfnd.columns[5].setVisible(true);
                break;

        }
        var p = me.view.params.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A713SEQ = p.A713SEQ;


        paramsTAXCOMM = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1734SEQ: A713SEQ
        };
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadTicket_TAXCOMMRfnd',
            method: 'POST',
            timeout: 60000000,
            params: paramsTAXCOMM,
            beforerequest: Ext.getCmp(prototype.idRfndTAXCOMM + '-winDataEntryTAXCOMMRfnd').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd').getStore().loadData(res.lstTKT_TAXCOMM);
                Ext.getCmp(prototype.idRfndTAXCOMM + '-winDataEntryTAXCOMMRfnd').unmask('Loading...', '');
            }
        });
    },
    OnTAXCOMMRfndRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var p = me.view.params.params;
        var paramsGuardarFOP = {};
        var rec = grid.getStore().getAt(rowIndex);
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {


                    if (rec.data.A1731CORRL !== '') {
                        paramsGuardarFOP.IN_OPTION = "4";
                        paramsGuardarFOP.IN_CIA = p.IN_CIA;
                        paramsGuardarFOP.A1731FORMA = p.IN_FORMA;
                        paramsGuardarFOP.A1731SERIE = p.IN_SERIE;
                        paramsGuardarFOP.A1731SEQ = p.A713SEQ;
                        paramsGuardarFOP.A1731CORRL = rec.data.A1734CORRL;
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndTAXCOMM + '-winDataEntryTAXCOMMRfnd'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteEntryRfndCompleManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarFOP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            me.getDataInputs();
                                            Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
                                        }


                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }

                    //
                }
            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onAddTAXCOMMRfndClick: function (rec) {
        var paramsTAXCOMMRfnd = {};
        paramsTAXCOMMRfnd.A1734CTCOM = "";
        paramsTAXCOMMRfnd.A1734TIPO = "VC";
        paramsTAXCOMMRfnd.A1734RATE = 0;
        paramsTAXCOMMRfnd.A1734MTXC = Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue();
        paramsTAXCOMMRfnd.A1734VTXCR = 0;
        paramsTAXCOMMRfnd.A1734CORRL = "";

        var grid01 = Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd');
        grid01.getStore().add(paramsTAXCOMMRfnd);
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onSaveTAXCOMMClick: function (btn) {
        var me = this;
        var lstTAXCOMMPrinci = {};
        var paramsGuardarTAXCOMM = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {
            var lstTAXCOMM = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd').getStore().data.items[i].data;
                var BeanFOP = {};
                BeanFOP.A1734CTCOM = Ext.String.trim(bean.A1734CTCOM);
                BeanFOP.A1734TIPO = Ext.String.trim(bean.A1734TIPO);
                BeanFOP.A1734RATE = bean.A1734RATE;
                BeanFOP.A1734MTXC = Ext.String.trim(bean.A1734MTXC);
                BeanFOP.A1734VTXCR = bean.A1734VTXCR;
                BeanFOP.A1734CORRL = Ext.String.trim(bean.A1734CORRL);
                lstTAXCOMM.push(BeanFOP);
            }


            lstTAXCOMMPrinci.A1734 = lstTAXCOMM;
            paramsGuardarTAXCOMM.IN_CIA = p.IN_CIA;
            paramsGuardarTAXCOMM.A1731FORMA = p.IN_FORMA;
            paramsGuardarTAXCOMM.A1731SERIE = p.IN_SERIE;
            paramsGuardarTAXCOMM.A1731SEQ = p.A713SEQ;
            paramsGuardarTAXCOMM.A1731GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarTAXCOMM.A1731IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarTAXCOMM.A1731TCAMB = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue());

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndTAXCOMM + '-winDataEntryTAXCOMMRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertTAXCOMMManual/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarTAXCOMM),
                    beanlstTaxComm: JSON.stringify(lstTAXCOMMPrinci)
                },
                success: function (response, options) {
                    mask.hide();
                    var res = Ext.JSON.decode(response.responseText);
                    var vp_icon = 0;
                    if (res.data === 'RECORD INSERTED') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                            if (vp_icon === 1) {
                                me.getDataInputs();
                                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
                            }


                        }});
                }
            });


        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var grid03 = Ext.getCmp(prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd');
        var regs = grid03.getStore().getCount();
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Tax On Commission');
            bvalida = false;
            return;
        } else {
            for (var o = 0; o < regs; o++) {
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1734MTXC')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Currency');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1734MTXC')).length !== 3) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The currency must have 3 characters');
                    bvalida = false;
                    return;
                }
                if (parseFloat(grid03.getStore().getAt(o).get('A1734VTXCR')) === 0 || isNaN(parseFloat(grid03.getStore().getAt(o).get('A1734VTXCR'))) === true) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter the Amount');
                    bvalida = false;
                    return;
                }
            }
        }
        return bvalida;
    }


});

