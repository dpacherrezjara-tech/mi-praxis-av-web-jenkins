Ext.define('Ext.Praxis.controller.sales.InplantCommissions.InplantCommissionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InplantCommissionsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'InplantCommissionsForm';
        prototype.url = CONTEXTPATH+'/InplantCommissions';
        prototype.widthContenedor = 1900;
        prototype.widthGrid = 1890;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
//        this.btnClear_click();
        this.btnSearch_click();
    },
    btnLoadClick: function() {
        Ext.create('Ext.Praxis.view.sales.InplantCommissionsForm.DataEntry', {
            id: 'DataEntryInplantCommissionsForm',
            params: {
                action: 'LOAD'
            }
        }).show();
    },
    btnDownloadClick: function() {
        Ext.create('Ext.Praxis.view.sales.InplantCommissionsForm.DataEntry', {
            id: 'DataEntryInplantCommissionsForm',
            params: {
                action: 'DOWNLOAD'
            }
        }).show();
    },
    onCmbOpcionChange: function(cmp, newValue) {
        switch (newValue) {
            case 'TKT':
                Ext.getCmp(prototype.id+'-txtCampo').show();
                Ext.getCmp(prototype.id+'-txtIdLote').hide();
                this.setValue('txtCampo', '');
                this.setValue('txtIdLote', '');
                this.focus("txtCampo");
                break;
            case 'NLOTE':
                Ext.getCmp(prototype.id+'-txtCampo').hide();
                Ext.getCmp(prototype.id+'-txtIdLote').show();
                this.setValue('txtCampo', '');
                this.setValue('txtIdLote', '');
                this.focus("txtIdLote");
                break;
            default:
                Ext.getCmp(prototype.id+'-txtCampo').hide();
                Ext.getCmp(prototype.id+'-txtIdLote').hide();
        }
    },
    
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
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('cmbOpcion', '');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridTourCode').getStore().removeAll();
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
        var selectedValue = this.getValue("cmbOpcion");
        var strCampo = this.getValue("txtCampo").trim();
        var txtIdLote = this.getValue("txtIdLote");
        // </editor-fold>
        
        switch (selectedValue) {
            case 'TKT':
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_CIA: (strCampo.length >= 3) ? strCampo.substr(0, 3) : '',
                    IN_FORMA: (strCampo.length >= 7) ? strCampo.substr(3, 4) : '',
                    IN_SERIE: (strCampo.length >= 13) ? strCampo.substr(7, 6) : '',
                    IN_CUPON: '',
                    IN_NLOTE: ''
                };
                // </editor-fold>
                break;
            case 'NLOTE':
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_CIA: '',
                    IN_FORMA: '',
                    IN_SERIE: '',
                    IN_CUPON: '',
                    IN_NLOTE: txtIdLote
                };
                // </editor-fold>
                break;
            default:
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_CIA: '',
                    IN_FORMA: '',
                    IN_SERIE: '',
                    IN_CUPON: '',
                    IN_NLOTE: ''
                };
                // </editor-fold>
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InplantCommissions.GridData', {
            proxy: {
                url: prototype.url+'/loadSearch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1738");
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
        Ext.getCmp(prototype.id+'-gridTourCode').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
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
