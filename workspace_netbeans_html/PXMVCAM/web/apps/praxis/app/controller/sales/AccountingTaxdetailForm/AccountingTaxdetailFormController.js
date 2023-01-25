
Ext.define('Ext.Praxis.controller.sales.AccountingTaxdetailForm.AccountingTaxdetailFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingTaxdetailFormController',

    /**
     * Constructor
     */
    bean: {},
    bean2:{},

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        prototype.idAccountingTaxdetail = 'AccountingTaxdetailForm';
        prototype.idDataEntryAccountingTax = 'DataEntryAccountingTaxdetail';
        prototype.url = CONTEXTPATH + '/AccountingTaxdetailForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idAccountingTaxdetail + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.idAccountingTaxdetail + '-pagginator-01').setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbModo = Ext.getCmp(prototype.idAccountingTaxdetail + '-Modo');
        //var cmbContrytax = Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbContrytax');
        //var cmbSALES = Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbSALES');
        //var cmbBANK = Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbBANK');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ACCOUNTIG ID"},
                {"code": "3", "name": "ACCOUNTIG DATE"},
                {"code": "2", "name": "PROCESSING DATE"},
                {"code": "5", "name": "GROUP"}
            ]
        }));
        cmbSearch.setValue("2");
        
        cmbModo.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "SA", "name": "SALE"},
                {"code": "FL", "name": "FLOWN"},
                {"code": "AD ", "name": "ADMs/ACMs"},
                {"code": "IC", "name": "IXC"},
                {"code": "IP", "name": "IXP"},
                {"code": "AJ", "name": "ADJ"} 
            ]
        }));
        cmbModo.setValue("");
        

        /*cmbContrytax.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "BY SOURCE"},
                {"code": "2", "name": "BY COUNTRY"}
            ]
        }));
        cmbContrytax.setValue("1");*/

        /*cmbSALES.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ARC", "name": "ARC"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "MAN", "name": "MAN"}
            ]
        }));
        cmbSALES.setValue("");*/
        /*cmbBANK.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "04", "name": "IAP"},
                {"code": "07", "name": "IAR"},
                {"code": "05", "name": "ELW"}

            ]
        }));*/


    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo');
        var txtFilterCONTABLE = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCONTABLE');
        var txtFilterGRUPO = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterGRUPO');
        var filter02 = Ext.getCmp(prototype.idAccountingTaxdetail + '-box-filter-02');
        //campo_cantidad.hide();
        if (obj.getValue() === "2" || obj.getValue() === "3") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            filter02.show();

            txtFilterCONTABLE.hide();
            txtFilterGRUPO.hide();

            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCONTABLE').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterGRUPO').setValue('');

        } else if (obj.getValue() === "1") {

            txtFilterCONTABLE.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter02.hide();
            txtFilterGRUPO.hide();

            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterGRUPO').setValue('');
        } else if (obj.getValue() === "5") {

            txtFilterGRUPO.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter02.hide();
            txtFilterCONTABLE.hide();

            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCONTABLE').setValue('');
        } else {
            txtFilterCONTABLE.hide();
            //
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter02.hide();
            txtFilterGRUPO.hide();
        }
    },
    onCmbSourceChange: function (obj, records, eOpts) {
        var cmbBANK = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbBANK');
        var txtFilterCOUNTRY = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCOUNTRY');
        var txtFilterCHANNEL = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCHANNEL');
        var txtFilterIATA = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterIATA');
        var txtFilterCurrency = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCurrency');
        if (obj.getValue() === "ARC") {
            cmbBANK.show();
            txtFilterCurrency.show();

            txtFilterCHANNEL.hide();
            txtFilterIATA.hide();

            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCHANNEL').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterIATA').setValue('');

        } else if (obj.getValue() === "BSP" || obj.getValue() === "MAN") {
            txtFilterCurrency.show();

            cmbBANK.hide();
            txtFilterCHANNEL.hide();
            txtFilterIATA.hide();

            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCHANNEL').setValue('');
            Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterIATA').setValue('');

        } else if (obj.getValue() === "ASR") {
            txtFilterCHANNEL.show();
            txtFilterIATA.show();
            txtFilterCurrency.show();

            cmbBANK.hide();

        }
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var ComboBy = Ext.getCmp(prototype.idAccountingTaxdetail + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').getRawValue();
        var txtFilterCONTABLE = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCONTABLE').getValue();
        var txtFilterGRUPO = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterGRUPO').getValue();
        var txtFilterTax = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterTax').getValue();
        var cmbContrytax = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbContrytax').getValue();
        var cmbSALES = Ext.getCmp(prototype.idAccountingTaxdetail + '-Modo').getValue();
        var cmbBANK = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbBANK').getValue();
        var txtFilterCOUNTRY = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCOUNTRY').getValue();
        var txtFilterCHANNEL = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCHANNEL').getValue();
        var txtFilterIATA = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterIATA').getValue();
        var txtFilterCurrency = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCurrency').getValue();
        if (ComboBy === '1') {
            if (txtFilterCONTABLE === '') {
                global.Msg({msg: 'Enter Contable'});
                return;
            }
        }

        if (ComboBy === '5') {
            if (txtFilterGRUPO === '') {
                global.Msg({msg: 'Enter GROUP'});
                return;
            }
        }
        if (ComboBy === "2" || ComboBy === "3" || ComboBy === "4") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        me.bean.Opcion = ComboBy;
        me.bean.SALES = cmbSALES;
        me.bean.BANK = cmbBANK;
        me.bean.Tax = txtFilterTax;
        me.bean.CONTABLE = txtFilterCONTABLE;
        me.bean.GRUPO = txtFilterGRUPO;
        me.bean.DateFrom = txtFilterDateFrom;
        me.bean.DateTo = txtFilterDateTo;
        me.bean.COUNTRY = '';//cmbContrytax;
        me.bean.CHANNEL = txtFilterCHANNEL;
        me.bean.IATA = txtFilterIATA;
        me.bean.Currency = txtFilterCurrency;
        me.bean.COUNTRYTAX = txtFilterCOUNTRY;
        me.bean.pexcel = 0;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idAccountingTaxdetail + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idAccountingTaxdetail + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(Objtemp.A2548CATNMEMO);
                    } else {
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }
    },
    onAddClick: function () {
        var me = this;
        var ComboBy = Ext.getCmp(prototype.idAccountingTaxdetail + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').getRawValue();
        var txtFilterCONTABLE = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCONTABLE').getValue();
        var txtFilterGRUPO = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterGRUPO').getValue();
        var txtFilterTax = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterTax').getValue();
        var cmbContrytax = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbContrytax').getValue();
       var cmbSALES = Ext.getCmp(prototype.idAccountingTaxdetail + '-Modo').getValue();
        var cmbBANK = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-cmbBANK').getValue();
        var txtFilterCOUNTRY = '';//Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCOUNTRY').getValue();
        var txtFilterCHANNEL = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCHANNEL').getValue();
        var txtFilterIATA = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterIATA').getValue();
        var txtFilterCurrency = Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterCurrency').getValue();
        if (ComboBy === '1') {
            if (txtFilterCONTABLE === '') {
                global.Msg({msg: 'Enter Contable'});
                return;
            }
        }

        if (ComboBy === '5') {
            if (txtFilterGRUPO === '') {
                global.Msg({msg: 'Enter GROUP'});
                return;
            }
        }
        if (ComboBy === "2" || ComboBy === "3" || ComboBy === "4") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAccountingTaxdetail + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        me.bean2.Opcion = ComboBy;
        me.bean2.SALES = cmbSALES;
        me.bean2.BANK = cmbBANK;
        me.bean2.Tax = txtFilterTax;
        me.bean2.CONTABLE = txtFilterCONTABLE;
        me.bean2.GRUPO = txtFilterGRUPO;
        me.bean2.DateFrom = txtFilterDateFrom;
        me.bean2.DateTo = txtFilterDateTo;
        me.bean2.COUNTRY = '';//cmbContrytax;
        me.bean2.CHANNEL = txtFilterCHANNEL;
        me.bean2.IATA = txtFilterIATA;
        me.bean2.Currency = txtFilterCurrency;
        me.bean2.COUNTRYTAX = txtFilterCOUNTRY;
        me.bean2.pexcel = 0;
        var win = new Ext.Praxis.view.sales.AccountingTaxdetailForm.DataEntryAccountingTaxdetail({
            params: {
                searchParams: me.bean2
            }
        });
        win.show();
    },


});

