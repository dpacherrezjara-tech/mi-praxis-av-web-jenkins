
Ext.define('Ext.Praxis.controller.salesaudit.OracleReportForm.OracleReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleReportFormController',

    beanTMP: {},
    beanEXCEL: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //alert('Controlador cargado correctamente')
        this.setStoresGrids();

        Ext.getCmp(prototype.idOracleForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },

    OnBeforeShow: function () {
        prototype.idOracleForm = 'OracleReportForm';
        prototype.url = CONTEXTPATH + '/OracleReportForm';
        prototype.idDataEntryNumberingOracle = 'DataEntryNumberingOracle';
        prototype.idDataEntryPolizasOracle = 'DataEntryPolizasOracle';
        prototype.idDataEntryPolizasOracleARC = 'DataEntryPolizasOracleARC';
        prototype.idDataEntryPolizasOracleFRA = 'DataEntryPolizasOracleFRA';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idOracleForm + '-gridData');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idOracleForm + '-store-grid01',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchOracle/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

        Ext.getCmp(prototype.idOracleForm + '-pagginator-01').setStore(store01);

        // Ext.getCmp(prototype.idOracleForm + '-btn-search').fireEvent('click', {});
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idOracleForm + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idOracleForm + '-pagginator-01').disable();
            Ext.getCmp(prototype.idOracleForm + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.idOracleForm + '-pagginator-01').enable();
            Ext.getCmp(prototype.idOracleForm + '-pagginator-legend').show();
        }
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchClick: function (btn) {
        var me = this;

        var txtFilterDateFrom = Ext.getCmp(prototype.idOracleForm + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idOracleForm + '-txtFilterDateTo').getRawValue();

        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idOracleForm + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idOracleForm + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        me.beanTMP.VP_DATEFROM = txtFilterDateFrom;
        me.beanTMP.VP_DATETO = txtFilterDateTo;

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.idOracleForm + '-pagination').getValue() ? 0 : 1;

        // console.log(this.beanTMP);

        Ext.getCmp(prototype.idOracleForm + '-gridData').getStore().removeAll();
        var grid01 = Ext.getCmp(prototype.idOracleForm + '-gridData');
        var store01 = grid01.getStore();

        store01.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                if (records.length === 0) {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });

    },

    onRendererColumDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onAddClick: function () {
        var win = new Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryNumberingOracle({
            params: {
            }
        });
        win.show();
    },
    onpolizasClick: function () {
        var win = new Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracle({
            params: {
            }
        });
        win.show();
    },
    onpolizasArcClick: function () {
        var win = new Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracleARC({
            params: {
            }
        });
        win.show();
    },
    onpolizasFRAClick: function () {
        var win = new Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracleFRA({
            params: {
            }
        });
        win.show();
    },
    onExcelClick: function () {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.idOracleForm + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idOracleForm + '-txtFilterDateTo').getRawValue();

        me.beanEXCEL.VP_DATEFROM = txtFilterDateFrom;
        me.beanEXCEL.VP_DATETO = txtFilterDateTo;

        if (Ext.Object.getSize(me.beanEXCEL) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                    }
                }
            });
        }
    }

});




