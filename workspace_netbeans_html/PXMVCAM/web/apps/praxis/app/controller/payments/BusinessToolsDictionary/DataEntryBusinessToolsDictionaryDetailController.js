Ext.define('Ext.Praxis.controller.payments.BusinessToolsDictionary.DataEntryBusinessToolsDictionaryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBusinessToolsDictionaryDetailController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    beanTemp:  {},
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
//        console.log('afterRender');
        switch (this.actionCode) {
            case 'I':
                
                Ext.getCmp(prototype.id + '-de-txtTABNAME').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtSOURCEF').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtUSERFIELD').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtSYSTFIELD').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDESCRIPT').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtLENGHTF').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDATATYPE').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtORDERSEL').setEditable(true);

                break;
            case 'U':
//                this.getData();
                this.mostrarData();
                
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save_D').hide();
                Ext.getCmp(prototype.id + '-btn-delete_D').hide();
                Ext.getCmp(prototype.id + '-de-txtTABNAME_D').setEditable(false);
                Ext.getCmp(prototype.id + '-de-txtSOURCEF_D').setEditable(false);
                Ext.getCmp(prototype.id + '-de-txtUSERFIELD_D').setEditable(false);
                Ext.getCmp(prototype.id + '-de-txtSYSTFIELD_D').setEditable(false);
                Ext.getCmp(prototype.id + '-de-txtDESCRIPT_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtLENGHTF_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDATATYPE_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtORDERSEL_D').setEditable(true);

                break;
        }
    },
    mostrarData: function () {
//        console.log(meDE.beanResult);
//        console.log(this.beanResult.CODEREJ);
//        this.dataObtain.CARD = 2;
//        this.dataObtain.COREP = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                console.log(res, 'res')                
            }
        });
        console.log('dadsadasdadasdadad',this.bean.data )
        this.setValue('de-txtTABNAME_D', this.bean.data.TABNAME)    
        this.setValue('de-txtSOURCEF_D', this.bean.data.SOURCEF)
        this.setValue('de-txtUSERFIELD_D', this.bean.data.USERFIELD)
        this.setValue('de-txtSYSTFIELD_D', this.bean.data.SYSTFIELD)
        this.setValue('de-txtDESCRIPT_D', this.bean.data.DESCRIPT)
        this.setValue('de-txtLENGHTF_D', this.bean.data.LENGHTF)
        this.setValue('de-txtDATATYPE_D', this.bean.data.DATATYPE)
        this.setValue('de-txtORDERSEL_D', this.bean.data.ORDERSEL)
//        

//        this.setGridIATA(this.beanResult.MERCHN);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        console.log('llenarData');
 
        beanTemp.TABNAME = this.getValue("de-txtTABNAME_D");
        beanTemp.SOURCEF = this.getValue("de-txtSOURCEF_D");
        beanTemp.USERFIELD = this.getValue("de-txtUSERFIELD_D");
        beanTemp.SYSTFIELD = this.getValue("de-txtSYSTFIELD_D");
        beanTemp.DESCRIPT = this.getValue("de-txtDESCRIPT_D");
        beanTemp.LENGHTF = this.getValue("de-txtLENGHTF_D");
        beanTemp.DATATYPE = this.getValue("de-txtDATATYPE_D");
        beanTemp.ORDERSEL = this.getValue("de-txtORDERSEL_D");

        console.error(beanTemp);
        
    },
    getData: function () {
        
    },
    onViewIATAClick: function( grid, rowIndex, colIndex, item, e, record ){

    },
    onViewBANKClick: function ( grid, rowIndex, colIndex, item, e, record ){
        
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
        //this.setValue('-de-cmbUNIOPE', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick_D: function (btn) {
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
                        this.MaintenanceA2354(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick_D: function (btn) {
        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    //scope: this,
                    //animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            
                            var beanTemp = {};
                            var msjResult = meDE.validacionUpdate(beanTemp);
                            if (msjResult === '') {
                                meDE.llenarData(beanTemp);
                                
                                beanTemp.option = 'U';
                                meDE.MaintenanceA2354(beanTemp);
                            } else {
                                global.Msg({msg: msjResult});
                            }
                        }
                    }
                });
    },
    onDeleteClick_D: function (btn) {
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
                    this.MaintenanceA2354(beanTemp);
                }
            }
        });
    },
    onCancelClick_D: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2354: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2354',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString, option: beanTemp.option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDetail').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDetail').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryDetail').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryDetail').close();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    
                } else
                    global.Msg({msg: ''});
            }
        });
        
        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtTABNAME_D") === '') {
            msjResult = "You must enter the required field.";
        }
        if (this.getValue("de-txtSOURCEF_D") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtTABNAME_D").trim() === '') {
            msjResult = "The field Merchant Payment cannot be left empty";
        }
        if (this.getValue("de-txtSOURCEF_D").trim() === '') {
            msjResult = "The field Merchant Payment cannot be left empty";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setEditable(false);
        Ext.getCmp(prototype.id + '-de-txtNameCTRY').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    getIATAList: function () {

        var lstIATA = []; // empty array
        var storeIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var selIATA = storeIATA.getRange();

        Ext.each(selIATA, function (item) {
            var Obj = {
                CIATA: item.get('CIATA'),
            };
            lstIATA.push(Obj);
        }, this);

        console.log(lstIATA);
        var a = [];
        var data = [];
        for (var vi = 0; vi < lstIATA.length; ++vi) {
            // console.log(lstFOPVta[vi]);
            if (a.indexOf(String(lstIATA[vi].CIATA)) < 0) {
                a.push(String(lstIATA[vi].CIATA));

                data.push({
                    CIATA: String(lstIATA[vi].CIATA)
                })
            } else {
                data[a.indexOf(String(lstIATA[vi].CIATA))].CIATA = String(lstIATA[vi].CIATA);
            }
        }
        console.log(data);
        return data;
    },
    addIATA: function () {
        if (Ext.getCmp(prototype.id + '-txtIATA').getValue() !== '') {
            var beanTemp = {};
            beanTemp.changeIATA = true;
            var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
            var new_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue()

            Ext.Ajax.request({
                url: prototype.url + '/validateIATA',
                method: 'POST',
                timeout: 60000000,
//            params: beanTemp,
                params: {IATA: new_IATA},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.total > 0) {
                        meDE.insertIATA(store_gridIATA, res.data[0]);
                    } else {
                        global.Msg({msg: 'Not Found / No Travel Agency'});
                    }

                }
            });

        } else {
            global.Msg({msg: 'Registro vacío'});
        }
    },
    insertIATA: function (store_gridIATA, objIATA) {
        var dataRow = {};
        var duplicado = false;
        if (store_gridIATA.data.length > 0) {
            for (var i = 0; i < store_gridIATA.data.length; i++) {
                var dataRow1 = store_gridIATA.data.items[i];
                if (dataRow1.data.CIATA === this.getValue("txtIATA")) {
                    duplicado = true;
                }
            }
            if (!duplicado) {
                dataRow = store_gridIATA.data.items[store_gridIATA.data.length - 1 ].copy();
                dataRow.id = 'ItrecordIATA' + Math.random();
                dataRow.data.CIATA = this.getValue("txtIATA");
                dataRow.data.strDESCRIP = objIATA.A003KEY1;
                dataRow.data.SCOUNTRY = objIATA.A003PAIS;
                dataRow.data.CANAL = objIATA.A003CANAL;
            }
        } else {
            dataRow.id = 'ItrecordIATA';
            dataRow.CIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
            dataRow.strDESCRIP = objIATA.A003KEY1;
            dataRow.SCOUNTRY = objIATA.A003PAIS;
            dataRow.CANAL = objIATA.A003CANAL;
        }

        console.log(dataRow);
        if (!duplicado) {
            store_gridIATA.add(dataRow);
            Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
            this.clearIATA();
        } else {
            global.Msg({msg: 'Registro duplicado'});
        }
        console.log(store_gridIATA.data.length);
    },
    removeIATA: function (record) {
        var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var rowIndex = store_gridIATA.indexOf(record);
        store_gridIATA.removeAt(rowIndex);

        var beanTemp = {};
        beanTemp.changeIATA = true;
        Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
        console.log(store_gridIATA.data.length);
    },
    clearIATA: function () {
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
    },
    setGridIATA: function (MERCHN) {

        Ext.Ajax.request({
            url: prototype.url + '/searchIATA',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {MERCHN: MERCHN},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-gridIATA').bindStore(storeData);

            }
        });
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