Ext.define('Ext.Praxis.controller.payments.BusinessToolsDictionary.DataEntryBusinessToolsDictionaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBusinessToolsDictionaryController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'BusinessToolsDictionaryForm';
        prototype.url = CONTEXTPATH + '/BusinessToolsDictionary';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'I':
                this.HabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
//                console.log(meDE.bean.data, 'meDE.bean' )
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('de-txtTABNAME', meDE.bean.data.TABNAME);
    },

    //<editor-fold defaultstate="collapsed" desc="llenarData">
    getData: function () {

        console.log(this.bean.data, 'this.bean')
        console.log('antes al llamado')
        console.log(prototype.url, 'prototype.url dataentry')
        var beanString = JSON.stringify(meDE.bean.data);
        console.log(beanString, 'beanString')
        console.log(meDE.bean.data, 'meDE.bean.data')

        console.log(meDE.bean.data.TABNAME)

        console.log('después del llamado')

        var paramDetailBusinessToolsDictionary = {};
        paramDetailBusinessToolsDictionary.beanString = JSON.stringify(meDE.bean.data);
        console.log('meDE.bean.data', meDE.bean.data)
        Ext.Ajax.request({
            url: prototype.url + '/searchBusinessToolsDictionary',
            method: 'POST',
            timeout: 60000000,
            params: paramDetailBusinessToolsDictionary,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var resMerchant = Ext.JSON.decode(response.responseText);
                console.log(resMerchant, 'res');
                if (resMerchant.success) {
                    console.log(resMerchant.data, 'res.data')
                    //llenar grilla gridDataInfoScan
                    var storeDataMerchant = Ext.create('Ext.data.Store', {
                        data: resMerchant.data,
                        autoLoad: true
                    });
                    meDE.mostrarData();
                    Ext.getCmp(prototype.id + '-gridDataAirport2').bindStore(storeDataMerchant);
                } else {
                    global.Msg({msg: resMerchant.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },

    onViewDetailClick: function (grid, rowIndex, colIndex, item, e, record) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log('llega al view')
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        console.log('llega antes del create')
        Ext.create('Ext.Praxis.view.payments.BusinessToolsDictionaryForm.DataEntryDetail', {
            id: prototype.id + '-dataEntryDetail',
            params: {
                action: action,
                meBT: meDE,
                rec: rec
            }
        }).show();
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="llenar data">
    llenarData: function (beanTemp) {
        beanTemp.TABLA = this.getValue("de-txtTABNAME");
        beanTemp.DESCR = this.getValue("de-txtDes");
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
        console.log(obj);
        console.log(value);
        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);  // JSON:CONVERTIR
                        this.MaintenanceA2354(beanTemp);
                    } else {
                        global.Msg({msg: msjResult}); // golbla.Msg: es una funcion que se muestre un cuadro 
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            beanTemp.beanString = JSON.stringify(beanTemp);
                            this.MaintenanceA2354(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(beanTemp);
                    this.MaintenanceA2354(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">  
    MaintenanceA2354: function (beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({//Es un llamado
            url: prototype.url + '/MaintenanceA2354', //ruta donde conecto con el controller.java
            method: 'POST',
            timeout: 60000000,
            params: beanTemp, //objeto temporal
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText); //cobierta la informacion para poder usarlo
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    DeshabilitarCampoClave: function () {


    },
    HabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-dataEntry').setHeight(200);
        Ext.getCmp(prototype.id + '-dataEntry').setWidth(650);
        Ext.getCmp(prototype.id + '-de-txtTABNAME').setEditable(true);
        Ext.getCmp(prototype.id + '-de-txtDESCRIPT').setEditable(true);
        Ext.getCmp(prototype.id + '-de-txtDes').show();
        Ext.getCmp(prototype.id + '-de-txtDESCRIPT').show();
        Ext.getCmp(prototype.id + '-gridDataAirport2').hide();
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});