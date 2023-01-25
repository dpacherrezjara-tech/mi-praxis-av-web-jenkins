/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.FormformateoCtaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormformateoCtaController',
    Bean: {},
    urlWin01: CONTEXTPATH + '/ADMReport',
    
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrids();
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.idformateoCta + '-MemoNumber').setValue(rec.A2548NMEMO);
        Ext.getCmp( prototype.idformateoCta + '-txtTicket').setValue(rec.A2548TIKET);
        me.Bean.VP_PREME = rec.A2548PREME;
        me.Bean.VP_CNXPA = rec.A2548CNXPA;
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idformateoCta + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchTasaIva',
            params: {beanString: JSON.stringify(me.Bean)},
            success: function (records, operation, success) {
                mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.idformateoCta + '-gridTKT').getStore().loadData(res.data);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


                //Ext.getCmp(prototype.id0 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
        
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idformateoCta + '-gridTKT');

        var store01 = Ext.create('Ext.data.Store', {
            storeId:prototype.idformateoCta + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onRendererColumnOnTicket: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id0 + \'-form\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    }
    
});



