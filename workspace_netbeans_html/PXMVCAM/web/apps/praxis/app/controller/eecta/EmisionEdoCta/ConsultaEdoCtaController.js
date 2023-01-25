Ext.define('Ext.Praxis.controller.eecta.EmisionEdoCta.ConsultaEdoCtaController', {
    extend: 'Ext.app.ViewController',        
    alias: 'controller.' + prototype.id01 + '-consultaEdoCtaController',
    requires: [
       //'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGrid'
    ],
    beanXLS: {},        
    me: '',
    init: function(view) {
        me = this;
    },
    afterRender: function() { 
        this.onbtn_consultaEECCClick01();        
    },
    cmbfiltro_clickHandler: function() {
//        var selectedValue =  Ext.getCmp(prototype.id + '-cmbfiltro').getValue();         
//        Ext.getCmp(prototype.id+'-BoxFilter01').hide();
//        Ext.getCmp(prototype.id+'-BoxFilter02').hide();
//        Ext.getCmp(prototype.id+'-BoxFilter03').hide();
//        Ext.getCmp(prototype.id+'-BoxFilter04').hide();                
//        switch(selectedValue){
//            case '1': 
//                Ext.getCmp(prototype.id+'-BoxFilter01').show();
//                Ext.getCmp(prototype.id+'-fecha1').focus();
//                break;
//            case '2':                
//                Ext.getCmp(prototype.id+'-BoxFilter02').show();                
//                Ext.getCmp(prototype.id+'-CDCLI').focus();
//                break;
//             case '3':                
//                Ext.getCmp(prototype.id+'-BoxFilter03').show();                
//                Ext.getCmp(prototype.id+'-RSOCI').focus();
//                break;
//            case '4':                
//                Ext.getCmp(prototype.id+'-BoxFilter04').show();
//                Ext.getCmp(prototype.id+'-NREDO').focus();
//                break;
//        }
    },
    setStoreData: function() {
//        var storeComboDataYear = win.getStoreYear(false);
//        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear() - 1);
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
        Ext.getCmp(prototype.id01 + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {

    },
    onCancelClick01: function() {
        Ext.getCmp(prototype.id01 + '-ConsultaEdoCtaForm').close();
    },
    
    // </editor-fold>    
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    onbtn_consultaEECCClick01: function() {
        this.search();
    },
    search: function()
    {      
        me = this;
        var bean = {};        
        bean.VP_A3981FPERI = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-FPERI').getValue(),'Ym');        
        bean.VP_A3981CDCLI  = Ext.getCmp(prototype.id01 + '-CDCLI').getValue();
        bean.VP_A3981FEJEC  = Ext.util.Format.date( new Date(),'Ymd');
        Ext.Ajax.request({
            url: prototype.url + '/ConsultaEdoCta',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id01 + '-ConsultaEdoCtaForm').mask('Procesando...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);                
                Ext.getCmp(prototype.id01 + '-ConsultaEdoCtaForm').unmask('Loading...', '');
                if (res.total === 0) {
                        global.Msg({
                            msg: 'No hay registros'
                        });
                    return;
                }                
                //console.log(res.data01);
                Ext.getCmp(prototype.id01+'-SALDO-ANTERIOR').setValue(Ext.util.Format.number( res.SALDO_ANTEIOR,'0,000.00'));
                me.loadDataDat01(res.lstRtn01, res.lstRtn02);
                me.loadDataDat02(res.lstRtn03, res.lstRtn04);                 
            }
        });  
        
    },
    loadDataDat01: function(lstRtn01, lstRtn02){
        //console.log(data01);
        //cliente
        Ext.getCmp(prototype.id01+'-A3953RSOCI').setText(lstRtn01[0].A3953RSOCI.trim());
        Ext.getCmp(prototype.id01+'-A3953DIRE1').setText(lstRtn01[0].A3953DIRE1.trim());
        Ext.getCmp(prototype.id01+'-A3953COLON').setText(lstRtn01[0].A3953COLON.trim());
        Ext.getCmp(prototype.id01+'-A3953DELEG').setText(lstRtn01[0].A3953DELEG.trim() + '- CP. ' + lstRtn01[0].A3953CP  );
        //totales
        Ext.getCmp(prototype.id01+'-A3981TOT').setValue(Ext.util.Format.number( lstRtn02[0].A3981TOT,'0,000.00'));
        Ext.getCmp(prototype.id01+'-A3981TOTLT').setText(lstRtn02[0].A3981TOTLT);                
    },
    loadDataDat02: function(lstRtn03, lstRtn04){
        //VENTAS
        Ext.getCmp(prototype.id01 + '-gridData').setStore(lstRtn03);
        Ext.getCmp(prototype.id01 + '-gridData').getStore().reload();
        //PAGOS
        Ext.getCmp(prototype.id01 + '-gridData-pago').setStore(lstRtn04);
        Ext.getCmp(prototype.id01 + '-gridData-pago').getStore().reload();        
    }, 

    onExportExcelClick: function () {       
        var bean = {};
        bean.VP_A3981FPERI = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-FPERI').getValue(),'Ym');        
        bean.VP_A3981CDCLI  = Ext.getCmp(prototype.id01 + '-CDCLI').getValue();
        bean.VP_A3981FEJEC  = Ext.util.Format.date( new Date(),'Ymd');       
        this.exportExcel(prototype.url + '/ConsultaEdoCtaExcel/?beanString=' + encodeURI(JSON.stringify(bean)) );
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Descargar reporte en Excel ?',
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
    onbtn_detalleEECCClick: function () {        
        this.winDataEntry('I', null );
    },
    winDataEntry:function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        Ext.create('Ext.Praxis.view.eecta.EmisionEdoCtaForm.ConsultaSaldosDetForm', {
            id: prototype.id02 + '-ConsultaSaldosDetForm',
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



