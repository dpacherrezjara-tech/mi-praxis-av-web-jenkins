Ext.define('Ext.Praxis.controller.sales.IATAExclude.IATAExcludeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IATAExcludeController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'IATAExcludeForm';
        prototype.url = CONTEXTPATH+'/IATAExclude';
        prototype.widthContenedor = 1080;
        prototype.widthGrid = 1020;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.btnSearch_click();
    },
    onTypeFilterChange: function() {
        var TYPE_FILTER = this.getValue('Cmb_TypeFilter');
        this.clearFilter();
        switch (TYPE_FILTER) {
            case '1':
                Ext.getCmp(prototype.id+'-HBox_Option01').show();
                Ext.getCmp(prototype.id+'-HBox_Option02').hide();
                this.focus('txtA1829IATA');
                break;
            case '2':
                Ext.getCmp(prototype.id+'-HBox_Option01').hide();
                Ext.getCmp(prototype.id+'-HBox_Option02').show();
                this.focus('txtA1829GSA');
                break;
            default:
                Ext.getCmp(prototype.id+'-HBox_Option01').hide();
                Ext.getCmp(prototype.id+'-HBox_Option02').hide();
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
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
        this.setValue('txtA1829GSA', '');
        this.setValue('txtA1829IATA', '');
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
        var txtA1829GSA = this.getValue("txtA1829GSA");
        var txtA1829IATA = this.getValue("txtA1829IATA");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_A1829CCUST: '139',
            VP_A1829GSA: txtA1829GSA,
            VP_A1829IATA: txtA1829IATA
        };
        
        _path = prototype.url+'/getXLSX?' +
                'VP_A1829CCUST='+searchParams.VP_A1829CCUST+'&' +
                'VP_A1829GSA='+searchParams.VP_A1829GSA+'&' +
                'VP_A1829IATA='+searchParams.VP_A1829IATA;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.IATAExclude.GridData', {
            proxy: {
                url: prototype.url+'/loadSearch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1829");
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
    
    clearFilter: function() {
        this.setValue('txtA1829IATA','');
        this.setValue('txtA1829GSA','');
    },
    
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
