
Ext.define('Ext.Praxis.controller.compensation.Compensation.CompensationFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CompensationFormController',
    requires: [
       'Ext.Praxis.view.compensation.CompensationForm.InfoGrid'
    ],           
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function(){                
        this.Onsearch();                
        //create STORE for detalle 
        Ext.create('Ext.Praxis.store.discharges.GridData',{});        
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
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible() === 1) {
            global.showMenu();
        }                
    },
    // </editor-fold>    
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
     cmbfiltro_clickHandler: function() {
        var selectedValue =  Ext.getCmp(prototype.id + '-cmbfiltro').getValue();        
        Ext.getCmp(prototype.id+'-BoxFilter01').hide();
        Ext.getCmp(prototype.id+'-BoxFilter02').hide();
        switch(selectedValue){
            case '1': 
                Ext.getCmp(prototype.id+'-BoxFilter01').show();                
                Ext.getCmp(prototype.id+'-CPARM').focus();
                break;
            case '2':                
                Ext.getCmp(prototype.id+'-BoxFilter02').show();
                Ext.getCmp(prototype.id+'-DESCR').focus();
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    Onsearch: function(){
        this.search();        
    },
    search: function(){        
        Ext.getCmp(prototype.id + '-boxPaginacion').show();        
        var bean = {};
        bean.VP_A4023FPROC1 = Ext.util.Format.date(Ext.getCmp(prototype.id+'-fecha1').getValue(), 'Ymd');
        bean.VP_A4023FPROC2 = Ext.util.Format.date(Ext.getCmp(prototype.id+'-fecha2').getValue(), 'Ymd');
        bean.VP_A4023STERR = Ext.getCmp(prototype.id+'-STAT').getValue();
               
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.NoShow.GridData', {
            proxy: {
                url: prototype.url + '/search_cargalog'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A4023");
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
            xtype: prototype.id + '-infoGrid',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },  
    btnLoadFile_Input: function() {
        this.winDataEntry('I');
    },
    onDetailClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.compensation.CompensationForm.CompensationLoadFileForm', {
            id: prototype.id01 + '-CompensationLoadFileForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    //xml
    onDetailClick01: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry01('U', rec);
    },
    onDetailClick02: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry02('U', rec);
    },
    onDetailClick03: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry03('U', rec);
    },
    winDataEntry01: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetXml', {
            id: prototype.id02 + '-NoShowFormDetXml',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    winDataEntry02: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetErr', {
            id: prototype.id05 + '-NoShowFormDetErr',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    winDataEntry03: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetLog', {
            id: prototype.id06 + '-NoShowFormDetLog',
            params: {
                action: action,
                rec: rec
            }
        }).show();
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





