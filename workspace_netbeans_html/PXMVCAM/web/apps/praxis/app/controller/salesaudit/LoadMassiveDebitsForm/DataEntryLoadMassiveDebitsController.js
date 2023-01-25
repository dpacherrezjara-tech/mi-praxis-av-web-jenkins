/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.LoadMassiveDebitsForm.DataEntryLoadMassiveDebitsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadMassiveDebitsController',
    BeanMoreTKT: {},
    urlWin01: CONTEXTPATH + '/LoadMassiveDebitsForm',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log(this.view.params)

        this.setStoresGrids();
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        me.BeanMoreTKT.IN_AREA = Ext.String.trim(me.view.params.IN_AREA);
        me.BeanMoreTKT.IN_TYPE = Ext.String.trim(me.view.params.IN_TYPE);
        me.BeanMoreTKT.A2552FUENT = Ext.String.trim(me.view.params.IN_FUENT);
        me.BeanMoreTKT.IN_USER = Ext.String.trim(me.view.params.IN_USER);

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: me.urlWin01 + '/grupo',
            params: {beanString: JSON.stringify(me.BeanMoreTKT)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.id2 + '-gridgrouping').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id2 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id2 + '-gridgrouping');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid01',
            pageSize: 20,
            groupField: 'GROUPED',
            fields: [
                {name: 'A2552CCUST', type: 'string'},
                {name: 'A2552SEQDD', type: 'string'},
                {name: 'A2552SEQ', type: 'string'},
                {name: 'A2552BASE', type: 'string'},
                {name: 'A2552AREA', type: 'string'},

                {name: 'A2552ETCU3', type: 'string'},
                {name: 'A2552ETCU4', type: 'string'},
                {name: 'A2552IATA', type: 'string'},
                {name: 'A2552AGEN', type: 'string'},
                {name: 'A2552PAX', type: 'string'},
                {name: 'A2552PROC', type: 'string'},
                {name: 'A2552FCVTA', type: 'string'},
                {name: 'A2552TRNCU', type: 'string'},
                {name: 'A2552FBRI1', type: 'string'},
                {name: 'A2552FBRI2', type: 'string'},
                {name: 'A2552FBRI3', type: 'string'},
                {name: 'A2552FBRI4', type: 'string'},
                {name: 'A2552PNR', type: 'string'},
                {name: 'A2552FLAG', type: 'string'},
                {name: 'A2552DCHQ', type: 'string'},
                {name: 'A2552CUR', type: 'string'},
                {name: 'A2552FUENT', type: 'string'},
                {name: 'A2552SFUEN', type: 'string'},
                {name: 'A2552TDOC', type: 'string'},
                {name: 'A2552CIA', type: 'string'},
                {name: 'A2552FORMA', type: 'string'},
                {name: 'A2552SERIE', type: 'string'},
                {name: 'A2552CPN', type: 'string'},
                {name: 'A2552TVNTA', type: 'string'},
                {name: 'MES', type: 'string'},
                {name: 'GROUPED', type: 'string'},
                {name: 'A2552PAVTA', type: 'string'},
                {name: 'A2552TKT', type: 'string'},
                {name: 'A2552ETCU2', type: 'string'},
                {name: 'A2552TFOP', type: 'string'},
                {name: 'A2552CFOP2', type: 'string'},
                {name: 'A2552TTARJ', type: 'string'},
                {name: 'A2552NREF', type: 'string'},
                {name: 'A2552CDIT', type: 'string'},

                {name: 'A2552COMI', type: 'float'},
                {name: 'A2552TARIF', type: 'float'},
                {name: 'A2552TAX', type: 'float'},
                {name: 'A2552CARGO', type: 'float'},
                {name: 'A2552IVA', type: 'float'},
                {name: 'A2552NETO', type: 'float'},
                {name: 'A2552TAXCM', type: 'float'},
                {name: 'A2552SCOMI', type: 'float'},
                {name: 'MONTO', type: 'float'},
                {name: 'A2552PROVI', type: 'float'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    img_clickHandler_save_List: function () {
        var me = this;
        var lstNew = new Array();
        var lstNewMax = new Array();
        var lstNewMin = new Array();
        var vlfte = '';
        var Type = 'YES';
        var message = "";
        var grupo = "";
        var minValue = 5;
        var grid = Ext.getCmp(prototype.id2 + '-gridgrouping');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (Ext.String.trim(row.get('A2552ETCU4')) === 'FA' || Ext.String.trim(row.get('A2552ETCU4')) === 'MP' || Ext.String.trim(row.get('A2552ETCU4')) === 'FC' || Ext.String.trim(row.get('A2552ETCU4')) === 'BK' || Ext.String.trim(row.get('A2552ETCU4')) === 'UP' || Ext.String.trim(row.get('A2552ETCU4')) === 'RT' || Ext.String.trim(row.get('A2552ETCU4')) === 'AP') {
                    Type = 'NOT';
                }
                lstNew.push(row.data);

            }
            if (Type === 'YES') {
                for (var f = 0; f < lstNew.length; f++) {
                    var dblMonto = 0;
                    for (var e = 0; e < lstNew.length; e++) {
                        if (lstNew[f].GROUPED === lstNew[e].GROUPED)
                        {
                            dblMonto += lstNew[e].MONTO;
                        }
                    }
                    if (dblMonto < minValue) {
                        lstNewMin.push(lstNew[f]);
                    } else {
                        lstNewMax.push(lstNew[f]);
                    }
                    if (lstNewMax.length > 0) {
                        global.Msg({
                            msg: 'Are you sure to Save?',
                            icon: 3,
                            buttons: 3,
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                                        msg: 'Please Wait....'
                                    });
                                    mask.show();
                                    Ext.Ajax.request({
                                        url: me.urlWin01 + '/insertTKT/', //url: me.urlWin01 + '/insertTracingFile/',
                                        timeout: 60000000,
                                        method: 'POST',
                                        params: {beanlst: JSON.stringify(lstNewMax)},
                                        success: function (response, options) {
                                            mask.hide();
                                            var res = Ext.JSON.decode(response.responseText);
                                            var vp_icon = 0;
                                            if (res.data === 'RECORD INSERTED') {
                                                vp_icon = 1;
                                            }
                                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                                    if (vp_icon === 1) {
                                                        Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                                        Ext.getCmp(prototype.id2 + '-win').close();

                                                    }


                                                }});
                                        }
                                    });
                                }

                            }
                        });
                    } else {
                        global.Msg({msg: 'There are groups with a value less than the minimum USD 5 required '});
                        return;
                    }
                }
            } else {
                global.Msg({
                    msg: 'Are you sure to Save?',
                    icon: 3,
                    buttons: 3,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                                msg: 'Please Wait....'
                            });
                            mask.show();
                            Ext.Ajax.request({
                                url: me.urlWin01 + '/insertTKT/',
                                timeout: 60000000,
                                method: 'POST',
                                params: {beanlst: JSON.stringify(lstNew)},
                                success: function (response, options) {
                                    mask.hide();
                                    var res = Ext.JSON.decode(response.responseText);
                                    var vp_icon = 0;
                                    if (res.data === 'RECORD INSERTED') {
                                        vp_icon = 1;
                                    }
                                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                            if (vp_icon === 1) {
                                                Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                                Ext.getCmp(prototype.id2 + '-win').close();

                                            }


                                        }});
                                }
                            });
                        }

                    }
                });
            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }

        if (lstNew.length > 0) {
            if (vlfte === 'ASR') {
                var win = new Ext.Praxis.view.salesaudit.ADMReportForm.ADMSeguimietoSubiArchivo({
                    params: {
                        rec: lstNew,
                        url01: prototype.url
                    }
                });
                win.show();
            } else {

            }

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
            return;
        }
    }
});

