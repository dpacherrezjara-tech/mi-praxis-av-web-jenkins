Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionGSA.InvoiceCommissionGSAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceCommissionGSAController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'InvoiceCommissionGSAForm';
        prototype.url = CONTEXTPATH+'/InvoiceCommissionGSA';
        prototype.widthContenedor = 1100;
        prototype.widthGrid = 1010;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbDateChange: function(cmp, newValue) {
        // <editor-fold defaultstate="collapsed" desc="hide">
        Ext.getCmp(prototype.id+'-HBox_Option01').hide();
        Ext.getCmp(prototype.id+'-HBox_Option02').hide();
        Ext.getCmp(prototype.id+'-HBox_Option03').hide();
        // </editor-fold>
        switch (newValue) {
            case '1':
                Ext.getCmp(prototype.id+'-HBox_Option01').show();
                this.focus("txtA1826GSA");
                break;
            case '2':
                Ext.getCmp(prototype.id+'-HBox_Option02').show();
                this.focus("txtA1826FFACT");
                break;
            case '3':
                Ext.getCmp(prototype.id+'-HBox_Option03').show();
                this.focus("txtA1826LOTE");
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.winDataEntry('U', data, store, rowIndex);
    },
    winDataEntry: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.InvoiceCommissionGSAForm.DataEntry', {
            id: 'DataEntryInvoiceCommissionGSAForm',
            params: {
                action: action,
                data: data
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('Cmb_TypeFilter', '1');
        this.setValue('txtA1826GSA', '');
        this.setValue('txtA1826FFACT', '');
        this.setValue('txtA1826LOTE', '');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData02').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        // </editor-fold>
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var selectedValue = this.getValue("Cmb_TypeFilter");
        var txtA1826GSA = this.getValue("txtA1826GSA");
        var txtA1826LOTE = this.getValue("txtA1826LOTE");
        var txtA1826FFACT = Ext.util.Format.date(this.getValue('txtA1826FFACT'), 'Ymd');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_A1826CCUST: '139',
            VP_A1826GSA: txtA1826GSA,
            VP_A1826LOTE: txtA1826LOTE,
            VP_A1826FFACT: txtA1826FFACT
        };
        _path = prototype.url+'/getXLSX?' +
            'VP_A1826CCUST='+searchParams.VP_A1826CCUST+'&' +
            'VP_A1826GSA='+searchParams.VP_A1826GSA+'&' +
            'VP_A1826LOTE='+searchParams.VP_A1826LOTE+'&' +
            'VP_A1826FFACT='+searchParams.VP_A1826FFACT;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InvoiceCommissionGSA.GridData', {
            proxy: {
                url: prototype.url+'/loadInvoiceCommGSA'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1826");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
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
        Ext.getCmp(prototype.id+'-gridData02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
