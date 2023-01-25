/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.DownloadbsplinkForm.DataEntryDownloadbsplinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idDataEntryDownload + '-DataEntryDownloadbsplinkController',
    url: CONTEXTPATH + '/DownloadbsplinkForm',
    lblPreffixOld: '',
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
        var grid00 = Ext.getCmp(prototype.idDataEntryDownload + '-gridDataEntry');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryDownload + '-store-gridDataEntry',
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchProcessedBspLink',
                timeout: 60000000,
                extraParams: {
                    VP_OPCION: '4',
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
        Ext.getCmp(prototype.idDataEntryDownload + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFTE').setValue('');
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFCONT').setValue('');
        //
        Ext.getCmp(prototype.idDataEntryDownload + '-txtcountry').setValue(rec.get('PAIS'));
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFCONT').setValue(rec.get('FCONT'));
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFTE').setValue(rec.get('FTE'));
        me.vl_rowIndex = rowIndex;
    },
    onCancelClick: function (obj) {
        Ext.getCmp(prototype.idDataEntryDownload + '-win-DataEntryDownloadbsplink').close();
    },
    onProcessClick: function () {
        var me = this;
        var txtcountry = Ext.getCmp(prototype.idDataEntryDownload + '-txtcountry').getValue();
        var txtFCONT = Ext.getCmp(prototype.idDataEntryDownload + '-txtFCONT').getValue();
        var txtFTE = Ext.getCmp(prototype.idDataEntryDownload + '-txtFTE').getValue();
        if (txtcountry === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Country');
            return;
        }
        if (txtFCONT === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Country');
            return;
        }
        if (txtFTE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one Source');
            return;
        }
        var vl_NUMBERADM = '';
        var vl_TRANSACTION = 'ADM';
        var vl_STATUS = 'PROC';

        var data = 'VP_COUNTRY=' + txtcountry + '&VP_FCONT=' + txtFCONT + '&VP_FTE=' + txtFTE + '&VP_NUMBERADM=' + vl_NUMBERADM + '&VP_TRANSACTION=' + vl_TRANSACTION + '&VP_STATUS=' + vl_STATUS;

        global.Msg({
            msg: 'Are you sure to BSPLINK?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryDownload + '-win-DataEntryDownloadbsplink'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                   Ext.Ajax.request({
                        url: prototype.url + '/ProcessedBspLink/',
                        timeout: 60000000,
                        method: 'POST',
                        params: data,
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //console.log(res.data);
                            var vp_icon = 0;
                            if (res.data === '0 REGISTROS ENCONTRADOS') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (res.data === '0 REGISTROS ENCONTRADOS') {
                                         global.getFile(prototype.url + '/exportTxt?VP_OPCION=3&VP_COUNTRY=' + txtcountry
                                                + '&VP_NUMBERADM=' + vl_NUMBERADM
                                                + '&VP_FCONT=' + txtFCONT
                                                + '&VP_TRANSACTION=' + vl_TRANSACTION
                                                + '&VP_STATUS=' + vl_STATUS
                                                + '&VP_FTE=' + txtFTE
                                                );
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
        Ext.getCmp(prototype.idDataEntryDownload + '-txtcountry').setValue('');
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFCONT').setValue('');
        Ext.getCmp(prototype.idDataEntryDownload + '-txtFTE').setValue('');
        Ext.getCmp(prototype.idDataEntryDownload + '-gridDataEntry').getStore().removeAll();
        Ext.getCmp(prototype.idDataEntryDownload + '-gridDataEntry').getStore().loadPage(1, {
            params: {
                VP_OPCION: '4',
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


