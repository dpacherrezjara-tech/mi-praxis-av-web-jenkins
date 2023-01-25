Ext.define('Ext.Praxis.controller.sales.OracleAccountingReport.OracleAccountingReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleAccountingReportController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    _pathDetail: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'OracleAccountingReportForm';
        prototype.url = CONTEXTPATH+'/OracleAccountingReport';
        prototype.widthContenedor = 1020;
        prototype.widthGrid = 1010;
        prototype.widthGridDetail = 823;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
//        this.btnSearch_click();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetailClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridData').headerCt.getGridColumns()[column].dataIndex;
        var status = '';
        switch (dataIndex) {
            case 'N': case 'P': case 'Q': case 'C': case 'X': case 'E':
                status = dataIndex;
                break;
            case 'VACIO':
                status = '';
                break;
            case 'TOTAL':
                status = '*';
                break;
        }
        this.setFormatParameterDetail(data, status);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-gridData').hide();
        Ext.getCmp(prototype.id+'-pie').hide();
        Ext.getCmp(prototype.id+'-boxPaginacion').hide();
        Ext.getCmp(prototype.id+'-gridDataDetail').show();
        // </editor-fold>
        this.setGridDataDetail();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var cboModulo = this.getValue('cboModulo');
        if (cboModulo!=='') {
            this.setFormatParameter();
            // <editor-fold defaultstate="collapsed" desc="preparar">
            Ext.getCmp(prototype.id+'-boxMainData').show();
            Ext.getCmp(prototype.id+'-gridDataDetail').hide();
            Ext.getCmp(prototype.id+'-gridData').show();
            Ext.getCmp(prototype.id+'-pie').show();
            Ext.getCmp(prototype.id+'-boxPaginacion').show();
            // </editor-fold>
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Please select module.'
            });
            this.focus('cboModulo');
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
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
        this.setValue("cboModulo", "");
        this.setValue("txtFecha", "");
        // </editor-fold>
        this.focus("txtFecha");
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridDataDetail').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        Ext.getCmp(prototype.id+'-gridDataDetail').hide();
        Ext.getCmp(prototype.id+'-gridData').show();
        Ext.getCmp(prototype.id+'-pie').show();
        Ext.getCmp(prototype.id+'-boxPaginacion').show();
        // </editor-fold>
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                win.lblUser_toolTip("");
                var heightMenu = 400;
                Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
            } else if (Ext.getCmp(prototype.id+'-gridDataDetail').isVisible()) {
                win.lblUser_toolTip("Estructura: SQP01257");
                Ext.getCmp(prototype.id+'-gridDataDetail').hide();
                Ext.getCmp(prototype.id+'-gridData').show();
                Ext.getCmp(prototype.id+'-pie').show();
                Ext.getCmp(prototype.id+'-boxPaginacion').show();
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cboModulo = this.getValue("cboModulo");
        var txtFecha = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFecha').getValue(), 'Ymd');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_MODULO: cboModulo,
            IN_FECHA_PROCESO: txtFecha
        };
        
        _path = prototype.url+'/getXLSX?' +
                'IN_MODULO='+searchParams.IN_MODULO+'&' +
                'IN_FECHA_PROCESO='+searchParams.IN_FECHA_PROCESO;
        // </editor-fold>
    },
    setFormatParameterDetail: function(data, status) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            A1955MODUL: data.A1955MODUL,
            A1955FPROC: data.A1955FPROC,
            A1955FECIN: data.A1955FECIN,
            A1955STATU: status
        };
        _pathDetail = prototype.url+'/getXLSXDetail?' +
                'A1955MODUL='+searchParams.A1955MODUL+'&' +
                'A1955FPROC='+searchParams.A1955FPROC+'&' +
                'A1955FECIN='+searchParams.A1955FECIN+'&' +
                'A1955STATU='+searchParams.A1955STATU;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.OracleAccountingReport.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP01257");
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
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetail: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.OracleAccountingReport.GridDataDetail', {
            proxy: {
                url: prototype.url+'/searchDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP01258");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        // <editor-fold defaultstate="collapsed" desc="configCabeceras">
                        var data = obj.data.items[0].data;
                        switch (data.A1955MODUL) {
                            case "SALES":
                                Ext.getCmp(prototype.id+'-colFuente').setText('Source');
                                Ext.getCmp(prototype.id+'-colKEY2').setText('Country');
                                Ext.getCmp(prototype.id+'-colKEY3').setText('Channel');
                                Ext.getCmp(prototype.id+'-gridDataDetail').setWidth(prototype.widthGridDetail);
                                
                                Ext.getCmp(prototype.id+'-colKEY3').show();
                                Ext.getCmp(prototype.id+'-colFechaProc').show();
                                Ext.getCmp(prototype.id+'-colFuente').show();
                                break;
                            case "FLOWN":
                                Ext.getCmp(prototype.id+'-colFuente').setText('Client');
                                Ext.getCmp(prototype.id+'-colKEY2').setText('Carrier');
                                Ext.getCmp(prototype.id+'-colKEY3').setText('');
                                Ext.getCmp(prototype.id+'-gridDataDetail').setWidth(prototype.widthGridDetail - 103);
                                
                                Ext.getCmp(prototype.id+'-colKEY3').hide();
                                Ext.getCmp(prototype.id+'-colFechaProc').show();
                                Ext.getCmp(prototype.id+'-colFuente').show();
                                break;
                            case "IXP":
                            case "IXC":
                                Ext.getCmp(prototype.id+'-colFechaProc').hide();
                                Ext.getCmp(prototype.id+'-colFuente').hide();
                                Ext.getCmp(prototype.id+'-colKEY2').setText('Month');
                                Ext.getCmp(prototype.id+'-colKEY3').setText('Period');
                                Ext.getCmp(prototype.id+'-gridDataDetail').setWidth(prototype.widthGridDetail);
                                Ext.getCmp(prototype.id+'-colKEY3').show();
                                break;
                        }
                        // </editor-fold>
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataDetail').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                global.getFile(_path);
            } else if (Ext.getCmp(prototype.id+'-gridDataDetail').isVisible()) {
                global.getFile(_pathDetail);
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin').moveFirst();
            }
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxDetTKT').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin').movePrevious();
            }
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxDetTKT').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin').moveNext();
            }
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin').moveLast();
            }
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
