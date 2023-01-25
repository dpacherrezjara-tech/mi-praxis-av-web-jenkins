/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryPolizasOracleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPolizasOracleController',
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/OracleReportForm',
    A3406FALTA: '',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStores();
        me.onLoadDataGrid();
    },
    onCmbSourceAfterRender: function (obj) {
        obj.setValue('S');
    },
    setStoresFilters: function () {
        var ComboType = Ext.getCmp(prototype.idDataEntryPolizasOracle + '-ComboType');

        ComboType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "S", "name": "SOAP"},
                {"code": "M", "name": "SN SOAP"}
            ]
        }));

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idDataEntryPolizasOracle + '-gridDataPoliza');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryPolizasOracle + '-gridDataPoliza' + '-store-gridpoliza'
        });

        grid01.setStore(store01);

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSelectClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.idDataEntryPolizasOracle + '-txtProcDate').setValue('');
        //
        Ext.getCmp(prototype.idDataEntryPolizasOracle + '-txtProcDate').setValue(rec.get('FPROC'));

        me.vl_rowIndex = rowIndex;
    },
    onLoadDataGrid: function () {
        var me = this;
        Ext.getCmp(prototype.idDataEntryPolizasOracle + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/searchBspLink/',
            method: 'POST',
            timeout: '300000',
            params: {
                VP_OPCION: '6',
                VP_DATEFROM: '',
                VP_DATETO: '',
                VP_COUNTRY: ''
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idDataEntryPolizasOracle + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idDataEntryPolizasOracle + '-gridDataPoliza').getStore().removeAll();
                Ext.getCmp(prototype.idDataEntryPolizasOracle + '-gridDataPoliza').getStore().loadData(res.data);


            }
        });
    },
    onSaveClick: function () {
        var me = this;
        me.beanTMP.ComboType = Ext.getCmp(prototype.idDataEntryPolizasOracle + '-ComboType').getValue();
        if (me.beanTMP.ComboType === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Type');
            return;
        }
        var lstNewList = new Array();
        var grid = Ext.getCmp(prototype.idDataEntryPolizasOracle + '-gridDataPoliza');

        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                lstNewList.push(row.data);
            }
            if (lstNewList.length > 0) {
                global.Msg({
                    msg: 'Are you sure to Oracle ?',
                    icon: 3,
                    buttons: 3,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryPolizasOracle + '-win'), {
                                msg: 'Please Wait....'
                            });
                            mask.show();
                            Ext.Ajax.request({
                                url: me.urlWin01 + '/ProcExecuteOracle/',
                                timeout: 60000000,
                                method: 'POST',
                                params: {beanlst: JSON.stringify(lstNewList), bean: me.beanTMP},
                                success: function (response, options) {
                                    mask.hide();
                                    var res = Ext.JSON.decode(response.responseText);
                                    console.log(res.data);
                                    var vp_icon = 0;
                                    if (res.data === '0OPERATION WAS SUCCESSFUL') {
                                        vp_icon = 1;
                                    }
                                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                            if (vp_icon === 1) {
                                                if (me.beanTMP.ComboType === 'M') {
                                                    global.getFile(me.urlWin01 + '/downloadPolizasTxt?beanlst=' + JSON.stringify(lstNewList));
                                                    me.onLoadDataGrid();
                                                } else {
                                                    me.onLoadDataGrid();
                                                }

                                            }


                                        }});
                                }
                            });
                        }

                    }
                });

            } else {
                Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
                return;
            }

        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }
    },
    onCloseClick: function (btn) {
        this.view.close();
    }

});
