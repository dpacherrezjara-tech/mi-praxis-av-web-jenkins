Ext.define('Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RegistroVentaOALController',
    beanXLS: {},       
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        me = this;
    },
    afterRender: function () {
//        this.setStoreDataGrid(); //del grid selected
//        this.cmbfiltro_clickHandler();
//        this.Onsearch();
    },
    cmbfiltro_clickHandler: function () {
        
    },
    setStoreDataGrid: function () {
        //del grid selected
        //Ext.create('Ext.Praxis.store.eecta.RegistroVentaOAL.GridData', {});
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        this.Onsearch();
    },
    btnFilter_click: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function (obj, e) {
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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        }        
    },
    // </editor-fold>    
    onTxtFilterKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onTxtFilterTKTKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.cmbfiltroSTS_clickHandler();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    Onsearch: function () {
        this.search();
    },
    search: function ()
    {
        me = this;
        //Ext.getCmp(prototype.id + '-boxPaginacion').show();
        var bean = {};
        bean.VP_FILTRO = Ext.getCmp(prototype.id + '-cmbfiltro-fechas').getValue();
        bean.VP_FECHA01 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha01').getValue(), 'Ymd');
        bean.VP_FECHA02 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha02').getValue(), 'Ymd');         
        bean.VP_AIRLINE_CODE = Ext.getCmp(prototype.id + '-TICKET-NUMBER-CIA').getValue(); 
        bean.VP_TICKET_NUMBER = Ext.getCmp(prototype.id + '-TICKET-NUMBER').getValue(); 
//        var VL_SEQ = Ext.getCmp(prototype.id + '-TICKET-NUMBER-SEQ').getValue(); 
//        if(bean.VP_TICKET_NUMBER !== "") bean.VP_TICKET_NUMBER = bean.VP_AIRLINE_CODE + bean.VP_TICKET_NUMBER + VL_SEQ;                
        bean.VP_SERVICE_TYPE = Ext.getCmp(prototype.id + '-cmbfiltro-tipo').getValue();       
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').setStore(storeGridDatas);      
    },
    cmbfiltroSTS_clickHandler:function(){
        var rowIndex = Ext.getCmp(prototype.id + '-rowIndex').getValue();  
//        console.log('rowIndex:' + rowIndex);
        if (rowIndex > 0) 
        this.onDetalleUATP(null, rowIndex, 0);
    },
    onDetalleUATP: function (grid, rowIndex, colIndex) {
        if (Ext.getCmp(prototype.id + '-gridData')) {
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            this.gridData = rec;
        }
        var bean = {};        
        bean.VP_OPCION = '';
        bean.VP_FDATE1 = this.gridData.get('A1530FCONT');
        bean.VP_TICKET = Ext.getCmp(prototype.id + '-TKT-NUMBER').getValue();
        var SEQ = Ext.getCmp(prototype.id + '-TKT-NUMBER-SEQ').getValue();
        if(bean.VP_TICKET !== '') 
        bean.VP_TICKET = bean.VP_TICKET + SEQ;
        bean.VP_ESTADO = Ext.getCmp(prototype.id + '-STSTKT').getValue();
        Ext.getCmp(prototype.id + '-FCONT').setValue( bean.VP_FDATE1);
        Ext.getCmp(prototype.id + '-rowIndex').setValue( rowIndex ); //usado para buscar x estados y ticket
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search_det'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id01 + '-paggin').setStore(storeGridDatas);
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
    // <editor-fold defaultstate="collapsed" desc="Data entry">
    btnAdd_click: function () {
        this.winDataEntry('I');
    },  
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;        
        Ext.create('Ext.Praxis.view.eecta.RegistroVentaOALForm.RegistroVentaOALCrud', {
            id: prototype.id01 + '-RegistroVentaOALCrud',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },  
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onCmbByOrder: function () {
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
    onStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
    onAmountRenderer01: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
    onAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
    onMonthStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log(value.substring(4,6));
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        var valor = m[parseInt(value.substring(4, 6)) - 1] + ' - ' + value.substring(0, 4);
        return valor;
        //return '<a href="#gds_analysis" onclick="Ext.getCmp(\'App-Gds_analysis-Contenedor\').getController().onDetailFlownClick00(' + rowIndex + ');">' + valor + '</a>';
    }
    // </editor-fold>
});



