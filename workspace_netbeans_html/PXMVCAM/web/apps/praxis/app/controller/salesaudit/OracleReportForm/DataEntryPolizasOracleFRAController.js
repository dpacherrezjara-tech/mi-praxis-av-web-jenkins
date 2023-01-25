/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryPolizasOracleFRAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPolizasOracleFRAController',
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
        me.setStores();
        me.onLoadDataGrid();
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-gridDataPolizaFRA');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryPolizasOracleFRA + '-gridDataPolizaFRA' + '-store-gridpoliza'
        });

        grid01.setStore(store01);

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onLoadDataGrid: function () {
        var me = this;
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtProcDate').setValue('');
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/searchBspLink/',
            method: 'POST',
            timeout: '300000',
            params: {
                VP_OPCION: '9',
                VP_DATEFROM: '',
                VP_DATETO: '',
                VP_COUNTRY: ''
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-gridDataPolizaFRA').getStore().removeAll();
                Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-gridDataPolizaFRA').getStore().loadData(res.data);


            }
        });
    },
    onSaveClick: function () {
        var me = this;
        var lstNewList = new Array();
        var grid = Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-gridDataPolizaFRA');
        if (Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtcountry').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one country');
            return;
        }
        if (Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtProcDate').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Date');
            return;
        }

        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                lstNewList.push(row.data);
            }
            if (lstNewList.length > 0) {
                if (lstNewList.length !== 1) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You only have to select one record');
                    return;
                }

                global.Msg({
                    msg: 'Are you sure to Oracle FRA?',
                    icon: 3,
                    buttons: 3,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-win'), {
                                msg: 'Please Wait....'
                            });
                            mask.show();
                            Ext.Ajax.request({
                                url: me.urlWin01 + '/ProceOracleASR/',
                                timeout: 60000000,
                                method: 'POST',
                                params: {beanlst: JSON.stringify(lstNewList)},
                                success: function (response, options) {
                                    mask.hide();
                                    var res = Ext.JSON.decode(response.responseText);
                                    console.log(res.data);
                                    var vp_icon = 0;
                                    if (res.data === 'OPERATION WAS SUCCESSFUL') {
                                        vp_icon = 1;
                                    }
                                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                            if (vp_icon === 1) {
                                                global.getFile(me.urlWin01 + '/downloadPolizasASRFRATxt?beanlst=' + JSON.stringify(lstNewList));
                                                me.onLoadDataGrid();

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
    },
    onSelectClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtProcDate').setValue('');
        //
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtProcDate').setValue(rec.get('FPROC'));
        Ext.getCmp(prototype.idDataEntryPolizasOracleFRA + '-txtcountry').setValue(rec.get('PAIS'));
    }

});
