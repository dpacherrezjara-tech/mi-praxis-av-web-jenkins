Ext.define('Ext.Praxis.controller.payments.LastConciliation.DataEntryMassiveEmissionLastConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMassiveEmissionLastConciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    fecha: new Date(),
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        prototype.id = 'LastConciliationForm';
        prototype.url = CONTEXTPATH + '/LastConciliation';
        meDE = this;
        this.obtainData();
    },
    afterRender: function() {
        Ext.getCmp(prototype.id + '-btn-update').show();
        Ext.getCmp(prototype.id + '-btn-cancel').show();
    },
    setData: function() {
        console.log(meDE.bean);
        meDE.beanResult.IN_SDATE = meDE.bean.data.SDATE;
        meDE.beanResult.IN_CARDN = meDE.bean.data.SCARDN;
        meDE.beanResult.IN_SAUTHOC = meDE.bean.data.SAUTHOC;
        meDE.mostrarData();
    },
    mostrarData: function() {

    },
    obtainData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(true);

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-de-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-de-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-de-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-de-cmbDateFromDay').setValue('');

        Ext.getCmp(prototype.id + '-de-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-de-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-de-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-de-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-de-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-de-cmbDateToDay').setValue('');
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-de-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-de-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-de-cmbDateFromDay').getValue();
        beanTemp.IN_FECHA_TO = Ext.getCmp(prototype.id + '-de-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-de-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-de-cmbDateToDay').getValue();
    },
    onUpdateClick: function(btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to emit massively ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            this.massiveEmission(beanTemp);
                        }
                    }
                });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    validacionUpdate: function(btn) {
        var msjResult = '';
        return msjResult;
    },
    massiveEmission: function(beanTemp) {
        Ext.Ajax.request({
            url: prototype.url + '/massiveEmission',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp)},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryMassiveEmission').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryMassiveEmission').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryMassiveEmission').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryMassiveEmission').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    //Ext.getCmp(prototype.id + '-btnRefresh').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
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