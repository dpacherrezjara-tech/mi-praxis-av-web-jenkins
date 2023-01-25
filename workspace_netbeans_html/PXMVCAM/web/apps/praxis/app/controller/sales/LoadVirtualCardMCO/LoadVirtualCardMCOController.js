Ext.define('Ext.Praxis.controller.sales.LoadVirtualCardMCO.LoadVirtualCardMCOController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadVirtualCardMCOController',
    reader: '',
    arrBytes: '',
    searchParams: {},
    init: function(view) {
        prototype.id = 'LoadVirtualCardMCOForm';
        prototype.url = CONTEXTPATH + '/LoadVirtualCardMCO';
        prototype.widthContenedor = 1340;
        prototype.widthGrid = 1289;
        
        var me = this;
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onUploadChange: function(cmp, value) {
        this.file = cmp.fileInputEl.dom.files[0];
        if (this.file !== undefined) cmp.setRawValue(this.file.name);
    },
    onSaveFilterClick: function(cmp, value) {
        var txtRutaExcel = Ext.getCmp(prototype.id+'-txtRutaExcel').getValue();
        if (txtRutaExcel === '') {
            global.Msg({
                msg: 'Select file.'
            });
        } else {
            var txtXLSError = Ext.getCmp(prototype.id+'-txtRutaExcel').getErrors();
            var cmbtINDAC = Ext.getCmp(prototype.id + '-cmbtINDAC').getValue();
            if (txtXLSError.length === 0) {
                this.reader = new FileReader();
                this.reader.onload = (function(theFile) {
                    return function(e) {
                        this.arrBytes = e.target.result;
                        Ext.Ajax.request({
                            url: prototype.url + '/setLoadExcel',
                            method: 'POST',
                            timeout: 60000000,
                            params: {
                                arrBytes : this.arrBytes,
                                filename: txtRutaExcel,
                                A2860INDAC: cmbtINDAC,
                                A2860VCARX: "", A2860VCARD: "", A2860EFFST: "", A2860EFFEN: "",
                                A2860APLYU: "", A2860APLYB: "", A2860PRODU: "", A2860COMNM: ""
                            },
                            beforerequest: Ext.getCmp(prototype.id + '-pnlRutaExcel').mask('Loading...'),
                            success: function(response, options){
                                var res = Ext.JSON.decode(response.responseText);
                                var mensaje = res.sesion;
                                if (res.success) {
                                    if (mensaje !== '') {
                                        global.Msg({
                                            msg: mensaje
                                        });
                                    } else {
                                        global.Msg({
                                            title: 'Load Excel Virtual Card - Upload Process',
                                            msg: 'Process completed successfully!'
                                        });
                                    }
                                    
                                } else {
                                    global.Msg({
                                        msg: mensaje,
                                        icon: 0
                                    });
                                }
                                Ext.getCmp(prototype.id + '-pnlRutaExcel').unmask();
                            },
                            failure: function(response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                                Ext.getCmp(prototype.id + '-pnlRutaExcel').unmask();
                            }
                        });
                    };
                })(this.file);
                this.reader.readAsBinaryString(this.file);
            } else {
                global.Msg({
                    msg: txtXLSError,
                    buttons: 0,
                    icon: 2
                });
            }
        }
    },
    setFormatParameter: function() {
        var cmbtINDAC = Ext.getCmp(prototype.id + '-cmbtINDAC').getValue();
        var CHECK_ERROR_SEARCH = Ext.getCmp(prototype.id + '-CHECK_ERROR_SEARCH').getValue();
        var TXT_VIRTUAL_CARD_SEARCH = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD_SEARCH').getValue();
        var CHECK_ENCRIPT_SEARCH = Ext.getCmp(prototype.id + '-CHECK_ENCRIPT_SEARCH').getValue();
        
        searchParams = {
            A2860APLYB: CHECK_ERROR_SEARCH?'N':'S',
            A2860INDAC: cmbtINDAC,
            A2860VCARD: TXT_VIRTUAL_CARD_SEARCH,
            A2860VCARX: CHECK_ENCRIPT_SEARCH?'S':'N'
        };
    },
    onCHECK_ERROR_SEARCHChange: function(obj , newValue , oldValue , eOpts) {
        this.btnSearch_click();
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadVirtualCardMCO.GridData', {
            proxy: {
                url: prototype.url + '/getListVirtualCard'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridAgremment').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbtINDAC').setValue("U");
        Ext.getCmp(prototype.id+'-TXT_VIRTUAL_CARD_SEARCH').setValue("");
        Ext.getCmp(prototype.id+'-CHECK_ENCRIPT_SEARCH').setValue("1");
        Ext.getCmp(prototype.id+'-txtRutaExcel').reset();
        Ext.getCmp(prototype.id+'-CHECK_ERROR_SEARCH').setValue("0");
        var store = Ext.getCmp(prototype.id + '-gridAgremment').getStore();
        store.removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("0");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");
        Ext.getCmp(prototype.id+'-TXT_VIRTUAL_CARD_SEARCH').focus();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnBack_click: function() {
        var heightMenu = 400;
        Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var txtXLSError = Ext.getCmp(prototype.id+'-txtRutaExcel').getErrors();
        var cmbtINDAC = Ext.getCmp(prototype.id + '-cmbtINDAC').getValue();
        this.winDataEntry('U', rec, txtXLSError, cmbtINDAC);
    },
    winDataEntry: function(action, rec, txtXLSError, cmbtINDAC) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.LoadVirtualCardMCOForm.DataEntry', {
            id: 'DataEntryLoadVirtualCardMCOForm',
            params: {
                action: action,
                rec: rec,
                txtXLSError: txtXLSError,
                cmbtINDAC: cmbtINDAC
            }
        }).show();

    },
    
    // <editor-fold defaultstate="collapsed" desc="Filters Usos">
//    onUpperValue: function(field, newValue, oldValue){
//        field.setValue(newValue.toUpperCase());
//    },
//    onTextKeypress: function( obj , e , eOpts){
//        if ( e.getKey() === e.ENTER ){
//            this.btnSearch_click();
//        }
//    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveLast();
    }
    // </editor-fold>
});
