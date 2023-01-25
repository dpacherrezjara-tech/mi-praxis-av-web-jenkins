
Ext.define('Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CatalogoClienteController',
    requires: [
       'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGrid'
    ],           
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function(){         
        Ext.getCmp(prototype.id + '-txtPARAM1').focus();
        this.Onsearch();                
        //create STORE for Data Entry UATP grid
        Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp',{});
        Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataIdentif',{}); 
        Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataContrato',{});         
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
        //console.log(selectedValue);
        switch(selectedValue){
            case '1': 
                Ext.getCmp(prototype.id+'-BoxFilter01').show();
                Ext.getCmp(prototype.id+'-BoxFilter02').hide();
                Ext.getCmp(prototype.id+'-txtCDCLI').focus();
                break;
            case '2':
                Ext.getCmp(prototype.id+'-BoxFilter01').setVisible(false);
                Ext.getCmp(prototype.id+'-BoxFilter02').setVisible(true);                
                Ext.getCmp(prototype.id+'-txtPARAM1').focus();
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
        bean.VP_OPCION = Ext.getCmp(prototype.id+'-cmbfiltro').getValue();
        bean.VP_CDCLI = Ext.getCmp(prototype.id+'-txtCDCLI').getValue();
        bean.VP_PARAM1 = Ext.getCmp(prototype.id+'-txtPARAM1').getValue();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3953");
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
     btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteEntry', {
            id: prototype.id + '-CatalogoClienteEntry',
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



