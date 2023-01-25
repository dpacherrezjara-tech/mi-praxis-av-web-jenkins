Ext.define('Ext.Praxis.controller.sales.SalesAnalysisByAgent.SalesAnalysisByAgentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAnalysisByAgentController',
    requires: [
        'Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info',
        'Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info2',
        'Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info3',
        'Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info4',
        'Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info5'
    ],
    beanXLS: {},
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function() {
        //Ext.get('title-module').update('Sales Analysis');   
        //console.log(prototype.url);
        this.setStoreData();
        this.btnSearch_click();
    },
    onSalesSourceChange: function(cmp, newValue) {
//        switch (newValue) {
//            case 'ASR':
//                Ext.getCmp(prototype.id+'-cmbChannel').enable(true);
//                break;
//            default:
//                Ext.getCmp(prototype.id+'-cmbChannel').disable(true);
//                break;
//        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear());
        //this.loadCountry();
        //this.setValue('cmbCountry', '');
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
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    onGridLoad: function() {
        this.Onsearch();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    activar_filtros: function(opt) {
        Ext.getCmp(prototype.id + '-txt-filter').enable();
        Ext.getCmp(prototype.id + '-txt-filter-num').enable();
        Ext.getCmp(prototype.id + '-txt-filter').focus(true);
        switch (opt) {
            case 1: //By Agent
                Ext.getCmp(prototype.id + '-cmbByOrder_agent').hide();
                Ext.getCmp(prototype.id + '-cmbByOrder').show();
                Ext.getCmp(prototype.id + '-cmbByOrder').enable();
                Ext.getCmp(prototype.id + '-cmbDateYear').enable();
                Ext.getCmp(prototype.id + '-cmbSalesSource').enable();
                Ext.getCmp(prototype.id + '-cmbTransactionType').enable();
                break;
            case 2: //Sumary
                Ext.getCmp(prototype.id + '-cmbByOrder_agent').hide();
                Ext.getCmp(prototype.id + '-cmbByOrder').show();
                Ext.getCmp(prototype.id + '-cmbByOrder').disable();
                Ext.getCmp(prototype.id + '-cmbDateYear').enable();
                Ext.getCmp(prototype.id + '-cmbSalesSource').disable();
                Ext.getCmp(prototype.id + '-cmbTransactionType').enable();
                Ext.getCmp(prototype.id + '-txt-filter').disable();
                Ext.getCmp(prototype.id + '-txt-filter-num').disable();
                break;
            case 3: //agent list
                Ext.getCmp(prototype.id + '-cmbByOrder').hide();
                Ext.getCmp(prototype.id + '-cmbByOrder_agent').show();
                Ext.getCmp(prototype.id + '-cmbDateYear').disable();
                Ext.getCmp(prototype.id + '-cmbSalesSource').disable();
                Ext.getCmp(prototype.id + '-cmbTransactionType').disable();
                break;
            case 4: //net sale
                Ext.getCmp(prototype.id + '-cmbByOrder').show();
                Ext.getCmp(prototype.id + '-cmbByOrder_agent').hide();
                Ext.getCmp(prototype.id + '-cmbDateYear').enable();
                Ext.getCmp(prototype.id + '-cmbSalesSource').enable();
                Ext.getCmp(prototype.id + '-cmbTransactionType').disable();
                Ext.getCmp(prototype.id + '-cmbByOrder').setValue('03');
                break;
            case 5: //net gds
                Ext.getCmp(prototype.id + '-cmbByOrder').show();
                Ext.getCmp(prototype.id + '-cmbByOrder_agent').hide();
                Ext.getCmp(prototype.id + '-cmbDateYear').enable();
                Ext.getCmp(prototype.id + '-cmbSalesSource').enable();
                Ext.getCmp(prototype.id + '-cmbTransactionType').disable();
                Ext.getCmp(prototype.id + '-cmbByOrder').setValue('03');
                Ext.getCmp(prototype.id + '-cmbSalesSource').setValue('');
                break;    
        }
    },
    Onsearch: function() {
        var radio = parseInt(this.getValue('rbtnGroupBy').rbtnGroupBy);
        this.activar_filtros(radio);
        //console.log(radio);
        switch (radio) {
            case 1:
                this.search();
                break;
            case 2:
                this.search01();
                break;
            case 3:
                this.search02();
                break;
            case 4:
                this.search03();
                break;
            case 5:
                this.search04();
                break;
        }
    },
    search: function()
    {
        var bean = {};
        bean.VP_OPCION = this.getValue('cmbByOrder');
        bean.VP_ANIO = this.getValue('cmbDateYear');
        bean.VP_SFTE = this.getValue('cmbSalesSource');
        bean.VP_TRNC = this.getValue('cmbTransactionType');
        bean.VP_IATA = '';
        bean.VP_PSVTA = '';
        bean.VP_PARM1 = this.getValue('txt-filter').trim();
        if (bean.VP_OPCION === '03' || bean.VP_OPCION === '04') {
            bean.VP_PARM1 = this.getValue('txt-filter-num');
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2775");
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
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    search01: function()
    {
        //console.log('search01');
        var bean = {};
        bean.VP_ANIO = this.getValue('cmbDateYear');
        bean.VP_TDOC = this.getValue('cmbTransactionType');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData2', {
            proxy: {
                url: prototype.url + '/search01'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2775");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
            xtype: prototype.id + '-info2',
            id: prototype.id + '-contentInfo2'
        });
        panel.add(gridPanel);
        //Ext.getCmp(prototype.id + '-gridData02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData02').setStore(storeGridDatas);
        //Este grid no tiene paginacion
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas); 
    },
    search02: function() {
        var bean = {};
        bean.VP_OPCION = this.getValue('cmbByOrder_agent');
        bean.VP_IATA = '';
        bean.VP_FTE = '';
        bean.VP_PSVTA = '';
        bean.VP_NAME = '';
        if (bean.VP_OPCION === '01') {
            bean.VP_IATA = this.getValue('txt-filter').trim();
        }
        if (bean.VP_OPCION === '02') {
            bean.VP_NAME = this.getValue('txt-filter').trim();
        }

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData3', {
            proxy: {
                url: prototype.url + '/search02'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A003");
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
            xtype: prototype.id + '-info3',
            id: prototype.id + '-contentInfo3'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData03').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    search03: function() {
        var bean = {};
        var vl_cmbSalesSource = '';
        bean.VP_OPCION = this.getValue('cmbByOrder');
        bean.VP_ANIO = this.getValue('cmbDateYear');
        vl_cmbSalesSource = this.getValue('cmbSalesSource'); //ARCARC
        bean.VP_FTE = vl_cmbSalesSource.substring(0, 3);
        bean.VP_SFTE = vl_cmbSalesSource.substring(3, 6);
        bean.VP_PSVTA = '';
        bean.VP_IATA = '';
        bean.VP_PARM1 = '';

        if (bean.VP_OPCION === '01') {
            bean.VP_IATA = this.getValue('txt-filter').trim();
        }
        if (bean.VP_OPCION === '02') {
            bean.VP_PARM1 = this.getValue('txt-filter').trim();
        }
        if (bean.VP_OPCION === '03' || bean.VP_OPCION === '04') {
            bean.VP_PARM1 = this.getValue('txt-filter-num');
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData4', {
            proxy: {
                url: prototype.url + '/search03'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: XXXX");
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
            xtype: prototype.id + '-info4',
            id: prototype.id + '-contentInfo4'
        });
        panel.add(gridPanel);
        //con el bindStore no funciona columns: summaryType y locked: true 
        Ext.getCmp(prototype.id + '-gridData04').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridData04').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    search04: function(){
        var bean = {};
        var vl_cmbSalesSource = '';
        bean.VP_OPCION = this.getValue('cmbByOrder');
        bean.VP_ANIO = this.getValue('cmbDateYear');
        vl_cmbSalesSource = this.getValue('cmbSalesSource'); //ARCARC
        bean.VP_FTE = vl_cmbSalesSource.substring(0, 3);
        bean.VP_SFTE = vl_cmbSalesSource.substring(3, 6);
        bean.VP_PSVTA = '';
        bean.VP_IATA = '';
        bean.VP_PARM1 = '';

        if (bean.VP_OPCION === '01') {
            bean.VP_IATA = this.getValue('txt-filter').trim();
        }
        if (bean.VP_OPCION === '02') {
            bean.VP_PARM1 = this.getValue('txt-filter').trim();
        }
        if (bean.VP_OPCION === '03' || bean.VP_OPCION === '04') {
            bean.VP_PARM1 = this.getValue('txt-filter-num');
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData5', {
            proxy: {
                url: prototype.url + '/search04'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2818");
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
            xtype: prototype.id + '-info5',
            id: prototype.id + '-contentInfo5'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData05').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridData05').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
        var option_order = Ext.getCmp(prototype.id + '-cmbByOrder').getValue();
        Ext.getCmp(prototype.id + '-txt-filter').show();
        Ext.getCmp(prototype.id + '-txt-filter').focus();
        Ext.getCmp(prototype.id + '-txt-filter-num').hide();
        if (option_order === '03' || option_order === '04') {
            Ext.getCmp(prototype.id + '-txt-filter').hide();
            Ext.getCmp(prototype.id + '-txt-filter-num').show();
            Ext.getCmp(prototype.id + '-txt-filter-num').focus();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">
    onAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log( record.get('typeColumn') );
        switch (record.get('typeColumn')) {
            case 1:
                //console.log(value);
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) === 0 ? '' : value;

                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
                if (Ext.String.trim(record.get('A2775SFTE')) === '' && parseInt(record.get('A2775QTY')) === 0) {
                    if (Ext.String.trim(value) !== '0') {
                        if (Ext.String.trim(value) === '1') {
                            value = '<div style="text-align: center;"><div class="prx-icon-complete prx-icon-base-column"></div><span style="display: inline-block; vertical-align: middle;">Closed</span></div>';
                        } else {
                            var vd = value.split(',');
                            value = vd[0] + vd[1] + vd[2];
                            value = '<div style="text-align: center;"><div class="prx-icon-incomplete prx-icon-base-column"></div><span style="display: inline-block; vertical-align: middle;">' + value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + '</span></div>';
                        }
                    } else {
                        value = '';
                    }
                }
        }

        return value;
    },
    onStringRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                break;
            default:
                value = value;
        }
        return value;
    },
    onAmountPorRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0.00');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = parseInt(value) == 0 ? '' : value;
                break;
            default:
                value = Ext.util.Format.number(value, '0.00');
                if (Ext.String.trim(record.get('A2775SFTE')) === '' && parseInt(record.get('A2775QTY')) === 0) {
                    value = '';
                }
        }
        return value;
    },
    onAmountRenderer03_resta: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "color: red; font-weight: bold;";

        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountRenderer03_suma: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "color: green; ";

        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onCantRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onStringRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = value == '0' ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = value == '0' ? '' : value;
                break;
            default:
                value = value == '0' ? '' : value;
        }
        return value;
    },
    onAmountRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // metaData.style = "color: red; ";
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountPorRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // metaData.style = "color: green; ";
        // var neto = parseFloat(record.get('NETO'));
        // var totvent = parseFloat(record.get('TOTALVENT'));
        //console.log(neto + '<->' + totvent);
        // value = totvent > 0 ? parseFloat(neto / totvent) : 0;
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0.00');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0.00');
                break;
            default:
                //console.log(value);
                value = Ext.util.Format.number(value, '0.00');
        }
        return value;
    }
    // </editor-fold>
});
