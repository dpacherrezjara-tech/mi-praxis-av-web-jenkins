
Ext.define('Ext.Praxis.controller.tnu.AtlUsageNoSale.AtlUsageNoSaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AtlUsageNoSaleController',
    beanTMP: {},
    /**
     * Constructor
     */
    init: function() {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function()
    {
//        alert('afterRender..');
        Ext.getCmp(prototype.id + '-tkt').focus(true);
        this.set_data_combo01();
        this.set_data_combo02();
        this.setGridData();
        
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    onSearchClick: function()
    {
        this.setGridData();
    },
    setGridData: function()
    {
        var me = this;
        var psearch_type = Ext.getCmp(prototype.id + '-search-type').getValue();
        var ptkt_air = Ext.getCmp(prototype.id + '-tkt-air').getValue();
        var ptkt = Ext.getCmp(prototype.id + '-tkt').getValue();
        var pfecha1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd').trim();
        var pfecha2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd').trim();
        var ptuse = Ext.getCmp(prototype.id + '-tuse').getValue();
        var piata = Ext.getCmp(prototype.id + '-iata').getValue();
        var pfiltr_status = Ext.getCmp(prototype.id + '-filtr-status').getValue();

        me.beanTMP.VP_FILTRO = psearch_type;
        me.beanTMP.VP_TICKET = ptkt_air + ptkt;
        me.beanTMP.VP_FECHA1 = pfecha1;
        me.beanTMP.VP_FECHA2 = pfecha2;
        me.beanTMP.VP_TRXN = ptuse;
        me.beanTMP.VP_IATA = piata;
        me.beanTMP.VP_ESTA = pfiltr_status.rbfiltrST;
        win.lblUser_toolTip("Estructura: A1544NEW");

        var storeGridDatas = Ext.create('Ext.Praxis.store.tnu.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanTMP;
                },
                load: function(obj) {
                    
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    
//                    console.log(pagData);
                    
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        //global.clear();
        Ext.getCmp(prototype.id + '-grid').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    onExcelClick: function(obj)
    {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        //global.getFile(prototype.url + '/VNRexportXLS?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                        global.getFile(prototype.url + '/getATLVNRXLS?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));                        
                    }
                }
            });
        }
    },
    onTextoClick: function(){  
        console.log(this.beanTMP);
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download texto ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
//                        global.getFile(prototype.url + '/getATLVNRTexto?beanString=' + encodeURI(JSON.stringify(this.beanTMP))); //API
                        global.getFile(prototype.url + '/downloadText?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onFilterClick: function()
    {
        var option = Ext.getCmp(prototype.id + '-contenedor-filters-form');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    onClearClick: function()
    {
        //no aplica
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts)
    {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    setFilter: function(precord) {               
        switch (precord.data.code) {
            case '1': // TICKET NUMBER
                Ext.getCmp(prototype.id + '-tkt-air').setHidden(false);
                Ext.getCmp(prototype.id + '-tkt').setHidden(false);
                Ext.getCmp(prototype.id + '-fecha1').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha2').setHidden(true);
                Ext.getCmp(prototype.id + '-tuse').setHidden(true);
                Ext.getCmp(prototype.id + '-iata').setHidden(true);
                Ext.getCmp(prototype.id + '-tkt').focus(true);
                break;
            case '2'://Procesing Date
                Ext.getCmp(prototype.id + '-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id + '-tkt').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').setHidden(false);
                Ext.getCmp(prototype.id + '-fecha2').setHidden(false);
                Ext.getCmp(prototype.id + '-tuse').setHidden(true);
                Ext.getCmp(prototype.id + '-iata').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').focus(true);
                break;
            case '3'://Usage date
                Ext.getCmp(prototype.id + '-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id + '-tkt').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').setHidden(false);
                Ext.getCmp(prototype.id + '-fecha2').setHidden(false);
                Ext.getCmp(prototype.id + '-tuse').setHidden(true);
                Ext.getCmp(prototype.id + '-iata').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').focus(true);
                break;
            case '4'://IATA
                Ext.getCmp(prototype.id + '-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id + '-tkt').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha2').setHidden(true);
                Ext.getCmp(prototype.id + '-tuse').setHidden(true);
                Ext.getCmp(prototype.id + '-iata').setHidden(false);
                Ext.getCmp(prototype.id + '-iata').focus(true);
                break;
            case '5'://usage
                Ext.getCmp(prototype.id + '-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id + '-tkt').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha1').setHidden(true);
                Ext.getCmp(prototype.id + '-fecha2').setHidden(true);
                Ext.getCmp(prototype.id + '-tuse').setHidden(false);
                Ext.getCmp(prototype.id + '-iata').setHidden(true);
                Ext.getCmp(prototype.id + '-tuse').focus(true);
                break;
        }
    },
    set_data_combo01: function()
    {
        Data00 = Ext.create('Ext.data.ArrayStore', {
            storeId: 'theStore',
            data: [
                ["1", "Ticket Number"],
                ["2", "Procesing Date"],
                ["3", "Usage date"],
                ["4", "IATA"],
                ["5", "Usage"]
            ],
            fields: ['code', 'name']
        });
        combo01 = Ext.getCmp(prototype.id + '-search-type');
        combo01.setStore(Data00);
        combo01.setValue('1');
    },
    set_data_combo02: function()
    {
        Data00 = Ext.create('Ext.data.ArrayStore', {
            storeId: 'theStore',
            data: [
                ["", "All"],
                ["V", "FLWN"],
                ["E", "EXCH"],
                ["R", "RFND"],
                ["I", "IPAY"],
                ["C", "BREAKAGE"]
            ],
            fields: ['code', 'name']
        });
        combo02 = Ext.getCmp(prototype.id + '-tuse');
        combo02.setStore(Data00);
        combo02.setValue('');
    }
});




