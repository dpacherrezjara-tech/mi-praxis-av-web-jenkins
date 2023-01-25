
Ext.define('Ext.Praxis.controller.sales.AccountingMasterFgForm.AccountingMasterFgFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterFgFormController',

    /**
     * Constructor
     */

    beanTMP: {},
    beanUpdate: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Antes de mostrar...');
        prototype.id = 'AccountingMasterFgForm';
        prototype.id2 = 'dataEntry';
        prototype.url = CONTEXTPATH + '/AccountingMasterInvoiceForm';
        prototype.widthContenedor = 800;
        prototype.heightWindow = 768;
    },
    afterRender: function () {
        this.setStoresGrids();
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchMasterFG',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    onSearchClick: function (btn) {
        var me = this;
        var txtDesc = String(Ext.getCmp(prototype.id + '-txtDesc').getValue());
        me.beanTMP.VP_OPCION = '2';
        me.beanTMP.VP_SUBCU = txtDesc;
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
        store.loadPage(1, {
            params: {beanString: JSON.stringify(me.beanTMP)},
            callback: function (records, operation, success) {
                var currentPage = 1; //Ext.util.Format.number(pagData.currentPage, '0,000');
                var pageCount = 1; //Ext.util.Format.number(pagData.pageCount, '0,000');
                var total = Ext.util.Format.number( records.length, '0,00'); // Ext.util.Format.number(pagData.total, '0,000');
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                if ( records.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }
            }
        });

    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onExcelClick: function (obj) {
        var me = this;
        var txtDesc = String(Ext.getCmp(prototype.id + '-txtDesc').getValue());
        me.beanTMP.VP_OPCION = '2';
        me.beanTMP.VP_SUBCU = txtDesc;
        if (Ext.Object.getSize(me.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSXMasterInvoiceFG?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onClearClick: function (obj) {
        Ext.getCmp(prototype.id + '-txtDesc').setValue("");
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
    },
    onFilterClick: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contenedor-options');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onAddClick: function (obj) {
        this.winDataEntry('I');
    },

    onUpdateClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.AccountingMasterFgForm.DataEntry({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    }


});



