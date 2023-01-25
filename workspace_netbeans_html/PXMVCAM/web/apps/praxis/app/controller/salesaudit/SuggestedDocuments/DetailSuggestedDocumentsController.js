/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.SuggestedDocuments.DetailSuggestedDocumentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailSuggestedDocumentsController',
    bean: {},
    bean2: {},
    beanINI: {},
    /**
     * Constructor
     */

    init: function(view) {
        var me = this;

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.setStores();
        Ext.getCmp(prototype.id2 + '-pagginator-01').getCmpPaginator().on('beforechange', this.onPagingBeforeChange01, this);
        this.imgSearch_clickHandler();
    },
    onPagingBeforeChange01: function(obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() != 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.beanINI),
            totRow: totRow
        };
    },
    imgExcel_clickHandler: function(obj, e) {
        this.imgSearch_clickHandler(true);
    },
    setStores: function() {
        var grid01 = Ext.getCmp(prototype.id2 + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url2 + '/SearchReportDetail/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 20
        });
        grid01.setStore(store01);
        /**
         * Se asigna data stores a paginadores
         */
        Ext.getCmp(prototype.id2 + '-pagginator-01').setStore(store01);

    },
    initial_detalle: function(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,Type) {
        this.beanINI.VP_OPTION = ComboBy;
        this.beanINI.VP_DATEFROM = data.A1672FPROC;
        if(Type==='G'){
            this.beanINI.VP_FLAG = "";
            this.beanINI.VP_SOURCE = "";
        }else{
            this.beanINI.VP_FLAG = Type;
            this.beanINI.VP_SOURCE = data.A1672FUENT;
        }
        this.beanINI.VP_CUR = TxtCurrency;
        this.beanINI.VP_PAIS = TxtCountry;//data.A3389PAIS;
        this.beanINI.VP_IATA = TxtIATA;//data.A3389IATA;
        if(TxtUser==='BY'){
            this.beanINI.VP_USER = data.A1672REVIS;
        }else{
            this.beanINI.VP_USER = TxtUser;
        }
        
       
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
    },
    initial_detalle_GN: function(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,Type) {
        if(ComboBy==='1'){
            this.beanINI.VP_OPTION = '3';
        }else{
            this.beanINI.VP_OPTION = '4';
        }
        
        this.beanINI.VP_DATEFROM = data.A1672FPROC;
        if(Type==='G'){
            this.beanINI.VP_FLAG = "";
            this.beanINI.VP_SOURCE = "";
        }else{
            this.beanINI.VP_FLAG = Type;
            this.beanINI.VP_SOURCE = data.A1672FUENT;
        }
        this.beanINI.VP_CUR = TxtCurrency;
        this.beanINI.VP_PAIS = TxtCountry;//data.A3389PAIS;
        this.beanINI.VP_IATA = TxtIATA;//data.A3389IATA;
        if(TxtUser==='BY'){
            this.beanINI.VP_USER = data.A1672REVIS;
        }else{
            this.beanINI.VP_USER = TxtUser;
        }
        
       
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1; 
    },
    
    
    
    imgSearch_clickHandler: function(obj, records, eOpts) {
        this.SearchReportDetail(this.beanINI, obj === true ? obj : false);
    },
    onCloseClick: function(btn) {
        this.view.close();
    },
    imgSearch_clickChkChange: function() {
        this.bean2= this.beanINI;
        this.bean2.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
        this.SearchReportDetail(this.bean2); 
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts) {
        //Ext.getCmp(prototype.id2 + '-btn-search').fireEvent('click', {});//imgSearch_clickHandler
        if (!newValue) {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.id2 + '-pagginator-01').disable();
            Ext.getCmp(prototype.id2 + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.id2 + '-lbl-pageCount').hide();
        } else {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.id2 + '-pagginator-01').enable();
            Ext.getCmp(prototype.id2 + '-lbl-currentPage').show();
            Ext.getCmp(prototype.id2 + '-lbl-pageCount').show();
        }
    },
    SearchReportDetail: function(bean, bExcel) {
        if (bExcel) {
            var me = this;
            me.exportExcel(prototype.url2 + '/getXLSXdetail?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {

            Ext.getCmp(prototype.id2 + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id2 + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function(records, operation, success) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.id2 + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        //Ext.getCmp( prototype.id2 + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }

                }
            });
        }



    },
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function(obj, e) {
        this.imgSearch_clickHandler();
    },
    onFilterClick: function() {
        var option = Ext.getCmp(prototype.id2 + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    }
});



