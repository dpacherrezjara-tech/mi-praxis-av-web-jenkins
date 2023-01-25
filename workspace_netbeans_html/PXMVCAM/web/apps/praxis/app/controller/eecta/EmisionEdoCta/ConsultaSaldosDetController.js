Ext.define('Ext.Praxis.controller.eecta.EmisionEdoCta.ConsultaSaldosDetController', {
    extend: 'Ext.app.ViewController',        
    alias: 'controller.' + prototype.id02 + '-consultaSaldosDetController',
    requires: [
       //'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGrid'
    ],
    beanXLS: {},            
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function() {         
        var p = this.view.params;
        //console.log(p.rec); 
        Ext.getCmp(prototype.id02 + '-FPERI').setValue(Ext.getCmp(prototype.id01 + '-FPERI').getValue());
        this.loadDetalleSaldo();
    },    
    loadDetalleSaldo: function() {
        var me= this;
        var bean = {};        
        bean.VP_A3981FPERI  = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-FPERI').getValue(),'Ym');        
        bean.VP_A3981CDCLI  = Ext.getCmp(prototype.id01 + '-CDCLI').getValue();
        bean.VP_A3981FEJEC  = Ext.util.Format.date( new Date(),'Ymd'); 
        Ext.Ajax.request({
            url: prototype.url + '/ConsultaEdoCtaDet',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id02 + '-ConsultaSaldosDetForm').mask('Cargando...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);                
                Ext.getCmp(prototype.id02 + '-ConsultaSaldosDetForm').unmask('Loading...', '');
                if (res.total === 0) {
                        global.Msg({
                            msg: 'No hay registros'
                        });
                    return;
                }               
                //console.log(res.data01);                                               
                me.loadDataDat01(res.lstRtn01, res.lstRtn02);
                me.loadDataDat02(res.lstRtn03, res.lstRtn04);
            }
        }); 
    },
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    loadDataDat01: function(lstRtn01, lstRtn02 ){        
        //cliente   
        //console.log(lstRtn01);
        var VL_DIR = lstRtn01[0].A3953DIRE1.trim();
            VL_DIR = VL_DIR +' - '+ lstRtn01[0].A3953COLON.trim();
            VL_DIR = VL_DIR +' - '+ lstRtn01[0].A3953DELEG.trim();
            if (lstRtn01[0].A3953CP !== '' )
            VL_DIR = VL_DIR + ' - CP. ' + lstRtn01[0].A3953CP;
        
        Ext.getCmp(prototype.id02+'-A3953CDCLI').setValue(lstRtn01[0].A3953CDCLI);
        Ext.getCmp(prototype.id02+'-A3953RSOCI').setValue(lstRtn01[0].A3953RSOCI.trim());
        Ext.getCmp(prototype.id02+'-A3953DIRE1').setValue(VL_DIR);        
        //totales
        Ext.getCmp(prototype.id02+'-A3981TOT').setValue(Ext.util.Format.number( lstRtn02[0].A3981TOT,'0,000.00'));
        Ext.getCmp(prototype.id02+'-A3981TOTLT').setText(lstRtn02[0].A3981TOTLT);                
    },
    loadDataDat02: function(lstRtn03, lstRtn04){   
        Ext.getCmp(prototype.id02 + '-gridData-ant').setStore(lstRtn03);
        Ext.getCmp(prototype.id02 + '-gridData-ant').getStore().reload();        
        Ext.getCmp(prototype.id02 + '-gridData-det').setStore(lstRtn04);
        Ext.getCmp(prototype.id02 + '-gridData-det').getStore().reload();        
    }, 
    onExcelDonwloadClick02:function(){        
        var bean = {};        
        bean.VP_A3981FPERI  = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-FPERI').getValue(),'Ym');        
        bean.VP_A3981CDCLI  = Ext.getCmp(prototype.id01 + '-CDCLI').getValue();
        bean.VP_A3981FEJEC  = Ext.util.Format.date( new Date(),'Ymd');        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel File ?',            
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/ConsultaEdoCtaDetExcel?beanString='+encodeURI(JSON.stringify(bean)));
                }
            }
        });
    },
    // </editor-fold>
    
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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {
        
    },
    onCancelClick02: function(){
        Ext.getCmp(prototype.id02 + '-ConsultaSaldosDetForm').close();
    },
    // </editor-fold>    
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
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



