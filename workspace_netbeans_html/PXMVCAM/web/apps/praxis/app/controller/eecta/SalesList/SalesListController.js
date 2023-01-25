Ext.define('Ext.Praxis.controller.eecta.SalesList.SalesListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesListController',
    requires: [
       'Ext.Praxis.view.eecta.SalesListForm.InfoGrid'
    ],
    beanXLS: {},
    recGrid01: {},
    recGrid02: {},
    recGrid03: {},
    page_current: 0,
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function() {       
        //this.setStoreData(); 
        this.cmbfiltro_clickHandler();
        this.Onsearch();        
    },
     cmbfiltro_clickHandler: function() {
        var selectedValue =  Ext.getCmp(prototype.id + '-cmbfiltro').getValue();         
        Ext.getCmp(prototype.id+'-BoxFilter01').hide();
        Ext.getCmp(prototype.id+'-BoxFilter02').hide();
        Ext.getCmp(prototype.id+'-BoxFilter03').hide();
        Ext.getCmp(prototype.id+'-BoxFilter04').hide();                
        switch(selectedValue){
            case '1': 
                Ext.getCmp(prototype.id+'-BoxFilter01').show();
                Ext.getCmp(prototype.id+'-fecha1').focus();
                break;
            case '2':                
                Ext.getCmp(prototype.id+'-BoxFilter02').show();                
                Ext.getCmp(prototype.id+'-CDCLI').focus();
                break;
             case '3':                
                Ext.getCmp(prototype.id+'-BoxFilter03').show();                
                Ext.getCmp(prototype.id+'-RSOCI').focus();
                break;
            case '4':                
                Ext.getCmp(prototype.id+'-BoxFilter04').show();
                Ext.getCmp(prototype.id+'-NRRPT').focus();
                break;
        }
    },
    setStoreData: function() {
//        var storeComboDataYear = win.getStoreYear(false);
//        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear() - 1);
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.Onsearch();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function(obj, e) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    global.getFile(prototype.url + '/getXLSXAPI?beanString=' + encodeURI(JSON.stringify(this.beanXLS)));
//                }
//            }
//        });
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {

        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible() && this.page_current === 1) {
            global.showMenu();
        }
        Ext.getCmp(prototype.id + '-cont-filter00').hide();
        Ext.getCmp(prototype.id + '-cont-filter01').hide();
        Ext.getCmp(prototype.id + '-cont-filter02').hide();
        Ext.getCmp(prototype.id + '-cont-filter03').hide();
        if (this.page_current > 1)
            this.page_current = this.page_current - 1;
        if (this.page_current === 1)
            Ext.getCmp(prototype.id + '-cont-filter00').show();
        if (this.page_current === 2)
            Ext.getCmp(prototype.id + '-cont-filter01').show();
        if (this.page_current === 3)
            Ext.getCmp(prototype.id + '-cont-filter02').show();
        if (this.page_current === 4)
            Ext.getCmp(prototype.id + '-cont-filter03').show();
        this.Onsearch();

    },
    // </editor-fold>    
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    Onsearch: function() {
        this.search();
    },
    search: function()
    {
        //this.page_current = 1;        
        //console.log('page: ' + this.page_current);        
        Ext.getCmp(prototype.id + '-boxPaginacion').show();        
        var bean = {};
        bean.VP_OPCION = Ext.getCmp(prototype.id + '-cmbfiltro').getValue();
        bean.VP_FDATE1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(),'Ymd');
        bean.VP_FDATE2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(),'Ymd');
        bean.VP_CDCLI  = Ext.getCmp(prototype.id + '-CDCLI').getValue();
        bean.VP_RSOCI = Ext.getCmp(prototype.id + '-RSOCI').getValue();
        bean.VP_NRRPT = Ext.getCmp(prototype.id + '-NRRPT').getValue();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.SalesList.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3957");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    onReportVentaUATP_PDF: function ( grid, rowIndex, colIndex ) {
        if (Ext.getCmp(prototype.id + '-gridData')) {
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);            
            this.gridData = rec;
        }
        var bean = {};
        bean.VP_A3957NRRPT = this.gridData.get('A3957NRRPT');
        bean.VP_A3957CDCLI = this.gridData.get('A3957CDCLI');        
        this.exportPdf(prototype.url + '/pdf_reportVentaUATP/?beanString=' + encodeURI(JSON.stringify(bean)) );
    },
    exportPdf: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download report Pdf ?',
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
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onCmbByOrder: function() {
//        var option_order = Ext.getCmp(prototype.id + '-cmbByOrder').getValue();
//        Ext.getCmp(prototype.id + '-txt-filter').show();
//        Ext.getCmp(prototype.id + '-txt-filter').focus();
//        Ext.getCmp(prototype.id + '-txt-filter-num').hide();
//        if (option_order === '03' || option_order === '04') {
//            Ext.getCmp(prototype.id + '-txt-filter').hide();
//            Ext.getCmp(prototype.id + '-txt-filter-num').show();
//            Ext.getCmp(prototype.id + '-txt-filter-num').focus();
//        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">
    onStringRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
//            case 1:
//                value = value;
//            break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                break;
//            default:
//                value = value;
        }
        return value;
    },
    onAmountRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000.00');
                value = parseInt(value) === 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000.00');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000.00');
        }
        return value;
    },
    onAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onMonthStringRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log(value.substring(4,6));
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        var valor = m[parseInt(value.substring(4, 6)) - 1] + ' - ' + value.substring(0, 4);
        return valor;
        //return '<a href="#gds_analysis" onclick="Ext.getCmp(\'App-Gds_analysis-Contenedor\').getController().onDetailFlownClick00(' + rowIndex + ');">' + valor + '</a>';
    }
    // </editor-fold>
});



