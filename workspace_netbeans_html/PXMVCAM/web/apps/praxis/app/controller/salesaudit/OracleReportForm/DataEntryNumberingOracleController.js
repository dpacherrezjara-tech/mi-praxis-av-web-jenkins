/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryNumberingOracleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryNumberingOracleController',
    beanTMP: {},
    url: CONTEXTPATH + '/OracleReportForm',
    /**
     * Constructor
     */
    bean: {},
    vl_rowIndex: 0,
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();

    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-gridDataEntry');


        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryNumberingOracle + '-store-gridDataEntry',
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchBspLink/',
                timeout: 60000000,
                extraParams: {
                    VP_OPCION: '8',
                    VP_DATEFROM: '',
                    VP_DATETO: '',
                    VP_COUNTRY: '',
                    VP_NUMBERADM: ''


                },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.idbspdescarga + '-lbl-total').setText(records[0].data.total);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});
                    }
                }
            }
        });

        grid00.setStore(store00);
    },
    onSelectClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtFTE').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAREA').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtDATE').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAreaDes').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOriginDes').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOrigen').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtType').setValue('');
        //
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtcountry').setValue(rec.get('PAIS'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAREA').setValue(rec.get('AREA'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtFTE').setValue(rec.get('FUENT'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtDATE').setValue(rec.get('FPROC'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAreaDes').setValue(rec.get('AREADES'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOriginDes').setValue(rec.get('BASEDES'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOrigen').setValue(rec.get('BASE'));
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtType').setValue(rec.get('TYPE'));

        me.vl_rowIndex = rowIndex;
    },
    onCancelClick: function (obj) {
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-winDataEntryNumberingOracle').close();
    },
    onProcessClick: function () {
        var me = this;
        var txtcountry = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtcountry').getValue();
        var txtAREA = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAREA').getValue();
        var txtFTE = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtFTE').getValue();
        var txtDATE = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtDATE').getValue();
        var txtOrigen = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOrigen').getValue();
        var txtType = Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtType').getValue();
        if (txtcountry === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Country');
            return;
        }
        if (txtAREA === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Area');
            return;
        }
        if (txtFTE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Source');
            return;
        }
        if (txtDATE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Date');
            return;
        }
        if (txtOrigen === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Origen');
            return;
        }


        var data = 'VP_DATEFROM=' + txtDATE + '&VP_DATETO=' + txtDATE + '&VP_FTE=' + txtFTE + '&VP_COUTRY=' + txtcountry + '&VP_Area=' + txtAREA + '&VP_TYPE=' + txtOrigen + '&VP_Typemasiv=' + txtType;

        global.Msg({
            msg: 'Are you sure to number?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryNumberingOracle + '-winDataEntryNumberingOracle'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/executeNumber/',
                        timeout: 60000000,
                        method: 'POST',
                        params: data,
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = 0;
                            if (res.data === 'PROCESO CULMINADO') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (res.data === 'PROCESO CULMINADO') {
                                        me.SrcBspLinkProcessed();

                                    }


                                }});
                        }
                    });
                }

            }
        });
    },
    SrcBspLinkProcessed: function () {
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtFTE').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAREA').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtDATE').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtAreaDes').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOriginDes').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtOrigen').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-txtType').setValue('');
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-gridDataEntry').getStore().removeAll();
        Ext.getCmp(prototype.idDataEntryNumberingOracle + '-gridDataEntry').getStore().loadPage(1, {
            params: {
                VP_OPCION: '8',
                VP_DATEFROM: '',
                VP_DATETO: '',
                VP_COUNTRY: '',
                VP_NUMBERADM: ''

            }, callback: function (records, operation, success) {
                if (records.length === 0) {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    }


});


