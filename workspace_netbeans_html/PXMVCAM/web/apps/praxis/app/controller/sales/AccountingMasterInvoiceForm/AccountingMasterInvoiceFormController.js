
Ext.define('Ext.Praxis.controller.sales.AccountingMasterInvoiceForm.AccountingMasterInvoiceFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterInvoiceFormController',
    /**
     * Constructor
     */
    beanTMP: {},
    beanUpdate: {},
    init: function(view) {
        var me = this;

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    OnBeforeShow: function() {
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Antes de mostrar...');
        prototype.id = 'AccountingMasterInvoiceForm';
        prototype.id2 = 'dataEntry';
        prototype.url = CONTEXTPATH + '/AccountingMasterInvoiceForm';
        prototype.widthContenedor = 1360;
        prototype.heightWindow = 768;
    },
    afterRender: function() {
        this.setStoresGrids();
    },
    setStoresGrids: function() {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchMaster',
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
    onSearchkey: function(f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    onSearchClick: function(btn) {
        var me = this;
        var txtCuent = String(Ext.getCmp(prototype.id + '-txtCuent').getValue());
        var txtSubCuent = String(Ext.getCmp(prototype.id + '-txtSubCuent').getValue());
        me.beanTMP.VP_OPCION = '1';
        me.beanTMP.VP_CUENTA = txtCuent;
        me.beanTMP.VP_SUBCU = txtSubCuent;
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
        store.loadPage(1, {
            params: {beanString: JSON.stringify(me.beanTMP)},
            callback: function(records, operation, success) {
                //console.log(records.length);  
                //var pag = Ext.getCmp(prototype.id + '-paggin');
                //var pagData = pag.getPageData();
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
    onRendererColumn: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onExcelClick: function(obj) {
        var me = this;
        var txtCuent = String(Ext.getCmp(prototype.id + '-txtCuent').getValue());
        var txtSubCuent = String(Ext.getCmp(prototype.id + '-txtSubCuent').getValue());
        me.beanTMP.VP_OPCION = '1';
        me.beanTMP.VP_CUENTA = txtCuent;
        me.beanTMP.VP_SUBCU = txtSubCuent;

        if (Ext.Object.getSize(me.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onClearClick: function(obj) {
        Ext.getCmp(prototype.id + '-txtCuent').setValue("");
        Ext.getCmp(prototype.id + '-txtSubCuent').getValue("");
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
    },
    onFilterClick: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contenedor-options');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onAddClick: function(obj) {
        this.winDataEntry('I');
    },
    onUpdateClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.AccountingMasterInvoiceForm.DataEntry({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    }


});

