Ext.define('Ext.Praxis.controller.payments.SalesReconciliBoomer.DataEntryExportByDateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryExportByDateController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    fecha: new Date(),
    beanResult: {},
    paramsExport: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        prototype.id = 'SalesReconciliBoomerForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliBoomer';
        meDE = this;
    },
    afterRender: function() {
        Ext.getCmp(prototype.id + '-de-btn-export').show();
        Ext.getCmp(prototype.id + '-de-btn-cancel').show();

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);
        
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-de-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-de-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-de-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-de-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-de-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-de-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-de-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-de-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-de-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-de-cmbDateToDay').setValue('');
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-de-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').getValue()+ Ext.getCmp(prototype.id + '-de-cmbDateFromDay').getValue();

        beanTemp.IN_FECHA_TO = Ext.getCmp(prototype.id + '-de-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-de-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-de-cmbDateToDay').getValue();
        
        beanTemp.IN_TDOC = '';
        beanTemp.DATE = '';
        beanTemp.strFecFiltro = 'DATSET';
        
        meDE.paramsExport.beanString = JSON.stringify(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {

    },
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onExportByDateClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to export ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    console.log(beanTemp.beanString);
                    global.getFile(prototype.url + '/getXLSXSearchDetail?beanString=' + meDE.paramsExport.beanString);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
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
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});