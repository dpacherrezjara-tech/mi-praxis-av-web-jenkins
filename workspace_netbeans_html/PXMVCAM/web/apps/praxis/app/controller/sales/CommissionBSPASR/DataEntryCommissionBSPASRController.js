Ext.define('Ext.Praxis.controller.sales.CommissionBSPASR.DataEntryCommissionBSPASRController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCommissionBSPASRController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    _path: '',
    // </editor-fold>
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
        this.mostrarData(this.p.data);
        this.btnSearch_click();
    },
    onOptionTKTChange: function(cmp, newValue) {
        switch (newValue) {
            case '2':
                Ext.getCmp(prototype.id+'-txtTKTNumber').show();
                Ext.getCmp(prototype.id+'-txtTKTNumberSerie').show();
                Ext.getCmp(prototype.id+'-txtFuente').hide();
                break;
            case '3':
                Ext.getCmp(prototype.id+'-txtTKTNumber').hide();
                Ext.getCmp(prototype.id+'-txtTKTNumberSerie').hide();
                Ext.getCmp(prototype.id+'-txtFuente').show();
                break;
            default:
                Ext.getCmp(prototype.id+'-txtTKTNumber').hide();
                Ext.getCmp(prototype.id+'-txtTKTNumberSerie').hide();
                Ext.getCmp(prototype.id+'-txtFuente').hide();
                this.setValue('txtTKTNumber', '');
                break;
        }
    },
    onSendMailClick: function() {
        Ext.create('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntrySend', {
            id: 'DataEntrySendCommissionBSPASRForm',
            params: {
                data: this.p.data
            }
        }).show();
    },
    onAcuseFOBClick: function() {
        Ext.create('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntryAcuse', {
            id: 'DataEntryAcuseCommissionBSPASRForm',
            params: {
                action: 'U',
                data: this.p.data
            }
        }).show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        this.setValue('cmbOptionTKT', '3');
        this.setValue('txtA1775GSA', data.A1775GSA);
        this.setValue('txtA1775PAIS', data.A1775PAIS);
        this.setValue('txtLote2', $.trim(data.A1775LOTE));
        this.setValue('txtSource', data.A1775FUENT);
        this.setValue('txtPreFac', data.A1775FENV);
        this.setValue('txtPreFactura', data.A1775STAT);
        this.setValue('txtFacRec', data.A1775FREC);
        this.setValue('txtFacturaRecibida', data.A1775STRC);
        this.setValue('txtA1775TFRON', Ext.util.Format.number(data.A1775TFRON, '0,000.00'));
        this.setValue('txtA1775TFROF', Ext.util.Format.number(data.A1775TFROF, '0,000.00'));
        this.setValue('txtA1775ASRON', Ext.util.Format.number(data.A1775ASRON, '0,000.00'));
        this.setValue('txtA1775ASROF', Ext.util.Format.number(data.A1775ASROF, '0,000.00'));
        this.setValue('txtA1775COMON', Ext.util.Format.number(data.A1775COMON, '0,000.00'));
        this.setValue('txtA1775COMOF', Ext.util.Format.number(data.A1775COMOF, '0,000.00'));
        this.setValue('txtA1775SCGSA', Ext.util.Format.number(data.A1775SCGSA, '0,000.00'));
        this.setValue('txtA1775BASE', Ext.util.Format.number(data.A1775BASE, '0,000.00'));
        this.setValue('txtA1775TPAG', Ext.util.Format.number(data.A1775TPAG, '0,000.00'));
        this.setValue('txtA1775MDALC', data.A1775MDALC);
        
        Ext.getCmp(prototype.id+'-BtnAcuseFOB').disable(true);
        if (data.A1775STAT==='PENDING') {
            Ext.getCmp(prototype.id+'-BtnSendMailFOB').enable(true);
        } else {
            Ext.getCmp(prototype.id+'-BtnSendMailFOB').disable(true);
            if ($.trim(data.A1775FACUS)==='' && data.A1775STAT!=='PENDING') {
                Ext.getCmp(prototype.id+'-BtnAcuseFOB').enable(true);
            }
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter('S');
        this.setGridData();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilterTKT');
        var espacio = Ext.getCmp(prototype.id+'-sps1');
        if (option.isVisible()) {
            option.hide();
            espacio.show();
        } else {
            option.show();
            espacio.hide();
        }
    },
    btnExcel_click: function(obj, e) {
        this.setFormatParameter('E');
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
        this.setValue('cmbOptionTKT', '1');
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridDataTkt').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total2').setText("0");
        // </editor-fold>
    },
    btnBack_click: function() {
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(modo) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var selectedValue = this.getValue("cmbOptionTKT");
        var txtA1775GSA = this.getValue("txtA1775GSA");
        var txtLote = this.getValue("txtLote2");
        var txtA1775PAIS = this.getValue("txtA1775PAIS");
        var txtA1775MDALC = this.getValue("txtA1775MDALC");
        var txtTKTNumberSerie = this.getValue("txtTKTNumberSerie");
        var txtTKTNumber = this.getValue("txtTKTNumber");
        var txtFuente = this.getValue("txtFuente");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_OPCION: selectedValue,
            IN_A1776CCUST: '139',
            IN_A1776GSA: txtA1775GSA,
            IN_A1776LOTE: txtLote,
            IN_A1776PAIS: txtA1775PAIS,
            IN_A1776MDALC: txtA1775MDALC
        };
        switch (selectedValue) {
            case '2': searchParams.IN_TKT = txtTKTNumberSerie + txtTKTNumber; break;
            case '3': searchParams.IN_TKT = txtFuente; break;
            case '1': searchParams.IN_TKT = ''; break;
        }
        _path = prototype.url+'/getXLSXTkt/?' +
            'IN_OPCION='+searchParams.IN_OPCION+'&' +
            'IN_A1776CCUST='+searchParams.IN_A1776CCUST+'&' +
            'IN_A1776GSA='+searchParams.IN_A1776GSA+'&' +
            'IN_A1776PAIS='+searchParams.IN_A1776PAIS+'&' +
            'IN_A1776LOTE='+searchParams.IN_A1776LOTE+'&' +
            'IN_TKT='+searchParams.IN_TKT+'&' +
            'IN_A1776MDALC='+searchParams.IN_A1776MDALC+'&' +
            'MODO='+modo
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionBSPASR.GridDataTkt', {
            proxy: {
                url: prototype.url+'/loadTicketGSA'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
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
        Ext.getCmp(prototype.id+'-gridDataTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        global.getFile(_path);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin2').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin2').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin2').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin2').moveLast();
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
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
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