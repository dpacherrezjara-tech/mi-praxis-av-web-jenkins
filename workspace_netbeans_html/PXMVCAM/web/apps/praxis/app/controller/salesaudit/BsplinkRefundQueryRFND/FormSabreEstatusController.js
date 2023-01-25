/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormSabreEstatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormSabreEstatusController',

    beanTMP: {},
    beanTMP2: {},
    urlWin01: CONTEXTPATH + '/BsplinkRefundQueryRFND',
    urlWin02: '',

    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        // console.log(this.view.params)
        // this.urlWin01 = Ext.String.trim(this.view.params.url01);
        if (me.view.params.rec_flagsoli === 'F') {
            Ext.getCmp(prototype.idSabreEstatus + '-btnprocessing').hide();
        } else {
            Ext.getCmp(prototype.idSabreEstatus + '-btnprocessing').show();
        }
        this.setStoresGrids();
        this.onLoadGrids();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idSabreEstatus + '-gridDataStatus');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idSabreEstatus + '-store-gridDataStatus'
        });

        grid01.setStore(store01);

    },
    onSabreStatusClick: function () {
        var me = this;
        me.beanTMP2.IN_PREME = me.view.params.rec_preme;
        me.beanTMP2.IN_TIPO = '1';

        Ext.getCmp(prototype.idSabreEstatus + '-txtNumber').setValue(me.view.params.rec_number);
        Ext.getCmp(prototype.idSabreEstatus + '-txtSNumber').setValue(me.view.params.rec_tkt);
        Ext.getCmp(prototype.idSabreEstatus + '-txtAplidate').setValue(me.view.params.rec_aplidate);
        Ext.getCmp(prototype.idSabreEstatus + '-gridDataStatus').getStore().removeAll();
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idSabreEstatus + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/searchSabreLst',
            params: {beanString: JSON.stringify(me.beanTMP2)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.idSabreEstatus + '-gridDataStatus').getStore().loadData(res.data);
                    Ext.getCmp(prototype.idSabreEstatus + '-txtcpnsRFND').setValue(res.data[0].A3908CPNS);
                    if (res.data[0].A3908FLAG !== 0) {
                        Ext.getCmp(prototype.id01 + '-win').getController().onLoadCargaData();
                        Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('REJECTED');
                        Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                    }
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id7 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    onLoadGrids: function () {
        var me = this;
        me.beanTMP.IN_PREME = me.view.params.rec_preme;
        me.beanTMP.IN_TIPO = '0';
        Ext.getCmp(prototype.idSabreEstatus + '-txtNumber').setValue(me.view.params.rec_number);
        Ext.getCmp(prototype.idSabreEstatus + '-txtSNumber').setValue(me.view.params.rec_tkt);
        Ext.getCmp(prototype.idSabreEstatus + '-txtAplidate').setValue(me.view.params.rec_aplidate);
        Ext.getCmp(prototype.idSabreEstatus + '-gridDataStatus').getStore().removeAll();
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idSabreEstatus + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/searchSabreLst',
            params: {beanString: JSON.stringify(me.beanTMP)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.idSabreEstatus + '-gridDataStatus').getStore().loadData(res.data);
                    Ext.getCmp(prototype.idSabreEstatus + '-txtcpnsRFND').setValue(res.data[0].A3908CPNS);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id7 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    }



});