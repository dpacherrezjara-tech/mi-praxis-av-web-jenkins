
Ext.define('Ext.Praxis.controller.payments.SpainInvoiceForm.SpainInvoiceFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SpainInvoiceFormController',

    /**
     * Constructor
     */

    bean: {},
    beanProc: {},
    init: function (view) {
        var me = this;

    },

    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */

        prototype.idSpainInvoice = 'SpainInvoiceForm';
        prototype.url = CONTEXTPATH + '/SpainInvoiceForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idSpainInvoice + '-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "Processing Date"}
            ]
        }));


    },

    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idSpainInvoice + '-gridSpain');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRefunddirectsale + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

    },

    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateTo').getRawValue();
        me.bean.VP_OPCION = Ext.getCmp(prototype.idSpainInvoice + '-search-type').getValue();
        me.bean.VP_FROM = txtFilterDateFrom.replaceAll('/', '');
        me.bean.VP_TO = txtFilterDateTo.replaceAll('/', '');

        if (txtFilterDateFrom === '' && txtFilterDateTo === '') {
            global.Msg({msg: 'Enter Date '});
            return;
        }
        if (txtFilterDateFrom !== '') {
            if (txtFilterDateTo === '') {
                global.Msg({msg: 'Enter Date To'});
                return;
            }
        }
        if (txtFilterDateTo !== '') {
            if (txtFilterDateFrom === '') {
                global.Msg({msg: 'Enter Date From'});
                return;
            }
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }



        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));

        } else {

            Ext.getCmp(prototype.idSpainInvoice + '-gridSpain').getStore().removeAll();
            Ext.getCmp(prototype.idSpainInvoice + '-gridSpain').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });



        }
    },
    exportText: function () {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateTo').getRawValue();
        var VP_OPCION = Ext.getCmp(prototype.idSpainInvoice + '-search-type').getValue();

        if (txtFilterDateFrom === '' && txtFilterDateTo === '') {
            global.Msg({msg: 'Enter Date '});
            return;
        }
        if (txtFilterDateFrom !== '') {
            if (txtFilterDateTo === '') {
                global.Msg({msg: 'Enter Date To'});
                return;
            }
        }
        if (txtFilterDateTo !== '') {
            if (txtFilterDateFrom === '') {
                global.Msg({msg: 'Enter Date From'});
                return;
            }
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSpainInvoice + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }
        global.getFile(prototype.url + '/export_Xls?VP_OPCION=' + VP_OPCION + '&VP_FROM=' + txtFilterDateFrom.replaceAll('/', '') + '&VP_TO=' + txtFilterDateTo.replaceAll('/', ''));
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    }
});


