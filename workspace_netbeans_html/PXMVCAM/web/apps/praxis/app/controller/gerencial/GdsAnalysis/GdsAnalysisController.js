Ext.define('Ext.Praxis.controller.gerencial.GdsAnalysis.GdsAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GdsAnalysisController',
    requires: [
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Info',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Info1',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Info2',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Info3',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Info4'
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
        //Ext.get('divTitle').update('GDS Analysis');        
        this.setStoreData();
        //this.btnSearch_click();
    },
    onCmbGroupByChange: function(obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.id + '-cmb-filter').hide();
                Ext.getCmp(prototype.id + '-txt-filter').hide();
                this.search();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cmb-filter').show();
                Ext.getCmp(prototype.id + '-txt-filter').show();
                this.search01();
                break;
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear() - 1);
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
        //console.log('page: ' + this.page_current);
        var cmb_sel = Ext.getCmp(prototype.id + '-cmb-sel').getValue();

        if (this.page_current === 2) {
            this.onDetailFlownClick00();
        } else if (this.page_current === 3) {
            this.onDetailFlownClick01();
        } else if (this.page_current === 4) {
            this.onDetailFlownClick02();
        } else
        {
            switch (cmb_sel) {
                case '1':
                    //Ext.getCmp(prototype.id + '-Contenedor-app').setWidth(1000);
                    //Ext.getCmp(prototype.id + '-Contenedor-app').updateLayout();                    
                    //Ext.getCmp(prototype.id + '-pagging').hide();
                    Ext.getCmp(prototype.id + '-cmb-filter').hide();
                    Ext.getCmp(prototype.id + '-txt-filter').hide();
                    //Ext.getCmp(prototype.id + '-txt-filter').setValue('');
                    this.search();
                    break;
                case '2':
                    //Ext.getCmp(prototype.id + '-Contenedor-app').setWidth(1100);
                    //Ext.getCmp(prototype.id + '-Contenedor-app').updateLayout();                    
                    //Ext.getCmp(prototype.id + '-pagging').show();
                    Ext.getCmp(prototype.id + '-cmb-filter').show();
                    Ext.getCmp(prototype.id + '-txt-filter').show();
                    //Ext.getCmp(prototype.id + '-txt-filter').setValue('');
                    this.search01();
                    break;
            }
        }
    },
    search: function()
    {
        this.page_current = 1;
        //console.log('page: ' + this.page_current);
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        var bean = {};
        bean.VP_YEAR = this.getValue('cmbDateYear');
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAnalysis.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
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
            xtype: prototype.id + '-info',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    search01: function() {
        this.page_current = 1;
        //console.log('page: ' + this.page_current);
        var bean = {};
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
//        Ext.getCmp( prototype.id + '-ContenedorMain' ).setWidth(1500);        
//        Ext.getCmp(prototype.id + '-ContenedorMain').updateLayout();        
//        Ext.getCmp(prototype.id + '-panel-contenedor-grid').setHeight(530);        
//        Ext.getCmp(prototype.id + '-panel-contenedor-grid').updateLayout();
//        Ext.getCmp(prototype.id + '-panel-contenedor-grid').setWidth(1040);
//        Ext.getCmp(prototype.id + '-panel-contenedor-grid').updateLayout();

        bean.VP_YEAR = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        bean.VP_AGTNAM = Ext.getCmp(prototype.id + '-txt-filter').getValue();
        //console.log(bean.VP_AGTNAM);

        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAnalysis.GridData1', {
            proxy: {
                url: prototype.url + '/search01'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3009");
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
            xtype: prototype.id + '-info1',
            id: prototype.id + '-contentInfo1'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData01').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetailFlownClick00: function(grid, rowIndex, colIndex)
    {
        this.page_current = 2;
        //console.log('page onDetailFlownClick00: ' + this.page_current);
        //console.log('rowIndex: ' + rowIndex);
        //Ext.getCmp(prototype.id + '-panel-contenedor-grid').setHeight(530);
        //Ext.getCmp(prototype.id + '-panel-contenedor-grid').updateLayout();
        Ext.getCmp(prototype.id + '-cont-filter00').hide();
        Ext.getCmp(prototype.id + '-cont-filter01').show();

        //this.stateFilter(true);
        if (Ext.getCmp(prototype.id + '-gridData')) {
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            //guarda rec del grid 01
            this.recGrid01 = rec;
        }
        var bean = {};
        bean.VP_MES = this.recGrid01.get('MES');
        Ext.getCmp(prototype.id + '-txt-VP_MES-01').setValue(this.recGrid01.get('MES'));
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAnalysis.GridData2', {
            proxy: {
                url: prototype.url + '/search02'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: XX");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//
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
        Ext.getCmp(prototype.id + '-gridData02').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetailFlownClick01: function(grid, rowIndex, colIndex) {
        this.page_current = 3;
        //console.log('page onDetailFlownClick01: ' + this.page_current);
        //Ext.getCmp(prototype.id + '-Contenedor-app').setWidth(970);
        //Ext.getCmp(prototype.id + '-Contenedor-app').updateLayout();                

        if (Ext.getCmp(prototype.id + '-gridData02')) {
            var grid = Ext.getCmp(prototype.id + '-gridData02');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            //guarda rec del grid 01
            this.recGrid02 = rec;
        }
        //params desde filter 01 al 02
        Ext.getCmp(prototype.id + '-cont-filter00').hide();
        Ext.getCmp(prototype.id + '-cont-filter01').hide();
        Ext.getCmp(prototype.id + '-cont-filter02').show();
        //params desde filter 01 al 02
        Ext.getCmp(prototype.id + '-txt-VP-SEGDATE-02').setValue(this.recGrid02.get('FDATE'));

        var bean = {};
        bean.VP_SEGDATE = this.recGrid02.get('FDATE');

        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAnalysis.GridData3', {
            proxy: {
                url: prototype.url + '/search03'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: ");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//
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
            xtype: prototype.id + '-info3',
            id: prototype.id + '-contentInfo3'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData03').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetailFlownClick02: function(grid, rowIndex, colIndex) {
//        Ext.getCmp(prototype.id + '-Contenedor-app').setWidth(1000);
//        Ext.getCmp(prototype.id + '-Contenedor-app').updateLayout();
        this.page_current = 4;
        //console.log('page onDetailFlownClick02: ' + this.page_current);
        if (Ext.getCmp(prototype.id + '-gridData03')) {
            var grid = Ext.getCmp(prototype.id + '-gridData03');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            //guarda rec del grid 01
            this.recGrid03 = rec;
        }
        //params desde filter 01 al 02
        Ext.getCmp(prototype.id + '-cont-filter00').hide();
        Ext.getCmp(prototype.id + '-cont-filter01').hide();
        Ext.getCmp(prototype.id + '-cont-filter02').hide();
        Ext.getCmp(prototype.id + '-cont-filter03').show();

        //params desde filter 02 al 03
        Ext.getCmp(prototype.id + '-txt-VP-SEGDATE-03').setValue(this.recGrid03.get('FDATE'));
        Ext.getCmp(prototype.id + '-txt-VP-FNUMBER-03').setValue(this.recGrid03.get('FNUMBER'));

        var bean = {};
        //beanTMP.option = 'QRY_FLOWN_BIDT_03';
        bean.VP_SEGDATE = this.recGrid03.get('FDATE');
        bean.VP_FNUMBER = this.recGrid03.get('FNUMBER');
        bean.VNR = Ext.getCmp(prototype.id + '-cmb-sel-usage').getValue();

        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAnalysis.GridData4', {
            proxy: {
                url: prototype.url + '/search04'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: ");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//
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
            xtype: prototype.id + '-info4',
            id: prototype.id + '-contentInfo4'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData04').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
