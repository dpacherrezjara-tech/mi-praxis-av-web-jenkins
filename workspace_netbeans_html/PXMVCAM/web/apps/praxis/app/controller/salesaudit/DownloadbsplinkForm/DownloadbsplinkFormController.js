
Ext.define('Ext.Praxis.controller.salesaudit.DownloadbsplinkForm.DownloadbsplinkFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadbsplinkFormController',

    /**
     * Constructor
     */
    bean: {},
    bean2: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();
        Ext.getCmp(prototype.idbspdescarga + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idbspdescarga = 'DownloadbsplinkForm';
        prototype.idDataEntryDownload = 'DataEntryDownloadbsplink';
        prototype.url = CONTEXTPATH + '/DownloadbsplinkForm';
        prototype.widthWindow = 1000;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idbspdescarga + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idbspdescarga + '-pagginator-01').disable();
            Ext.getCmp(prototype.idbspdescarga + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.idbspdescarga + '-lbl-pageCount').hide();
        } else {
            Ext.getCmp(prototype.idbspdescarga + '-pagginator-01').enable();
            Ext.getCmp(prototype.idbspdescarga + '-lbl-currentPage').show();
            Ext.getCmp(prototype.idbspdescarga + '-lbl-pageCount').show();
        }
    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idbspdescarga + '-grid');
        var grid02 = Ext.getCmp(prototype.idbspdescarga + '-gridDetalle');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idbspdescarga + '-store-grid00',
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

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchDetail/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);
        grid02.setStore(store02);

        Ext.getCmp(prototype.idbspdescarga + '-pagginator-01').setStore(store00);
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.VP_OPCION = "1";
        me.bean.VP_COUNTRY = "";
        me.bean.VP_NUMBERADM = "";
        me.bean.VP_DATEFROM = Ext.getCmp(prototype.idbspdescarga + '-txtFilterDateFrom').getRawValue();
        me.bean.VP_DATETO = Ext.getCmp(prototype.idbspdescarga + '-txtFilterDateTo').getRawValue();
        me.bean.pexcel = Ext.getCmp(prototype.idbspdescarga + '-pagination').getValue() ? 0 : 1;

        me.Search(me.bean, obj === true ? obj : false);
    },
    Search: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idbspdescarga + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idbspdescarga + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.idbspdescarga + '-lbl-total').setText(records[0].data.total);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});
                    }

                }
            });
        }
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
    },
    onAddClick: function () {
        var win = new Ext.Praxis.view.salesaudit.DownloadbsplinkForm.DataEntryDownloadbsplink({
            params: {
                url01: prototype.url
            }
        });
        win.show();
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {

        var color = '#FFFFFF';
        switch (String(Ext.String.trim(record.get('ESTADO')))) {
            case 'PROC':
                color = '#81F7BE';
                value = 'PROCESSED';
                break;
            case 'Y':
                color = '#CCFF00';
                value = 'PENDING';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onBackClick: function(obj, e) {
        Ext.getCmp(prototype.idbspdescarga + '-grid').setVisible(true);
        Ext.getCmp(prototype.idbspdescarga + '-lbl-total').setVisible(true);

        Ext.getCmp(prototype.idbspdescarga + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.idbspdescarga + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idbspdescarga + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idbspdescarga + '-btn-back').setVisible(false);
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idbspdescarga+ \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function (rowIndex) {
        var me = this;
        var grid = Ext.getCmp(prototype.idbspdescarga + '-grid');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        Ext.getCmp(prototype.idbspdescarga + '-grid').setVisible(false);
        Ext.getCmp(prototype.idbspdescarga + '-lbl-total').setVisible(false);

        Ext.getCmp(prototype.idbspdescarga + '-gridDetalle').setVisible(true);
        Ext.getCmp(prototype.idbspdescarga + '-lbl-totalDeta').setVisible(true);
        Ext.getCmp(prototype.idbspdescarga + '-btn-back').setVisible(true);
        ///CARGANDO EL DETALLE DE LA GRTILLA 
        me.bean2.VP_OPCION = '2';
        me.bean2.VP_DATEFROM = rec.data.FPROC.substr(4, 2);
        me.bean2.VP_DATETO = rec.data.FPROC.substr(6, 2);
        me.bean2.VP_COUNTRY = rec.data.COUNTRY;
        me.bean2.VP_NUMBERADM = "";
        Ext.getCmp(prototype.idbspdescarga + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idbspdescarga + '-gridDetalle').getStore().loadPage(1, {
             params: me.bean2,
             callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records.length);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    }

});

