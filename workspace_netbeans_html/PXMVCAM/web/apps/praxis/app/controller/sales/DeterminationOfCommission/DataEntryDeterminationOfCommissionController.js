Ext.define('Ext.Praxis.controller.sales.DeterminationOfCommission.DataEntryDeterminationOfCommissionController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDeterminationOfCommissionController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    _pathDataEntry: '',
    beanSQP01362: {},
    // </editor-fold>
    afterRender: function(){
        this.p = this.view.params;
        this.mostrarData(this.p.bean);
    },
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(bean) {
        // <editor-fold defaultstate="collapsed" desc="asignación">
        this.beanSQP01362.VP_CIA='139';
        this.beanSQP01362.A2845INDAC='U';
        this.beanSQP01362.VP_SCHEMA='';
        this.beanSQP01362.VP_FPROC_D=bean.VP_FPROC_D;
        this.beanSQP01362.VP_FPROC_H=bean.VP_FPROC_H;
        this.beanSQP01362.VP_FUENT = bean.VP_FUENT;
        this.beanSQP01362.VP_PAIVTA = bean.VP_PAIVTA;
        this.beanSQP01362.VP_STATUS='';
        this.beanSQP01362.VP_A2959IATAH= bean.VP_A2959IATAH;
        this.beanSQP01362.VP_A2959AGENT= bean.VP_A2959AGENT;
        
        _pathDataEntry = prototype.url+'/getXLSXDataEntry?' +
            'VP_CIA='+this.beanSQP01362.VP_CIA+'&' +
            'A2845INDAC='+this.beanSQP01362.A2845INDAC+'&' +
            'VP_SCHEMA='+this.beanSQP01362.VP_SCHEMA+'&' +
            'VP_FPROC_D='+this.beanSQP01362.VP_FPROC_D+'&' +
            'VP_FPROC_H='+this.beanSQP01362.VP_FPROC_H+'&' +
            'VP_FUENT='+this.beanSQP01362.VP_FUENT+'&' +
            'VP_PAIVTA='+this.beanSQP01362.VP_PAIVTA+'&' +
            'VP_STATUS='+this.beanSQP01362.VP_STATUS+'&' +
            'VP_A2959IATAH='+this.beanSQP01362.VP_A2959IATAH+'&' +
            'VP_A2959AGENT='+this.beanSQP01362.VP_A2959AGENT;
        // </editor-fold>
        this.setGridData(this.beanSQP01362);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onSearchInfoADMClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (data.STATUS!=='Y') {
            global.Msg({ msg: 'ADM pending or IATA Disabled' });
        } else {
            Ext.create('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DataEntryInfoADM', {
                id: 'DataEntryInfoADMDeterminationOfCommissionForm',
                params: {
                    data: data,
                    beanSQP01362: this.beanSQP01362
                }
            }).show();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
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
    btnBack_click: function() {
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(type) {
//        this.p = this.view.params;
//        searchParams = {};
//        
//        if (this.p.data.A1796IATA.length > 0) {
//            switch (type) {
//                case 'TKT':
//                    // <editor-fold defaultstate="collapsed" desc="llenarData">
//                    var txtIata = this.getValue("txtIata2");
//                    var txtTKTNumber = this.getValue("txtTKTNumber");
//                    var txtLote = this.getValue("txtLote2");
//                    // </editor-fold>
//                    
//                    // <editor-fold defaultstate="collapsed" desc="asignación">
//                    searchParams = {
//                        IN_OPCION: '1',
//                        IN_A1797CCUST: '139',
//                        IN_A1797IATA: txtIata,
//                        IN_TKT: txtTKTNumber,
//                        IN_LOTE: txtLote
//                    };
//                    _pathDataEntry = prototype.url+'/getXLSXTkt?' +
//                        'IN_OPCION='+searchParams.IN_OPCION+'&' +
//                        'IN_A1797CCUST='+searchParams.IN_A1797CCUST+'&' +
//                        'IN_A1797IATA='+searchParams.IN_A1797IATA+'&' +
//                        'IN_TKT='+searchParams.IN_TKT+'&' +
//                        'IN_LOTE='+searchParams.IN_LOTE;
//                    // </editor-fold>
//                    break;
//            }
//        } else global.Msg({ msg: 'Enter the required fields' });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function(beanSQP01362) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataEntry', {
            proxy: {
                url: prototype.url+'/getListFPROCHISTORY'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanSQP01362;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP01304");
                    // <editor-fold defaultstate="collapsed" desc="paggin3">
                    var pag = Ext.getCmp(prototype.id+'-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total3').setText(total);
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
        Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin3').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        global.getFile(_pathDataEntry);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin3').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin3').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin3').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin3').moveLast();
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